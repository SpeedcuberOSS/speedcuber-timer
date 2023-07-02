// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
} from '../../stif/builtins';
import { STIF } from '../../stif';
import {
  Scrambler2x2x2,
  Scrambler3x3x3,
  Scrambler4x4x4,
  Scrambler5x5x5,
  Scrambler6x6x6,
  Scrambler7x7x7,
  ScramblerUnknown,
} from './scramblers';

import { Scrambler } from './core';

const SCRAMBLER_MAP = new Map<STIF.Puzzle, Scrambler>([
  [PUZZLE_2x2x2, new Scrambler2x2x2()],
  [PUZZLE_3x3x3, new Scrambler3x3x3()],
  [PUZZLE_4x4x4, new Scrambler4x4x4()],
  [PUZZLE_5x5x5, new Scrambler5x5x5()],
  [PUZZLE_6x6x6, new Scrambler6x6x6()],
  [PUZZLE_7x7x7, new Scrambler7x7x7()],
]);

export function getScrambler(puzzle: STIF.Puzzle) {
  return SCRAMBLER_MAP.get(puzzle) ?? new ScramblerUnknown();
}
