// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  EVENT_3x3x3,
  PUZZLE_3x3x3,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
} from '../../stif/builtins';
import { AttemptBuilder } from '../../stif/builders';
import { Attempt } from '../../stif/wrappers';

// it('has a noop test to satisfy Jest', () => {
//   expect(true).toBe(true);
// });

let TEST_SCRAMBLE = ['R', 'U'];

export function attemptFixtureWithTime(durationMillis: number) {
  let now = new Date().getTime();
  return new Attempt(
    new AttemptBuilder()
      .setEvent(EVENT_3x3x3)
      .setInspectionStart(now - 15_000)
      .setTimerStart(now)
      .setTimerStop(now + durationMillis)
      .addSolution({
        puzzle: PUZZLE_3x3x3,
        scramble: TEST_SCRAMBLE,
        reconstruction: [],
      })
      .build(),
  );
}

export const Ao5_AVG_10000: Attempt[] = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  attemptFixtureWithTime(15_000),
];

export const Ao5_AVG_10000_WITH_PLUS_2: Attempt[] = [
  attemptFixtureWithTime(8_000),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
  }),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  attemptFixtureWithTime(15_000),
];

export const Ao5_AVG_10000_WITH_DNF: Attempt[] = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
];

export const Ao5_AVG_DNF: Attempt[] = [
  attemptFixtureWithTime(8_000),
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
];

export const ALL_DNF: Attempt[] = [
  new Attempt({
    ...attemptFixtureWithTime(8_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
];

export const Mo3_MEAN_10000: Attempt[] = [
  attemptFixtureWithTime(9_000),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
];

export const Mo3_MEAN_10000_WITH_PLUS_2: Attempt[] = [
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
  }),
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
];

export const Mo3_MEAN_DNF: Attempt[] = [
  attemptFixtureWithTime(10_000),
  attemptFixtureWithTime(11_000),
  new Attempt({
    ...attemptFixtureWithTime(7_000).stif(),
    infractions: [STOPPED_PUZZLE_UNSOLVED],
  }),
];

export const PERCENTILE_STANDARD_100_ATTEMPTS = Array(100)
  .fill(0)
  .map((_, i) => attemptFixtureWithTime((i + 1) * 1000));
