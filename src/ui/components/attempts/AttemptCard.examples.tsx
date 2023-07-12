// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
import { Milliseconds } from '../../../lib/stif';
import { Attempt } from '../../../lib/stif/wrappers';
import { DevelopmentExampleSet } from '../../examples/types';

import AttemptCard from './AttemptCard';

const INSPECTION_START = 1663731466876;
const INSPECTION_DURATION = 13456;
const SOLVE_DURATION = 23343;
const MINUTE: Milliseconds = 60000;
const HOUR: Milliseconds = 60 * MINUTE;

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
    .setTimerStop(INSPECTION_START + INSPECTION_DURATION + duration)
    .addSolution(SOLUTION_3x3x3);

let attempt3x3x3WithReconstruction = (duration: Milliseconds) =>
  new Attempt(
    new AttemptBuilder()
      .setEvent(EVENT_3x3x3)
      .setInspectionStart(INSPECTION_START)
      .setTimerStart(INSPECTION_START + INSPECTION_DURATION)
      .setTimerStop(INSPECTION_START + INSPECTION_DURATION + duration)
      .addSolution(SOLUTION_3x3x3_WITH_RECONSTRUCTION)
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
        .setScramble(['R', 'U', "R'", "U'"])
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
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()

        .setPuzzle(PUZZLE_5x5x5)
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_6x6x6)
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    )
    .addSolution(
      new SolutionBuilder()
        .setPuzzle(PUZZLE_7x7x7)
        .setScramble(['R', 'U', "R'", "U'"])
        .build(),
    )
    .build(),
);

let attemptMultiBLD = (() => {
  const BLD_COUNT = 50;
  let builder = new AttemptBuilder()
    .setEvent(EVENT_3x3x3_BLD_MULTI(BLD_COUNT))
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
  key: 'attemptcard',
  title: 'Attempt Card',
  description: 'A card that displays an attempt.',
  examples: [
    {
      key: 'typical',
      title: 'Typical',
      component: (
        <AttemptCard attempt={new Attempt(ATTEMPT_3x3x3(11343).build())} />
      ),
    },
    {
      key: 'dnf',
      title: 'DNF',
      component: (
        <AttemptCard
          attempt={
            new Attempt(
              ATTEMPT_3x3x3(11343)
                .addInfraction(STOPPED_PUZZLE_UNSOLVED)
                .build(),
            )
          }
        />
      ),
    },
    {
      key: 'dns',
      title: 'DNS',
      component: (
        <AttemptCard
          attempt={
            new Attempt(
              ATTEMPT_3x3x3(11343)
                .addInfraction(SIGNED_BEFORE_STARTING)
                .build(),
            )
          }
        />
      ),
    },
    {
      key: 'plus2',
      title: '+2',
      component: (
        <AttemptCard
          attempt={
            new Attempt(
              ATTEMPT_3x3x3(11343)
                .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
                .build(),
            )
          }
        />
      ),
    },
    {
      key: 'plus4',
      title: '+4',
      component: (
        <AttemptCard
          attempt={
            new Attempt(
              ATTEMPT_3x3x3(11343)
                .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
                .addInfraction(STOPPED_WRONG_HAND_PLACEMENT)
                .build(),
            )
          }
        />
      ),
    },
    {
      key: 'reconstruction',
      title: 'with Reconstruction',
      component: (
        <AttemptCard attempt={attempt3x3x3WithReconstruction(11343)} />
      ),
    },
    {
      key: 'minutelong',
      title: 'Minute Long',
      component: (
        <AttemptCard
          attempt={new Attempt(ATTEMPT_3x3x3(11343 + 1 * MINUTE).build())}
        />
      ),
    },
    {
      key: 'hourlong',
      title: 'Hour Long',
      component: (
        <AttemptCard
          attempt={
            new Attempt(ATTEMPT_3x3x3(11343 + 12 * MINUTE + 10 * HOUR).build())
          }
        />
      ),
    },
    {
      key: 'relay234567',
      title: 'Relay 2-7',
      component: <AttemptCard attempt={attempt234567relay} />,
    },
    {
      key: 'multibld',
      title: 'Multi-BLD',
      component: <AttemptCard attempt={attemptMultiBLD} />,
    },
  ],
};

export default examples;
