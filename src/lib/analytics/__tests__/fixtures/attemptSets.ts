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

export function attemptFixtureWithTime(durationMillis: number) {
  return AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, durationMillis);
}

export const Ao5_AVG_10000 = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  attemptFixtureWithTime(15_000),
];

export const Ao5_AVG_10000_WITH_PLUS_2 = [
  attemptFixtureWithTime(8_000),
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
  },
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  attemptFixtureWithTime(15_000),
];

export const Ao5_AVG_10000_WITH_DNF = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const Ao5_AVG_DNF = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const ALL_DNF = [
  {
    ...attemptFixtureWithTime(8_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const Mo3_MEAN_10000 = [
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
];

export const Mo3_MEAN_10000_WITH_PLUS_2 = [
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
  },
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
];

export const Mo3_MEAN_DNF = [
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  {
    ...attemptFixtureWithTime(7_000),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  },
];

export const PERCENTILE_STANDARD_100_ATTEMPTS = Array(100)
  .fill(0)
  .map((_, i) => attemptFixtureWithTime((i + 1) * 1000));
