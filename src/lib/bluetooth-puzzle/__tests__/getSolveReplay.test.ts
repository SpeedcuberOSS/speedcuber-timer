// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SolveReplay, getSolveReplay } from '../getSolveReplay';

import { Attempt } from '../../stif';

const RubiksConnectedAttempt =
  require('../__fixtures__/rubiks_connected_attempt.json') as Attempt;
const RubiksConnectedSolveReplay =
  require('../__fixtures__/rubiks_connected_solve_replay.json') as SolveReplay;

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
});
