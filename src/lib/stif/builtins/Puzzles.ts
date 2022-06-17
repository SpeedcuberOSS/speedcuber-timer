// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Puzzle } from '../types/Puzzle';

const PUZZLE_2x2x2: Puzzle = Object.freeze({
  id: '222',
});
const PUZZLE_3x3x3: Puzzle = Object.freeze({
  id: '333',
});
const PUZZLE_4x4x4: Puzzle = Object.freeze({
  id: '444',
});
const PUZZLE_5x5x5: Puzzle = Object.freeze({
  id: '555',
});
const PUZZLE_6x6x6: Puzzle = Object.freeze({
  id: '666',
});
const PUZZLE_7x7x7: Puzzle = Object.freeze({
  id: '777',
});
const PUZZLE_CLOCK: Puzzle = Object.freeze({
  id: 'clock',
});
const PUZZLE_SQUARE_1: Puzzle = Object.freeze({
  id: 'sq1',
});
const PUZZLE_MEGAMINX: Puzzle = Object.freeze({
  id: 'minx',
});
const PUZZLE_PYRAMINX: Puzzle = Object.freeze({
  id: 'pyram',
});
const PUZZLE_SKEWB: Puzzle = Object.freeze({
  id: 'skewb',
});

export {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  PUZZLE_CLOCK,
  PUZZLE_SQUARE_1,
  PUZZLE_MEGAMINX,
  PUZZLE_PYRAMINX,
  PUZZLE_SKEWB,
};
