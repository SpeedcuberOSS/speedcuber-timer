// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ATTEMPT_3x3x3_BASIC,
  ATTEMPT_3x3x3_DNF,
  ATTEMPT_3x3x3_DNS,
  ATTEMPT_3x3x3_LONG_COMMENT,
  ATTEMPT_3x3x3_PLUS_2,
  ATTEMPT_3x3x3_PLUS_4,
  ATTEMPT_3x3x3_RECONSTRUCTED,
} from '../../../lib/stif/demo';
import { AttemptBuilder, SolutionBuilder } from '../../../lib/stif/builders';
import {
  EVENT_3x3x3_BLD_MULTI,
  EVENT_RELAY_234567,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
} from '../../../lib/stif/builtins';

import { Attempt } from '../../../lib/stif/wrappers';
import AttemptDetails from './AttemptDetails';
import { DevelopmentExampleSet } from '../../examples/types';

const INSPECTION_START = 1663731466876;
const INSPECTION_DURATION = 13456;
const SOLVE_DURATION = 23343;

export const basicAttempt = new Attempt(ATTEMPT_3x3x3_BASIC);
export const longCommentAttempt = new Attempt(ATTEMPT_3x3x3_LONG_COMMENT);
export const reconstructionAttempt = new Attempt(ATTEMPT_3x3x3_RECONSTRUCTED);
export const dnfAttempt = new Attempt(ATTEMPT_3x3x3_DNF);
export const dnsAttempt = new Attempt(ATTEMPT_3x3x3_DNS);
export const plus2Attempt = new Attempt(ATTEMPT_3x3x3_PLUS_2);
export const plus4Attempt = new Attempt(ATTEMPT_3x3x3_PLUS_4);
let attempt234567relay = new Attempt(
  new AttemptBuilder()
    .setEvent(EVENT_RELAY_234567)
    .setInspectionStart(INSPECTION_START)
    .setTimerStart(INSPECTION_START + INSPECTION_DURATION)
    .setTimerStop(INSPECTION_START + INSPECTION_DURATION + SOLVE_DURATION * 5)
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_2x2x2)
        .setScramble(['R', 'U'])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_4x4x4)
        .setScramble(['R', 'U', "R'", "U'", "R'", "U'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()

        .setPuzzle(PUZZLE_5x5x5)
        .setScramble(['R', 'U', "R'", "U'", 'Rw', 'Uw', "Rw'", "Uw'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_6x6x6)
        .setScramble([
          'R',
          'U',
          "R'",
          "U'",
          'Rw',
          'Uw',
          "Rw'",
          "Uw'",
          'R',
          'U',
          "R'",
          "U'",
          'Rw',
          'Uw',
          "Rw'",
          "Uw'",
        ])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_7x7x7)
        .setScramble([
          'R',
          'U',
          "R'",
          "U'",
          'Rw',
          'Uw',
          "Rw'",
          "Uw'",
          'R',
          'U',
          "R'",
          "U'",
          'Rw',
          'Uw',
          "Rw'",
          "Uw'",
          '2Rw',
          '2Uw',
          "2Rw'",
          "2Uw'",
          '2Rw',
          '2Uw',
          "2Rw'",
          "2Uw'",
        ])
        .build(),
    )
    .build(),
);
let attemptMultiBLD = (() => {
  const BLD_COUNT = 50;
  const event = {
    ...EVENT_3x3x3_BLD_MULTI,
    puzzles: new Array(BLD_COUNT).fill(PUZZLE_3x3x3),
  };
  let builder = new AttemptBuilder()
    .setEvent(event)
    .setInspectionStart(INSPECTION_START)
    .setTimerStart(INSPECTION_START + INSPECTION_DURATION)
    .setTimerStop(
      INSPECTION_START + INSPECTION_DURATION + SOLVE_DURATION * BLD_COUNT,
    );
  for (let i = 0; i < BLD_COUNT; i++) {
    builder.addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    );
  }
  return new Attempt(builder.build());
})();

const examples: DevelopmentExampleSet = {
  title: 'Attempt Details',
  description: 'A more detailed view of an attempt.',
  examples: [
    {
      title: 'Typical',
      component: <AttemptDetails attempt={basicAttempt} />,
    },
    {
      title: 'Long Comment',
      component: <AttemptDetails attempt={longCommentAttempt} />,
    },
    {
      title: 'with Reconstruction',
      component: <AttemptDetails attempt={reconstructionAttempt} />,
    },
    {
      title: 'with TPS pressed handler',
      component: (
        <AttemptDetails
          attempt={reconstructionAttempt}
          onPressTPS={attempt => console.log(attempt.stif())}
        />
      ),
    },
    {
      title: '+2',
      component: <AttemptDetails attempt={plus2Attempt} />,
    },
    {
      title: '+4',
      component: <AttemptDetails attempt={plus4Attempt} />,
    },
    {
      title: 'with DNF',
      component: <AttemptDetails attempt={dnfAttempt} />,
    },
    {
      title: 'with DNS',
      component: <AttemptDetails attempt={dnsAttempt} />,
    },
    {
      title: 'Relay 2-7',
      component: <AttemptDetails attempt={attempt234567relay} />,
    },
    {
      title: 'Multi-BLD',
      component: <AttemptDetails attempt={attemptMultiBLD} />,
    },
  ],
};

export default examples;
