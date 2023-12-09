// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleDevice, BleDisconnected, BleNotification } from './types';
import {
  GIIKER_2x2x2,
  GIIKER_3x3x3,
  GO_CUBE_2x2x2,
  GO_CUBE_3x3x3,
  HEYKUBE,
  PUZZLE_UNKNOWN,
  RUBIKS_CONNECTED,
  SMARTPUZZLE_UNKNOWN,
} from '../../../lib/stif/builtins';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import BLE from './BLE';
import { Buffer } from 'buffer';
import { EmitterSubscription } from 'react-native';
import { STIF } from '../../../lib/stif';
import { t } from 'i18next';

const KNOWN_PUZZLE_MODELS: STIF.SmartPuzzle[] = [
  GO_CUBE_2x2x2,
  GO_CUBE_3x3x3,
  RUBIKS_CONNECTED,
  GIIKER_2x2x2,
  GIIKER_3x3x3,
  HEYKUBE,
];

export interface BluetoothPuzzle extends STIF.SmartPuzzle {
  /**
   * The Bluetooth Device representing the smart puzzle.
   */
  device: BleDevice;
  isConnected: () => Promise<boolean>;
}

export type MessageListener = (message: STIF.Message) => void;

export interface MessageSubscription {
  remove: () => void;
}

interface PuzzleRegistryEntry {
  puzzle: BluetoothPuzzle;
  subscriptions: EmitterSubscription[];
  listeners: MessageListener[];
}

const PUZZLE_REGISTRY: Map<string, PuzzleRegistryEntry> = new Map();
let _lastConnectedPuzzle: BluetoothPuzzle | null = null;

function smartPuzzleType(device: BleDevice): STIF.SmartPuzzle {
  const matchingPuzzles = KNOWN_PUZZLE_MODELS.filter(puzzle =>
    device?.name?.includes(puzzle.prefix),
  );
  const bestMatches = matchingPuzzles.sort(
    (a, b) => b.prefix.length - a.prefix.length, // longest prefix first
  );
  return bestMatches.length > 0 ? bestMatches[0] : SMARTPUZZLE_UNKNOWN;
}

function _isPuzzleRegistered(device: BleDevice): boolean {
  return (
    smartPuzzleType(device) !== SMARTPUZZLE_UNKNOWN &&
    PUZZLE_REGISTRY.has(device.id)
  );
}

function addPuzzle(device: BleDevice) {
  if (!_isPuzzleRegistered(device)) {
    console.debug(`Discovered puzzle: ${device.name} | ${device.id}`);
    PUZZLE_REGISTRY.set(device.id, {
      puzzle: asSmartPuzzle(device),
      listeners: [],
      subscriptions: [],
    });
  }
}

function addMessageListener(
  puzzle: BluetoothPuzzle,
  listener: MessageListener,
): MessageSubscription {
  PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.push(listener);
  return {
    remove: () => {
      const entry = PUZZLE_REGISTRY.get(puzzle.device.id);
      if (entry) {
        entry.listeners = entry.listeners.filter(l => l !== listener);
      }
    },
  };
}

function getPuzzles(): BluetoothPuzzle[] {
  const puzzles = Array.from(PUZZLE_REGISTRY.values())
    .map(entry => entry.puzzle)
    .filter(puzzle => puzzle.puzzle !== PUZZLE_UNKNOWN);
  console.debug(
    `Found ${puzzles.length} puzzles out of ${PUZZLE_REGISTRY.size} entries`,
  );
  return puzzles;
}

function asSmartPuzzle(device: BleDevice): BluetoothPuzzle {
  return {
    device,
    ...smartPuzzleType(device),
    name: device.name ?? 'Unknown',
    isConnected: async () =>
      await BLE.Manager.isPeripheralConnected(device.id, []),
  };
}

async function connect(puzzle: BluetoothPuzzle): Promise<void> {
  if (!(await puzzle.isConnected())) {
    try {
      if (!(await BLE.isEnabled())) {
        throw "Bluetooth is off. Please enable it and try again."
      }

      await BLE.Manager.connect(puzzle.device.id);
      const subscription = BLE.Events.addListener(
        'BleManagerDisconnectPeripheral',
        onDisconnect,
      );

      const entry = PUZZLE_REGISTRY.get(puzzle.device.id);
      if (entry) {
        resetEntry(entry);
        entry.subscriptions.push(subscription);
      }

      await discoverServices(puzzle);
      await configureNotifications(puzzle);

      _lastConnectedPuzzle = puzzle;
    } catch (error) {
      console.error(error);
      throw new SmartPuzzleError(
        SmartPuzzleErrorCode.PUZZLE_CONNECTION_FAILED,
        t('bluetooth.connect_error', {
          name: puzzle.device.name,
          error: error,
        }),
        { cause: error },
      );
    }
    console.debug(
      `Connected to puzzle: ${puzzle.device.name} | ${puzzle.device.id}`,
    );
  }
}

