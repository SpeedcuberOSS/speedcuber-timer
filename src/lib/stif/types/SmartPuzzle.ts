// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Puzzle } from './Puzzle';

interface SmartPuzzleUUIDs {
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
