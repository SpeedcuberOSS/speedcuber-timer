// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import {
  CompetitiveEvent,
  CompetitiveEventType,
} from '../types/CompetitiveEvent';
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

const EVENT_UNKNOWN: CompetitiveEvent = Object.freeze({
  id: 'unknown',
  puzzle: PUZZLE_UNKNOWN,
  type: CompetitiveEventType.CUSTOM,
});
const EVENT_2x2x2: CompetitiveEvent = Object.freeze({
  id: '222',
  puzzle: PUZZLE_2x2x2,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3: CompetitiveEvent = Object.freeze({
  id: '333',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3_BLD: CompetitiveEvent = Object.freeze({
  id: '333bf',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3_BLD_MULTI: CompetitiveEvent = Object.freeze({
  id: '333mbf',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3_OH: CompetitiveEvent = Object.freeze({
  id: '333oh',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3_FMC: CompetitiveEvent = Object.freeze({
  id: '333fm',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA,
});
const EVENT_3x3x3_FEET: CompetitiveEvent = Object.freeze({
  id: '333ft',
  puzzle: PUZZLE_3x3x3,
  type: CompetitiveEventType.WCA_OLD,
});
const EVENT_4x4x4: CompetitiveEvent = Object.freeze({
  id: '444',
  puzzle: PUZZLE_4x4x4,
  type: CompetitiveEventType.WCA,
});
const EVENT_4x4x4_BLD: CompetitiveEvent = Object.freeze({
  id: '444bf',
  puzzle: PUZZLE_4x4x4,
  type: CompetitiveEventType.WCA,
});
const EVENT_5x5x5: CompetitiveEvent = Object.freeze({
  id: '555',
  puzzle: PUZZLE_5x5x5,
  type: CompetitiveEventType.WCA,
});
const EVENT_5x5x5_BLD: CompetitiveEvent = Object.freeze({
  id: '555bf',
  puzzle: PUZZLE_5x5x5,
  type: CompetitiveEventType.WCA,
});
const EVENT_6x6x6: CompetitiveEvent = Object.freeze({
  id: '666',
  puzzle: PUZZLE_6x6x6,
  type: CompetitiveEventType.WCA,
});
const EVENT_7x7x7: CompetitiveEvent = Object.freeze({
  id: '777',
  puzzle: PUZZLE_7x7x7,
  type: CompetitiveEventType.WCA,
});
const EVENT_CLOCK: CompetitiveEvent = Object.freeze({
  id: 'clock',
  puzzle: PUZZLE_CLOCK,
  type: CompetitiveEventType.WCA,
});
const EVENT_PYRAMINX: CompetitiveEvent = Object.freeze({
  id: 'pyram',
  puzzle: PUZZLE_PYRAMINX,
  type: CompetitiveEventType.WCA,
});
const EVENT_MEGAMINX: CompetitiveEvent = Object.freeze({
  id: 'minx',
  puzzle: PUZZLE_MEGAMINX,
  type: CompetitiveEventType.WCA,
});
const EVENT_SQUARE_1: CompetitiveEvent = Object.freeze({
  id: 'sq1',
  puzzle: PUZZLE_SQUARE_1,
  type: CompetitiveEventType.WCA,
});
const EVENT_SKEWB: CompetitiveEvent = Object.freeze({
  id: 'skewb',
  puzzle: PUZZLE_SKEWB,
  type: CompetitiveEventType.WCA,
});

// TODO add the rest of the old WCA events

// TODO add several common unofficial events (e.g. relays, team BLD)

export {
  EVENT_UNKNOWN,
  EVENT_2x2x2,
  EVENT_3x3x3,
  EVENT_3x3x3_BLD,
  EVENT_3x3x3_BLD_MULTI,
  EVENT_3x3x3_OH,
  EVENT_3x3x3_FMC,
  EVENT_3x3x3_FEET,
  EVENT_4x4x4,
  EVENT_4x4x4_BLD,
  EVENT_5x5x5,
  EVENT_5x5x5_BLD,
  EVENT_6x6x6,
  EVENT_7x7x7,
  EVENT_CLOCK,
  EVENT_PYRAMINX,
  EVENT_MEGAMINX,
  EVENT_SQUARE_1,
  EVENT_SKEWB,
};
