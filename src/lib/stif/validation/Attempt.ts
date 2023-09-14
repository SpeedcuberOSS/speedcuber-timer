// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from "../STIF";
import { v4 as uuid } from 'uuid';
import { err, lengthGreaterThan } from './_utils';
import { STIFError } from '../exceptions';

export function validateAttempt(wip: Partial<STIF.Attempt>): STIF.Attempt {
  let attempt = {
    id: wip.id ?? uuid(),
    event: wip.event ?? err('event'),
    inspectionStart: wip.inspectionStart ?? err('inspectionStart'),
    timerStart: wip.timerStart ?? err('timerStart'),
    timerStop: wip.timerStop ?? err('timerStop'),
    solutions: lengthGreaterThan(0, wip.solutions)
      ? wip.solutions
      : err('solutions'),
    infractions: wip.infractions ?? [],
    comment: wip.comment ?? '',
  };
  if (attempt.timerStop < attempt.timerStart) {
    throw new STIFError('`timerStop` cannot occur prior to `timerStart`');
  }
  if (attempt.timerStart < attempt.inspectionStart) {
    throw new STIFError('`timerStart` cannot occur prior to `inspectionStart`');
  }
  let solvedPuzzles = attempt.solutions
    .map(s => s.puzzle)
    .sort()
    .join(',');
  let eventPuzzles = attempt.event.puzzles.sort().join(',');
  if (solvedPuzzles !== eventPuzzles) {
    throw new STIFError(
      '`solutions` do not match the `event`: ' +
        solvedPuzzles +
        ' !== ' +
        eventPuzzles,
    );
  }

  return attempt;
}