// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import twistyData from './twisty_export.json';
import {
  EVENT_3x3x3,
  INSPECTION_EXCEEDED_15_SECONDS,
  PUZZLE_3x3x3,
  STOPPED_PUZZLE_UNSOLVED,
} from '../../stif/builtins';
import { AttemptBuilder } from '../../stif/builders';
import { Attempt } from '../../stif/wrappers';
import { v4 as uuid } from 'uuid';

// it('has a noop test to satisfy Jest', () => {
//   expect(true).toBe(true);
// });

const attempts: Array<Attempt> = [];

twistyData.forEach((twisty: string[]) => {
  const [
    puzzle,
    userCategory,
    durationMillis,
    dateMillis,
    scramble,
    penalty,
    comment,
  ] = twisty;
  if (puzzle === '333' && userCategory === 'CFOP') {
    const solveStart = parseInt(dateMillis, 10);
    const durationWithPenalties = solveStart + parseInt(durationMillis, 10);
    const penalties = penalty === '1' ? 2000 : 0;
    const duration = durationWithPenalties - penalties;
    const inspectionStart = solveStart - (14000 + penalties);
    const builder = new AttemptBuilder()
      .setEvent(EVENT_3x3x3)
      .setComment(comment)
      .addSolution({
        id: uuid(),
        puzzle: PUZZLE_3x3x3,
        scramble: scramble.split(' '),
        reconstruction: [],
      })
      .setInspectionStart(inspectionStart)
      .setTimerStart(solveStart)
      .setTimerStop(duration)
    if (penalty === '1') {
      builder.addInfraction(INSPECTION_EXCEEDED_15_SECONDS);
    }
    if (penalty === '2') {
      builder.addInfraction(STOPPED_PUZZLE_UNSOLVED);
    }
    const attempt = builder.wrapped().build();
    attempts.push(attempt);
  }
});

export default attempts;
