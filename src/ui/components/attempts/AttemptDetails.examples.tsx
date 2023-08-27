// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds } from '../../../lib/stif';
import { AttemptBuilder, SolutionBuilder } from '../../../lib/stif/builders';
import {
  EVENT_3x3x3,
  EVENT_3x3x3_BLD_MULTI,
  EVENT_RELAY_234567,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  SIGNED_BEFORE_STARTING,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_WRONG_HAND_PLACEMENT,
} from '../../../lib/stif/builtins';
import { Attempt } from '../../../lib/stif/wrappers';
import { DevelopmentExampleSet } from '../../examples/types';

import AttemptDetails from './AttemptDetails';

/**
 * TODOs
 * - [ ] Extract the common Attempt types into a shared file.
 *       Perhaps something like `stif/testing`?
 */

const INSPECTION_START = 1663731466876;
const INSPECTION_DURATION = 13456;
const SOLVE_DURATION = 23343;
const SOLUTION_3x3x3 = {
  puzzle: PUZZLE_3x3x3,
  scramble: ['R', 'U'],
  reconstruction: [],
};

const SOLUTION_3x3x3_WITH_RECONSTRUCTION = {
  ...SOLUTION_3x3x3,
  reconstruction: [
    {
      label: 'step1',
      moves: [
        { t: 500, m: 'R' },
        { t: 750, m: 'U' },
      ],
    },
    {
      label: 'step2',
      moves: [
        { t: 1000, m: "U'" },
        { t: 1250, m: "R'" },
      ],
    },
    {
      label: 'step3',
      moves: [
        { t: 1500, m: "U'" },
        { t: 1750, m: "R'" },
      ],
    },
  ],
};

const ATTEMPT_3x3x3 = (duration: Milliseconds) =>
  new AttemptBuilder()
    .setEvent(EVENT_3x3x3)
    .setInspectionStart(INSPECTION_START)
    .setTimerStart(INSPECTION_START + INSPECTION_DURATION)
    .setTimerStop(INSPECTION_START + INSPECTION_DURATION + duration);

export const basicAttempt = new Attempt(
  ATTEMPT_3x3x3(SOLVE_DURATION)
    .addSolution(SOLUTION_3x3x3)
    .setComment('What a solve!')
    .build(),
);

export const longCommentAttempt = new Attempt(
  ATTEMPT_3x3x3(SOLVE_DURATION)
    .addSolution(SOLUTION_3x3x3)
    .setComment(
      `Ex occaecat nostrud aliqua anim consectetur amet labore consequat. Cupidatat enim dolor anim occaecat minim ut ea consectetur et ullamco ad. Ex anim nisi officia tempor in ea culpa mollit minim qui. Anim culpa aliquip velit enim sunt ut sit aliquip in qui id Lorem. Pariatur nostrud qui dolor quis voluptate sunt anim laborum occaecat pariatur cillum. Est aliquip labore pariatur aute.

Cupidatat officia aute elit sunt dolore sunt anim tempor enim. Ad in in reprehenderit amet eu exercitation amet ullamco excepteur Lorem. Qui reprehenderit quis aliqua ut sint elit ea. Minim non magna ullamco fugiat sunt et esse incididunt veniam ea exercitation aliquip esse incididunt. Ut mollit consectetur aliqua pariatur. Aliquip officia ut commodo commodo eiusmod labore cillum in quis nisi culpa laborum. Dolore voluptate excepteur reprehenderit incididunt pariatur.

Esse do velit aute est aute anim ipsum aliquip consequat velit minim. Cillum cupidatat aute quis incididunt laboris duis fugiat sint sunt est. Ad esse qui qui duis consectetur non dolor duis. Laboris non deserunt minim duis pariatur culpa magna aute. Cillum consequat ad adipisicing in sint culpa consequat in non dolore.`,
    )
    .build(),
);

export const reconstructionAttempt = new Attempt(
  ATTEMPT_3x3x3(3470)
    .addSolution(SOLUTION_3x3x3_WITH_RECONSTRUCTION)
    .setComment('What a solve!')
    .build(),
);

export const dnfAttempt = new Attempt(
  ATTEMPT_3x3x3(11343)
    .addSolution(SOLUTION_3x3x3)
    .addInfraction(STOPPED_PUZZLE_UNSOLVED)
    .build(),
);

export const dnsAttempt = new Attempt(
  ATTEMPT_3x3x3(11343)
    .addSolution(SOLUTION_3x3x3)
    .addInfraction(SIGNED_BEFORE_STARTING)
    .build(),
);

export const plus2Attempt = new Attempt(
  ATTEMPT_3x3x3(11343)
    .addSolution(SOLUTION_3x3x3)
    .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
    .build(),
);
export const plus4Attempt = new Attempt(
  ATTEMPT_3x3x3(11343)
    .addSolution(SOLUTION_3x3x3)
    .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
    .addInfraction(STOPPED_WRONG_HAND_PLACEMENT)
    .build(),
);
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
  key: 'attemptdetails',
  title: 'Attempt Details',
  description: 'A more detailed view of an attempt.',
  examples: [
    {
      key: 'typical',
      title: 'Typical',
      component: <AttemptDetails attempt={basicAttempt} />,
    },
    {
      key: 'longComment',
      title: 'Long Comment',
      component: <AttemptDetails attempt={longCommentAttempt} />,
    },
    {
      key: 'reconstruction',
      title: 'with Reconstruction',
      component: <AttemptDetails attempt={reconstructionAttempt} />,
    },
    {
      key: 'tps',
      title: 'with TPS pressed handler',
      component: (
        <AttemptDetails
          attempt={reconstructionAttempt}
          onPressTPS={attempt => console.log(attempt.stif())}
        />
      ),
    },
    {
      key: 'plus2',
      title: '+2',
      component: <AttemptDetails attempt={plus2Attempt} />,
    },
    {
      key: 'plus4',
      title: '+4',
      component: <AttemptDetails attempt={plus4Attempt} />,
    },
    {
      key: 'dnf',
      title: 'with DNF',
      component: <AttemptDetails attempt={dnfAttempt} />,
    },
    {
      key: 'dns',
      title: 'with DNS',
      component: <AttemptDetails attempt={dnsAttempt} />,
    },
    {
      key: 'relay234567',
      title: 'Relay 2-7',
      component: <AttemptDetails attempt={attempt234567relay} />,
    },
    {
      key: 'multibld',
      title: 'Multi-BLD',
      component: <AttemptDetails attempt={attemptMultiBLD} />,
    },
  ],
};

export default examples;
