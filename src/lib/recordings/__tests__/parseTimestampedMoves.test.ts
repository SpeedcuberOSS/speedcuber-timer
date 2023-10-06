// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  compressDoubleTurns,
  parseTimestampedMoves,
} from '../parseTimestampedMoves';

import { STIF } from '../../stif';
import { Attempt } from '../../stif/wrappers';

const RubiksConnectedAttempt =
  require('../__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const RubiksConnectedRecording =
  require('../__fixtures__/rubiks_connected_recording.json') as STIF.SolveRecording;
const RubiksConnectedSolveReplay =
  require('../__fixtures__/rubiks_connected_solve_replay.json') as STIF.TimestampedMove[];

describe('compressDoubleTurns', () => {
  it('compresses double turns', () => {
    const SolveReplayRaw: STIF.TimestampedMove[] = [
      { t: 5597, m: 'U' },
      { t: 5628, m: 'U' },
      { t: 5849, m: "R'" },
      { t: 5986, m: "R'" },
      { t: 6647, m: "F'" },
      { t: 6738, m: "F'" },
    ];
    const SolveReplayCompressed: STIF.TimestampedMove[] = [
      { t: 5597, m: 'U2' },
      { t: 5849, m: 'R2' },
      { t: 6647, m: 'F2' },
    ];

    expect(compressDoubleTurns(SolveReplayRaw)).toEqual(SolveReplayCompressed);
  });
});

describe('parseTimestampedMoves', () => {
  it('returns no solve replay if there is no message stream', () => {
    const startTime = new Attempt(RubiksConnectedAttempt).timerStart();
    expect(
      parseTimestampedMoves(
        {
          smartPuzzle: RubiksConnectedRecording.smartPuzzle,
          stream: [],
        },
        startTime,
      ),
    ).toEqual([]);
  });

  it('correctly parses a solve replay from a Rubiks Connected attempt', () => {
    const startTime = new Attempt(RubiksConnectedAttempt).timerStart();
    expect(parseTimestampedMoves(RubiksConnectedRecording, startTime)).toEqual(
      RubiksConnectedSolveReplay,
    );
  });
  it('correctly parses a solve replay from a Particula 2x2x2', () => {
    const attempt =
      require('../__fixtures__/particula_2x2x2_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_2x2x2_recording.json') as STIF.SolveRecording;
    const target =
      require('../__fixtures__/particula_2x2x2_solve_replay.json') as STIF.TimestampedMove[];
    const actual = parseTimestampedMoves(recording, attempt.timerStart);

    expect(actual).toEqual(target);
  });
  it('correctly parses a solve replay from a Particula 3x3x3', () => {
    const attempt =
      require('../__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_3x3x3_recording.json') as STIF.SolveRecording;
    const target =
      require('../__fixtures__/particula_3x3x3_solve_replay.json') as STIF.TimestampedMove[];

    // NOTE: This test enforces the omission of orientation quaternions.
    // A future version of the test will need to include them.
    const actual = parseTimestampedMoves(recording, attempt.timerStart);

    expect(actual).toEqual(target);
  });
});