async function discoverServices(puzzle: BluetoothPuzzle) {
  await BLE.Manager.retrieveServices(puzzle.device.id);
  if (__DEV__) {
    const services = await BLE.Manager.retrieveServices(puzzle.device.id);
    console.debug(puzzle.device.name, 'services:', services)
  }
}

async function configureNotifications(puzzle: BluetoothPuzzle) {
  const subscription = BLE.Events.addListener(
    'BleManagerDidUpdateValueForCharacteristic',
    onReceiveNotification(puzzle),
  );
  await BLE.Manager.startNotification(
    puzzle.device.id,
    compressUUID(puzzle.uuids.trackingService),
    compressUUID(puzzle.uuids.trackingCharacteristic),
  );
  PUZZLE_REGISTRY.get(puzzle.device.id)?.subscriptions.push(subscription);
}

function compressUUID(uuid: string): string {
  // Bluetooth 4.0 specification, Volume 3, Part F, Section 3.2.1
  // https://www.bluetooth.org/docman/handlers/downloaddoc.ashx?doc_id=456433

  // Required since react-native-ble-manager needs short UUIDs on iOS,
  // so I need to be able to compare them to the full UUIDs in STIF.
  // CBUUID (iOS):
  // https://developer.apple.com/documentation/corebluetooth/cbuuid
  // Source: https://github.com/innoveit/react-native-ble-manager/blob/f46dd5c303ea0e70a44e299fb1ebabff86da9edd/ios/BleManager.swift#L381-L385
  const baseUUID = /0000(....)-0000-1000-8000-00805F9B34FB/;
  if (baseUUID.test(uuid.toUpperCase())) {
    return uuid.substring(4, 8);
  } else {
    return uuid;
  }
}

function onReceiveNotification(puzzle: BluetoothPuzzle) {
  return (event: BleNotification) => {
    if (event.peripheral === puzzle.device.id) {
      // The original implementation used a library which sent messages
      // purely in base64 form. As a result, downstream implementations
      // expect base64, even though they'll decode it back into the
      // values already received here.

      // Eventually, we want to avoid the needless serialization, but
      // for now the immediate goal is API compatibility.
      const hexValues = event.value
        .map(v => v.toString(16))
        .map(v => (v.length === 1 ? `0${v}` : v))
        .map(v => v.toUpperCase());
      const hexMessage = hexValues.join('');
      const b64Message = Buffer.from(hexMessage, 'hex').toString('base64');
      const message = { t: Date.now(), m: b64Message };
      PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.forEach(listener => {
        // Defer execution of listeners to avoid blocking.
        setTimeout(() => listener(message));
      });
    }
  };
}

async function disconnect(puzzle: BluetoothPuzzle): Promise<void> {
  if (await puzzle.isConnected()) {
    try {
      if (await BLE.isEnabled()) {
        await BLE.Manager.disconnect(puzzle.device.id);
      } else {
        onDisconnect({ peripheral: puzzle.device.id });
      }
    } catch (error) {
      throw new SmartPuzzleError(
        SmartPuzzleErrorCode.PUZZLE_CONNECTION_FAILED,
        t('bluetooth.disconnect_error', {
          name: puzzle.device.name,
          error: error,
        }),
        { cause: error },
      );
    }
  }
}

function onDisconnect(event: BleDisconnected) {
  const entry = PUZZLE_REGISTRY.get(event.peripheral);
  if (entry) resetEntry(entry);
  console.debug(
    `Disconnected from puzzle: ${event.peripheral}`,
  );
}

function resetEntry(entry: PuzzleRegistryEntry) {
  entry.subscriptions.forEach(s => s.remove());
  entry.subscriptions = [];
  entry.listeners = [];
  if (entry.puzzle === _lastConnectedPuzzle) {
    _lastConnectedPuzzle = null;
  }
}

function lastConnectedPuzzle(): BluetoothPuzzle | null {
  return _lastConnectedPuzzle;
}

const PuzzleRegistry = {
  addPuzzle,
  getPuzzles,
  connect,
  addMessageListener,
  disconnect,
  lastConnectedPuzzle,
};

export default PuzzleRegistry;
