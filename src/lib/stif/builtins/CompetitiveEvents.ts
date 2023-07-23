// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { STIF } from '../STIF';
import {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  PUZZLE_CLOCK,
  PUZZLE_MEGAMINX,
  PUZZLE_PYRAMINX,
  PUZZLE_SKEWB,
  PUZZLE_SQUARE_1,
  PUZZLE_UNKNOWN,
} from './Puzzles';

export const EVENT_UNKNOWN: STIF.CompetitiveEvent = Object.freeze({
  id: 'unknown',
  puzzles: [PUZZLE_UNKNOWN],
  type: 'unofficial',
});

// Official WCA Events
export const EVENT_2x2x2: STIF.CompetitiveEvent = Object.freeze({
  id: '222',
  puzzles: [PUZZLE_2x2x2],
  type: 'official',
});
export const EVENT_3x3x3: STIF.CompetitiveEvent = Object.freeze({
  id: '333',
  puzzles: [PUZZLE_3x3x3],
  type: 'official',
});
export const EVENT_3x3x3_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '333bf',
  puzzles: [PUZZLE_3x3x3],
  type: 'official',
});
export const EVENT_3x3x3_BLD_MULTI: (count: number) => STIF.CompetitiveEvent = (
  count: number,
) => {
  return {
    id: '333mbf',
    puzzles: Array(count).fill(PUZZLE_3x3x3),
    type: 'official',
  };
};
export const EVENT_3x3x3_OH: STIF.CompetitiveEvent = Object.freeze({
  id: '333oh',
  puzzles: [PUZZLE_3x3x3],
  type: 'official',
});
export const EVENT_3x3x3_FMC: STIF.CompetitiveEvent = Object.freeze({
  id: '333fm',
  puzzles: [PUZZLE_3x3x3],
  type: 'official',
});
export const EVENT_4x4x4: STIF.CompetitiveEvent = Object.freeze({
  id: '444',
  puzzles: [PUZZLE_4x4x4],
  type: 'official',
});
export const EVENT_4x4x4_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '444bf',
  puzzles: [PUZZLE_4x4x4],
  type: 'official',
});
export const EVENT_5x5x5: STIF.CompetitiveEvent = Object.freeze({
  id: '555',
  puzzles: [PUZZLE_5x5x5],
  type: 'official',
});
export const EVENT_5x5x5_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '555bf',
  puzzles: [PUZZLE_5x5x5],
  type: 'official',
});
export const EVENT_6x6x6: STIF.CompetitiveEvent = Object.freeze({
  id: '666',
  puzzles: [PUZZLE_6x6x6],
  type: 'official',
});
export const EVENT_7x7x7: STIF.CompetitiveEvent = Object.freeze({
  id: '777',
  puzzles: [PUZZLE_7x7x7],
  type: 'official',
});
export const EVENT_CLOCK: STIF.CompetitiveEvent = Object.freeze({
  id: 'clock',
  puzzles: [PUZZLE_CLOCK],
  type: 'official',
});
export const EVENT_PYRAMINX: STIF.CompetitiveEvent = Object.freeze({
  id: 'pyram',
  puzzles: [PUZZLE_PYRAMINX],
  type: 'official',
});
export const EVENT_MEGAMINX: STIF.CompetitiveEvent = Object.freeze({
  id: 'minx',
  puzzles: [PUZZLE_MEGAMINX],
  type: 'official',
});
export const EVENT_SQUARE_1: STIF.CompetitiveEvent = Object.freeze({
  id: 'sq1',
  puzzles: [PUZZLE_SQUARE_1],
  type: 'official',
});
export const EVENT_SKEWB: STIF.CompetitiveEvent = Object.freeze({
  id: 'skewb',
  puzzles: [PUZZLE_SKEWB],
  type: 'official',
});

// Retired WCA Events
export const EVENT_3x3x3_FEET: STIF.CompetitiveEvent = Object.freeze({
  id: '333ft',
  puzzles: [PUZZLE_3x3x3],
  type: 'retired',
});

// Common Unofficial Events
export const EVENT_2x2x2_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '222bf',
  puzzles: [PUZZLE_2x2x2],
  type: 'unofficial',
});
export const EVENT_3x3x3_BLD_TEAM: STIF.CompetitiveEvent = Object.freeze({
  id: '333bf-team',
  puzzles: [PUZZLE_3x3x3],
  type: 'unofficial',
});
export const EVENT_6x6x6_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '666bf',
  puzzles: [PUZZLE_6x6x6],
  type: 'unofficial',
});
export const EVENT_7x7x7_BLD: STIF.CompetitiveEvent = Object.freeze({
  id: '777bf',
  puzzles: [PUZZLE_7x7x7],
  type: 'unofficial',
});
export const EVENT_RELAY_23: STIF.CompetitiveEvent = Object.freeze({
  id: '23relay',
  puzzles: [PUZZLE_2x2x2, PUZZLE_3x3x3],
  type: 'unofficial',
});
export const EVENT_RELAY_234: STIF.CompetitiveEvent = Object.freeze({
  id: '234relay',
  puzzles: [PUZZLE_2x2x2, PUZZLE_3x3x3, PUZZLE_4x4x4],
  type: 'unofficial',
});
export const EVENT_RELAY_2345: STIF.CompetitiveEvent = Object.freeze({
  id: '2345relay',
  puzzles: [PUZZLE_2x2x2, PUZZLE_3x3x3, PUZZLE_4x4x4, PUZZLE_5x5x5],
  type: 'unofficial',
});
export const EVENT_RELAY_23456: STIF.CompetitiveEvent = Object.freeze({
  id: '23456relay',
  puzzles: [
    PUZZLE_2x2x2,
    PUZZLE_3x3x3,
    PUZZLE_4x4x4,
    PUZZLE_5x5x5,
    PUZZLE_6x6x6,
  ],
  type: 'unofficial',
});
export const EVENT_RELAY_234567: STIF.CompetitiveEvent = Object.freeze({
  id: '234567relay',
  puzzles: [
    PUZZLE_2x2x2,
    PUZZLE_3x3x3,
    PUZZLE_4x4x4,
    PUZZLE_5x5x5,
    PUZZLE_6x6x6,
    PUZZLE_7x7x7,
  ],
  type: 'unofficial',
});
