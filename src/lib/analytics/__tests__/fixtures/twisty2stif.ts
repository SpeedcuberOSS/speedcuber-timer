// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import twistyData from './twisty_export.json';
import {
  AlgorithmBuilder,
  Attempt,
  AttemptBuilder,
  EVENT_3x3x3,
  INSPECTION_EXCEEDED_15_SECONDS,
  PUZZLE_3x3x3,
  ScrambleBuilder,
  SolutionBuilder,
  STOPPED_PUZZLE_UNSOLVED,
} from '../../../stif';

it('has a noop test to satisfy Jest', () => {
  expect(true).toBe(true);
});

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
    const attemptBuilder = new AttemptBuilder()
      .setDuration(parseInt(durationMillis, 10))
      .setEvent(EVENT_3x3x3)
      .setComment(comment)
      .setTimestamp(new Date(parseInt(dateMillis, 10)))
      .addSolution(
        new SolutionBuilder()
          .setScramble(
            new ScrambleBuilder()
              .setPuzzle(PUZZLE_3x3x3)
              .setAlgorithm(
                new AlgorithmBuilder().setMoves(scramble.split(' ')).build(),
              )
              .build(),
          )
          .build(),
      );
    if (penalty === '1') {
      attemptBuilder.addInfraction(INSPECTION_EXCEEDED_15_SECONDS);
      // Twisty Timer includes the +2 penalty in the duration.
      // We track the +2 penalty separately.
      attemptBuilder.setDuration(parseInt(durationMillis, 10) - 2000);
    }
    if (penalty === '2') {
      attemptBuilder.addInfraction(STOPPED_PUZZLE_UNSOLVED);
    }
    const attempt = attemptBuilder.build();
    attempts.push(attempt);
  }
});

export default attempts;
