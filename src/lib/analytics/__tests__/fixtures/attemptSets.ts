// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  EVENT_3x3x3,
  PUZZLE_3x3x3,
  ScrambleBuilder,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
} from '../../../stif';

it('has a noop test to satisfy Jest', () => {
  expect(true).toBe(true);
});

let TEST_SCRAMBLE = ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']);

export const Ao5_AVG_10000 = [
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 8000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 9000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 10000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 11000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 15000),
];

export const Ao5_AVG_10000_WITH_PLUS_2 = [
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 8000),
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 7000),
    infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
  },
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 10000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 11000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 15000),
];

export const Ao5_AVG_10000_WITH_DNF = [
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 8000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 9000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 10000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 11000),
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 7000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const Ao5_AVG_DNF = [
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 8000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 9000),
  AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 10000),
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 7000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 7000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const ALL_DNF = [
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 8000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
  {
    ...AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 7000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];
