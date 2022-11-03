// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle } from '../../../lib/bluetooth-puzzle';
import { getAvailableBluetoothCubes } from './';
import { useState } from 'react';

let PUZZLE_REGISTRY: Map<string, BluetoothPuzzle> = new Map();

export default function useSmartPuzzles() {
  const [puzzles, setPuzzles] = useState<BluetoothPuzzle[]>(
    _getCurrentPuzzles(),
  );
  const puzzleScan = (scanDurationMillis: number) => {
    getAvailableBluetoothCubes(
      scanDurationMillis,
      (puzzle: BluetoothPuzzle) => {
        PUZZLE_REGISTRY.set(puzzle.name() ?? 'Unknown', puzzle);
        setPuzzles(_getCurrentPuzzles());
      },
    );
  };
  return {
    puzzles,
    puzzleScan,
  };
}

function _getCurrentPuzzles() {
  return Array.from(PUZZLE_REGISTRY.values());
}
