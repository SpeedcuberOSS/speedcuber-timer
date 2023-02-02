// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  SolveReplay,
  compressDoubleTurns,
  getSolveReplay,
} from '../getSolveReplay';

import { Attempt } from '../../stif';

const RubiksConnectedAttempt =
  require('../__fixtures__/rubiks_connected_attempt.json') as Attempt;
const RubiksConnectedSolveReplay =
  require('../__fixtures__/rubiks_connected_solve_replay.json') as SolveReplay;

describe('compressDoubleTurns', () => {
  it('compresses double turns', () => {
    const SolveReplayRaw =
      require('../__fixtures__/solve_replay_raw.json') as SolveReplay;
    const SolveReplayCompressed =
      require('../__fixtures__/solve_replay_compressed.json') as SolveReplay;

    expect(compressDoubleTurns(SolveReplayRaw)).toEqual(SolveReplayCompressed);
  });
});

describe('getSolveReplay', () => {
  it('returns no solve replay if there is no message stream', () => {
    expect(
      getSolveReplay({ ...RubiksConnectedAttempt, extensions: [] }),
    ).toEqual([]);
  });

  it('correctly parses a solve replay from a Rubiks Connected attempt', () => {
    expect(getSolveReplay(RubiksConnectedAttempt)).toEqual(
      RubiksConnectedSolveReplay,
    );
  });
  it('correctly parses a solve replay from a Particula 2x2x2', () => {
    const Particula2x2x2Attempt =
      require('../__fixtures__/particula_2x2x2_attempt.json') as Attempt;
    const Particula2x2x2SolveReplay =
      require('../__fixtures__/particula_2x2x2_solve_replay.json') as SolveReplay;

    const replay = getSolveReplay(Particula2x2x2Attempt);

    expect(replay).toEqual(Particula2x2x2SolveReplay);
  });
  it('correctly parses a solve replay from a Particula 3x3x3', () => {
    const Particula3x3x3Attempt =
      require('../__fixtures__/particula_3x3x3_attempt.json') as Attempt;
    const Particula3x3x3SolveReplay =
      require('../__fixtures__/particula_3x3x3_solve_replay.json') as SolveReplay;

    // NOTE: This test enforces the omission of orientation quaternions.
    // A future version of the test will need to include them.
    const replay = getSolveReplay(Particula3x3x3Attempt);

    expect(replay).toEqual(Particula3x3x3SolveReplay);
  });
});
