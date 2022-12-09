// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_UNKNOWN,
  Puzzle,
} from '../../../lib/stif';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import { Device } from 'react-native-ble-plx';
import { t } from 'i18next';

const PUZZLE_REGISTRY: Map<string, Device> = new Map();

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
};

const RubiksConnected: SmartPuzzleModel = {
  prefix: 'Rubiks',
  brand: 'Rubiks Connected',
  puzzle: PUZZLE_3x3x3,
};

const GoCube: SmartPuzzleModel = {
  prefix: 'GoCube',
  brand: 'Particula GoCube',
  puzzle: PUZZLE_3x3x3,
};

const GoCube2x2x2: SmartPuzzleModel = {
  prefix: 'GoCube2x2',
  brand: 'Particula GoCube',
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
    PUZZLE_REGISTRY.set(device.id, device);
  }
}

function getPuzzles(): SmartPuzzle[] {
  return Array.from(PUZZLE_REGISTRY.values())
    .map(device => {
      return {
        device,
        ...smartPuzzleType(device),
      };
    })
    .filter(puzzle => puzzle.puzzle !== PUZZLE_UNKNOWN);
}

async function connect(puzzle: SmartPuzzle) {
  if (!(await puzzle.device.isConnected())) {
    try {
      await puzzle.device.connect({ timeout: 5000 });
      // TODO: Configure notifications
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

async function disconnect(puzzle: SmartPuzzle) {
  if (await puzzle.device.isConnected()) {
    try {
      await puzzle.device.cancelConnection();
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
  disconnect,
};

export default PuzzleRegistry;
