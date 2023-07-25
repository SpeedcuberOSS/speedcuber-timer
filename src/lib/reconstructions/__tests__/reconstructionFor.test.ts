// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import reconstructionFor from '..';
import { STIF } from '../../stif';

const smartAttempt2x2x2 =
  require('../../../lib/recordings/__fixtures__/particula_2x2x2_attempt.json') as STIF.Attempt;
const smartAttempt =
  require('../../../lib/recordings/__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const smartAttemptGyro =
  require('../../../lib/recordings/__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;
const smartAttempt2x2x2Replay =
  require('../../../lib/recordings/__fixtures__/particula_2x2x2_solve_replay.json') as STIF.TimestampedMove[];
const smartAttemptReplay =
  require('../../../lib/recordings/__fixtures__/rubiks_connected_solve_replay.json') as STIF.TimestampedMove[];
const smartAttemptGyroReplay =
  require('../../../lib/recordings/__fixtures__/particula_3x3x3_solve_replay.json') as STIF.TimestampedMove[];

describe('reconstructionFor', () => {
  it("returns the correct reconstruction for the Rubik's Connected", () => {
    expect(
      reconstructionFor(
        smartAttempt.solutions[0].scramble,
        smartAttemptReplay,
      ).using('CFOP'),
    ).toEqual(smartAttempt.solutions[0].reconstruction);
  });
  it("returns the correct reconstruction for the Particula 2x2x2", () => {
    expect(
      reconstructionFor(
        smartAttempt2x2x2.solutions[0].scramble,
        smartAttempt2x2x2Replay,
      ).using('CFOP'),
    ).toEqual(smartAttempt2x2x2.solutions[0].reconstruction);
  });
  it("returns the correct reconstruction for the Particula GoCube Edge", () => {
    expect(
      reconstructionFor(
        smartAttemptGyro.solutions[0].scramble,
        smartAttemptGyroReplay,
      ).using('CFOP'),
    ).toEqual(smartAttemptGyro.solutions[0].reconstruction);
  });
});
