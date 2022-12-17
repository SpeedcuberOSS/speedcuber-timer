// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_3x3x3, PUZZLE_UNKNOWN, Puzzle } from '../stif';

export interface SmartPuzzleUUIDs {
  trackingService: string;
  trackingCharacteristic: string;
}

export interface SmartPuzzle {
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

export const UnknownPuzzle: SmartPuzzle = {
  prefix: '',
  brand: 'Unknown Brand',
  puzzle: PUZZLE_UNKNOWN,
  uuids: {
    trackingService: '',
    trackingCharacteristic: '',
  },
};

const ParticulaPuzzle: SmartPuzzle = {
  prefix: '',
  brand: 'Particula GoCube',
  puzzle: PUZZLE_3x3x3,
  uuids: {
    trackingService: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    trackingCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
  },
};

export const RubiksConnected: SmartPuzzle = {
  ...ParticulaPuzzle,
  prefix: 'Rubiks',
  brand: 'Rubiks Connected',
};

export const GoCube: SmartPuzzle = {
  ...ParticulaPuzzle,
  prefix: 'GoCube',
};

export const GoCube2x2x2: SmartPuzzle = {
  ...ParticulaPuzzle,
  prefix: 'GoCube2x2',
  puzzle: PUZZLE_2x2x2,
};

export const KNOWN_PUZZLE_MODELS: SmartPuzzle[] = [
  RubiksConnected,
  GoCube,
  GoCube2x2x2,
];
