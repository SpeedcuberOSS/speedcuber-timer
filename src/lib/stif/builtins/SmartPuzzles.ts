// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_3x3x3, PUZZLE_UNKNOWN } from './Puzzles';
import { STIF } from '../STIF';

export const SMARTPUZZLE_UNKNOWN: STIF.SmartPuzzle = Object.freeze({
  prefix: '',
  brand: 'Unknown Brand',
  puzzle: PUZZLE_UNKNOWN,
  uuids: {
    trackingService: '',
    trackingCharacteristic: '',
  },
});

export const PARTICULA_PUZZLE: STIF.SmartPuzzle = {
  prefix: '',
  brand: 'Particula GoCube',
  puzzle: PUZZLE_3x3x3,
  uuids: {
    trackingService: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    trackingCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
  },
};

export const RUBIKS_CONNECTED: STIF.SmartPuzzle = {
  ...PARTICULA_PUZZLE,
  prefix: 'Rubiks',
  brand: "Rubik's Connected",
};

export const GO_CUBE_3x3x3: STIF.SmartPuzzle = {
  ...PARTICULA_PUZZLE,
  prefix: 'GoCube',
};

export const GO_CUBE_2x2x2: STIF.SmartPuzzle = {
  ...PARTICULA_PUZZLE,
  prefix: 'GoCube2x2',
  puzzle: PUZZLE_2x2x2,
};

export const HEYKUBE: STIF.SmartPuzzle = {
  prefix: 'HEYKUBE',
  brand: 'HeyKube',
  puzzle: PUZZLE_3x3x3,
  uuids: {
    trackingService: 'b46a791a-8273-4fc1-9e67-94d3dc2aac1c',
    trackingCharacteristic: 'a2f41a4e-0e31-4bbc-9389-4253475481fb',
    batteryCharacteristic: 'fd51b3ba-99c7-49c6-9f85-5644ff56a378',
  },
};

export const GIIKER_PUZZLE: STIF.SmartPuzzle = {
  prefix: '',
  brand: 'GiiKER',
  puzzle: PUZZLE_3x3x3,
  uuids: {
    trackingService: '0000aadb-0000-1000-8000-00805f9b34fb',
    trackingCharacteristic: '0000aadc-0000-1000-8000-00805f9b34fb',
  },
};

export const GIIKER_3x3x3: STIF.SmartPuzzle = {
  ...GIIKER_PUZZLE,
  prefix: 'Gi',
};

export const GIIKER_2x2x2: STIF.SmartPuzzle = {
  ...GIIKER_PUZZLE,
  prefix: 'Gi2',
  puzzle: PUZZLE_2x2x2,
};