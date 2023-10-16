// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../../stif';
import { parseReconstruction } from '../parseReconstruction';

const rcAttempt =
  require('../__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const rcRecording =
  require('../__fixtures__/rubiks_connected_recording.json') as STIF.SolveRecording;

describe('parseReconstruction', () => {
  it('returns no reconstruction if there is no message stream', () => {
    const recording = rcRecording;
    const actual = parseReconstruction(
      { smartPuzzle: recording.smartPuzzle, stream: [] },
      rcAttempt.solutions[0].scramble,
      rcAttempt.timerStart,
    );
    expect(actual).toEqual([]);
  });

  it('correctly parses a solve replay from a Rubiks Connected attempt', () => {
    const attempt = rcAttempt;
    const scramble = attempt.solutions[0].scramble;
    const actual = parseReconstruction(rcRecording, scramble, attempt.timerStart);
    expect(actual).toMatchSnapshot();
  });

  it('correctly parses a solve replay from a Particula 2x2x2', () => {
    const attempt =
      require('../__fixtures__/particula_2x2x2_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_2x2x2_recording.json') as STIF.SolveRecording;
    const scramble = attempt.solutions[0].scramble;
    const actual = parseReconstruction(recording, scramble, attempt.timerStart);
    expect(actual).toMatchSnapshot();
  });

  it('correctly parses a solve replay from a Particula 3x3x3', () => {
    const attempt =
      require('../__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;
    const recording =
      require('../__fixtures__/particula_3x3x3_recording.json') as STIF.SolveRecording;
    const scramble = attempt.solutions[0].scramble;
    const actual = parseReconstruction(recording, scramble, attempt.timerStart);
    expect(actual).toMatchSnapshot();
  });
});
