// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Characteristic, Device, Subscription } from 'react-native-ble-plx';
import { KNOWN_PUZZLE_MODELS, UnknownPuzzle } from '../../../lib/smart-puzzles';
import { Message, PUZZLE_UNKNOWN, SmartPuzzle } from '../../../lib/stif';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import { t } from 'i18next';

export interface BluetoothPuzzle extends SmartPuzzle {
  /**
   * The Bluetooth Device representing the smart puzzle.
   */
  device: Device;
}

type NotificationListener = (message: Message) => void;

interface PuzzleRegistryEntry {
  puzzle: BluetoothPuzzle;
  subscriptions: Subscription[];
  messages: Message[];
  listeners: NotificationListener[];
}

const PUZZLE_REGISTRY: Map<string, PuzzleRegistryEntry> = new Map();
let _lastConnectedPuzzle: BluetoothPuzzle | null = null;

function smartPuzzleType(device: Device): SmartPuzzle {
  const matchingPuzzles = KNOWN_PUZZLE_MODELS.filter(puzzle =>
    device?.name?.includes(puzzle.prefix),
  );
  const bestMatches = matchingPuzzles.sort(
    (a, b) => b.prefix.length - a.prefix.length, // longest prefix first
  );
  if (bestMatches.length > 0) {
    return bestMatches[0];
  }
  return UnknownPuzzle;
}

function addPuzzle(device: Device) {
  const puzzleType = smartPuzzleType(device);
  if (puzzleType.puzzle !== PUZZLE_UNKNOWN && !PUZZLE_REGISTRY.has(device.id)) {
    console.debug(
      `Discovered puzzle: ${device?.name} | ${device?.localName} | ${device?.id}`,
    );
    PUZZLE_REGISTRY.set(device.id, {
      puzzle: asSmartPuzzle(device),
      listeners: [],
      subscriptions: [],
      messages: [],
    });
  }
}

function addNotificationListener(
  puzzle: BluetoothPuzzle,
  listener: NotificationListener,
) {
  PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.push(listener);
}

function getPuzzles(): BluetoothPuzzle[] {
  return Array.from(PUZZLE_REGISTRY.values())
    .map(entry => entry.puzzle)
    .filter(puzzle => puzzle.puzzle !== PUZZLE_UNKNOWN);
}

function asSmartPuzzle(device: Device): BluetoothPuzzle {
  return {
    device,
    ...smartPuzzleType(device),
  };
}

async function connect(puzzle: BluetoothPuzzle) {
  if (!(await puzzle.device.isConnected())) {
    try {
      await connectToPuzzle(puzzle, 5000);
      await configureNotifications(puzzle);
      _lastConnectedPuzzle = puzzle;
    } catch (error) {
      throw new SmartPuzzleError(
        SmartPuzzleErrorCode.PUZZLE_CONNECTION_FAILED,
        t('bluetooth.connect_error', {
          name: puzzle.device.name,
          error: error,
        }),
        { cause: error },
      );
    }
  }
}

async function connectToPuzzle(puzzle: BluetoothPuzzle, timeoutMillis: number) {
  await puzzle.device.connect({ timeout: timeoutMillis });
}

async function configureNotifications(puzzle: BluetoothPuzzle) {
  await puzzle.device.discoverAllServicesAndCharacteristics();
  let subscription = await puzzle.device.monitorCharacteristicForService(
    puzzle.uuids.trackingService,
    puzzle.uuids.trackingCharacteristic,
    onReceiveNotification(puzzle),
  );
  PUZZLE_REGISTRY.get(puzzle.device.id)?.subscriptions.push(subscription);
}

function onReceiveNotification(puzzle: BluetoothPuzzle) {
  return (error: Error | null, characteristic: Characteristic | null) => {
    if (error) {
      console.error(error);
      return;
    }
    if (characteristic) {
      let message = {
        t: Date.now(),
        m: characteristic.value ?? '',
      };
      console.debug(message);
      PUZZLE_REGISTRY.get(puzzle.device.id)?.messages.push(message);
      PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.forEach(listener => {
        // Defer execution of listeners to avoid blocking.
        setTimeout(() => listener(message), 0);
      });
    }
  };
}

async function disconnect(puzzle: BluetoothPuzzle) {
  if (await puzzle.device.isConnected()) {
    try {
      await puzzle.device.cancelConnection();
      PUZZLE_REGISTRY.get(puzzle.device.id)?.subscriptions.forEach(
        subscription => subscription.remove(),
      );
      if (puzzle === _lastConnectedPuzzle) {
        _lastConnectedPuzzle = null;
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

function lastConnectedPuzzle(): BluetoothPuzzle | null {
  return _lastConnectedPuzzle;
}

function getMessages(puzzle: BluetoothPuzzle): Message[] {
  return PUZZLE_REGISTRY.get(puzzle.device.id)?.messages ?? [];
}

function getMessagesOnInterval(
  puzzle: BluetoothPuzzle,
  intervalStartMillis: number,
  intervalEndMillis: number,
) {
  return getMessages(puzzle).filter(
    message =>
      message.t >= intervalStartMillis && message.t <= intervalEndMillis,
  );
}

const PuzzleRegistry = {
  addPuzzle,
  getPuzzles,
  connect,
  addNotificationListener,
  disconnect,
  lastConnectedPuzzle,
  getMessages,
  getMessagesOnInterval,
};

export default PuzzleRegistry;
