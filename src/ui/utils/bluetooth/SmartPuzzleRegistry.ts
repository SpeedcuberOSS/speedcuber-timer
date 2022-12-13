// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Characteristic, Device, Subscription } from 'react-native-ble-plx';
import {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_UNKNOWN,
  Puzzle,
} from '../../../lib/stif';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import { t } from 'i18next';

interface Message {
  occurredAtMillis: number;
  message: string;
}

type NotificationListener = (message: Message) => void;
interface PuzzleRegistryEntry {
  puzzle: SmartPuzzle;
  subscriptions: Subscription[];
  messages: Message[];
  listeners: NotificationListener[];
}

const PUZZLE_REGISTRY: Map<string, PuzzleRegistryEntry> = new Map();

interface SmartPuzzleUUIDs {
  trackingService: string;
  trackingCharacteristic: string;
}
interface SmartPuzzleModel {
  /**
   * The prefix of the puzzle's Bluetooth name.
   */
  prefix: string;
  /**
   * The brand name of the puzzle.
   */
  brand: string;
  /**
   * The puzzle type.
   */
  puzzle: Puzzle;
  /**
   * The UUIDs used to connect to the puzzle and use its features.
   */
  uuids: SmartPuzzleUUIDs;
}

export interface SmartPuzzle extends SmartPuzzleModel {
  /**
   * The Bluetooth Device representing the smart puzzle.
   */
  device: Device;
}

const UnknownPuzzle: SmartPuzzleModel = {
  prefix: '',
  brand: 'Unknown Brand',
  puzzle: PUZZLE_UNKNOWN,
  uuids: {
    trackingService: '',
    trackingCharacteristic: '',
  },
};

const ParticulaPuzzle: SmartPuzzleModel = {
  prefix: '',
  brand: 'Particula GoCube',
  puzzle: PUZZLE_3x3x3,
  uuids: {
    trackingService: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    trackingCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
  },
};

const RubiksConnected: SmartPuzzleModel = {
  ...ParticulaPuzzle,
  prefix: 'Rubiks',
  brand: 'Rubiks Connected',
};

const GoCube: SmartPuzzleModel = {
  ...ParticulaPuzzle,
  prefix: 'GoCube',
};

const GoCube2x2x2: SmartPuzzleModel = {
  ...ParticulaPuzzle,
  prefix: 'GoCube2x2',
  puzzle: PUZZLE_2x2x2,
};

const KNOWN_PUZZLE_MODELS: SmartPuzzleModel[] = [
  RubiksConnected,
  GoCube,
  GoCube2x2x2,
];

function smartPuzzleType(device: Device): SmartPuzzleModel {
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
  puzzle: SmartPuzzle,
  listener: NotificationListener,
) {
  PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.push(listener);
}

function getPuzzles(): SmartPuzzle[] {
  return Array.from(PUZZLE_REGISTRY.values())
    .map(entry => entry.puzzle)
    .filter(puzzle => puzzle.puzzle !== PUZZLE_UNKNOWN);
}

function asSmartPuzzle(device: Device): SmartPuzzle {
  return {
    device,
    ...smartPuzzleType(device),
  };
}

async function connect(puzzle: SmartPuzzle) {
  if (!(await puzzle.device.isConnected())) {
    try {
      await connectToPuzzle(puzzle, 5000);
      await configureNotifications(puzzle);
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

async function connectToPuzzle(puzzle: SmartPuzzle, timeoutMillis: number) {
  await puzzle.device.connect({ timeout: timeoutMillis });
}

async function configureNotifications(puzzle: SmartPuzzle) {
  await puzzle.device.discoverAllServicesAndCharacteristics();
  let subscription = await puzzle.device.monitorCharacteristicForService(
    puzzle.uuids.trackingService,
    puzzle.uuids.trackingCharacteristic,
    onReceiveNotification(puzzle),
  );
  PUZZLE_REGISTRY.get(puzzle.device.id)?.subscriptions.push(subscription);
}

function onReceiveNotification(puzzle: SmartPuzzle) {
  return (error: Error | null, characteristic: Characteristic | null) => {
    if (error) {
      console.error(error);
      return;
    }
    if (characteristic) {
      let message = {
        occurredAtMillis: Date.now(),
        message: characteristic.value ?? '',
      };
      PUZZLE_REGISTRY.get(puzzle.device.id)?.messages.push();
      PUZZLE_REGISTRY.get(puzzle.device.id)?.listeners.forEach(listener => {
        // Defer execution of listeners to avoid blocking.
        setTimeout(() => listener(message), 0);
      });
    }
  };
}

async function disconnect(puzzle: SmartPuzzle) {
  if (await puzzle.device.isConnected()) {
    try {
      await puzzle.device.cancelConnection();
      PUZZLE_REGISTRY.get(puzzle.device.id)?.subscriptions.forEach(
        subscription => subscription.remove(),
      );
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

const PuzzleRegistry = {
  addPuzzle,
  getPuzzles,
  connect,
  addNotificationListener,
  disconnect,
};

export default PuzzleRegistry;
