// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../../stif';
import { parseReconstruction } from '../parseReconstruction';
import { parseReconstructionAsync } from '../parseReconstructionAsync';

const rcAttempt =
  require('../__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const rcRecording =
  require('../__fixtures__/rubiks_connected_recording.json') as STIF.SolveRecording;

describe('parseReconstructionAsync', () => {
  it('resolves with the same result as parseReconstruction for a Rubiks Connected attempt', async () => {
    const attempt = rcAttempt;
    const scramble = attempt.solutions[0].scramble;
    const expected = parseReconstruction(rcRecording, scramble, attempt.timerStart);
    const actual = await parseReconstructionAsync(
      rcRecording,
      scramble,
      attempt.timerStart,
    );
    expect(actual).toEqual(expected);
  });

  it('resolves with the same result as parseReconstruction for a Particula 2x2x2', async () => {
    const attempt =
      require('../__fixtures__/particula_2x2x2_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_2x2x2_recording.json') as STIF.SolveRecording;
    const scramble = attempt.solutions[0].scramble;
    const expected = parseReconstruction(recording, scramble, attempt.timerStart);
    const actual = await parseReconstructionAsync(
      recording,
      scramble,
      attempt.timerStart,
    );
    expect(actual).toEqual(expected);
  });

  it('resolves with the same result as parseReconstruction for a Particula 3x3x3', async () => {
    const attempt =
      require('../__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_3x3x3_recording.json') as STIF.SolveRecording;
    const scramble = attempt.solutions[0].scramble;
    const expected = parseReconstruction(recording, scramble, attempt.timerStart);
    const actual = await parseReconstructionAsync(
      recording,
      scramble,
      attempt.timerStart,
    );
    expect(actual).toEqual(expected);
  });

  it('resolves with an empty array when there is no message stream', async () => {
    const actual = await parseReconstructionAsync(
      { smartPuzzle: rcRecording.smartPuzzle, stream: [] },
      rcAttempt.solutions[0].scramble,
      rcAttempt.timerStart,
    );
    expect(actual).toEqual([]);
  });
});
