// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AttemptBuilder } from '../../builders';
import {
  EVENT_3x3x3,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
  PUZZLE_3x3x3,
  SIGNED_BEFORE_STARTING,
  STARTED_WHILE_TOUCHING_PUZZLE,
  STARTED_WRONG_HAND_PLACEMENT,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
} from '../../builtins';
import { Attempt } from '../Attempt';

const TEST_SOLUTION = {
  puzzle: PUZZLE_3x3x3,
  scramble: ['R', 'U'],
  reconstruction: [],
};
const BASE_BUILD = () =>
  new AttemptBuilder().setEvent(EVENT_3x3x3).addSolution(TEST_SOLUTION);

const TEST_INSPECTION_DURATION = 2000;
const TEST_SOLVE_DURATION = 4000;
const TEST_INSPECTION_START = new Date().getTime() - 20000;
const TEST_SOLVE_START = TEST_INSPECTION_START + TEST_INSPECTION_DURATION;
const TEST_SOLVE_END = TEST_SOLVE_START + TEST_SOLVE_DURATION;
const TIMED_BUILD = () => {
  return BASE_BUILD()
    .setInspectionStart(TEST_INSPECTION_START)
    .setSolveStart(TEST_SOLVE_START)
    .setSolveEnd(TEST_SOLVE_END);
};

const INSPECTION_BUILD = (inspectionDuration: number) => {
  let solveStart = TEST_INSPECTION_START + inspectionDuration;
  let solveEnd = solveStart + TEST_SOLVE_DURATION;
  return BASE_BUILD()
    .setInspectionStart(TEST_INSPECTION_START)
    .setSolveStart(solveStart)
    .setSolveEnd(solveEnd);
};

describe('[Wrapper] Attempt', () => {
  it('rejects invalid STIF.Attempts', () => {
    expect(
      () =>
        new Attempt({
          id: 'test',
          event: EVENT_3x3x3,
          inspectionStart: TEST_INSPECTION_START,
          solveStart: TEST_INSPECTION_START - TEST_INSPECTION_DURATION, // Solving before inspection
          solveEnd: TEST_INSPECTION_START + TEST_SOLVE_DURATION,
          solutions: [], // Missing solutions
          infractions: [],
          comment: '',
        }),
    ).toThrow();
  });
  it('provides access to all STIF.Attempt fields', () => {
    let attempt = new Attempt(TIMED_BUILD().setComment('test comment').build());

    expect(attempt.stif().id).toBeDefined();
    expect(attempt.stif().event).toEqual(EVENT_3x3x3);
    expect(attempt.stif().inspectionStart).toEqual(TEST_INSPECTION_START);
    expect(attempt.stif().solveStart).toEqual(TEST_SOLVE_START);
    expect(attempt.stif().solveEnd).toEqual(TEST_SOLVE_END);
    expect(attempt.stif().solutions).toEqual([TEST_SOLUTION]); // TODO replace with a wrapper
    expect(attempt.stif().infractions).toEqual([]);
    expect(attempt.stif().comment).toEqual('test comment');
  });
  it('computes inspection duration correctly', () => {
    let attempt = new Attempt(TIMED_BUILD().build());
    expect(attempt.inspectionDuration()).toEqual(TEST_INSPECTION_DURATION);
  });

  describe('infractions', () => {
    it('automatically includes infraction for inspection > 15 seconds', () => {
      let attempt = new Attempt(INSPECTION_BUILD(15500).build());
      expect(attempt.infractions()).toEqual([INSPECTION_EXCEEDED_15_SECONDS]);
    });
    it('automatically includes infraction for inspection > 17 seconds', () => {
      let attempt = new Attempt(INSPECTION_BUILD(17500).build());
      expect(attempt.infractions()).toEqual([INSPECTION_EXCEEDED_17_SECONDS]);
    });
    it('does not duplicate an existing infraction', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(15500)
          .addInfraction(INSPECTION_EXCEEDED_15_SECONDS)
          .build(),
      );
      expect(attempt.infractions()).toEqual([INSPECTION_EXCEEDED_15_SECONDS]);
    });
  });

  describe('penaltyDuration', () => {
    it('is zero in the absence of infractions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.penaltyDuration()).toBe(0);
    });
    it('is the sum of +2 penalties if such infractions occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD()
          .addInfraction(STARTED_WRONG_HAND_PLACEMENT)
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
          .build(),
      );
      expect(attempt.penaltyDuration()).toEqual(4000);
    })
    it('is Infinity for DNF', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STOPPED_PUZZLE_UNSOLVED).build(),
      );
      expect(attempt.penaltyDuration()).toEqual(Infinity);
    });
    it('is Infinity for DNS', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(SIGNED_BEFORE_STARTING).build(),
      );
      expect(attempt.penaltyDuration()).toEqual(Infinity);
    });
  })

  describe('duration', () => {
    it('is difference of solve timestamps in the absence of infractions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.duration()).toBe(TEST_SOLVE_DURATION);
    });
    it('includes the +2 penalty if such an infraction occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STARTED_WHILE_TOUCHING_PUZZLE).build(),
      );
      expect(attempt.duration()).toEqual(TEST_SOLVE_DURATION + 2000);
    });
    it('includes multiple +2 penalties if such infractions occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD()
          .addInfraction(STARTED_WRONG_HAND_PLACEMENT)
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
          .build(),
      );
      expect(attempt.duration()).toEqual(TEST_SOLVE_DURATION + 4000);
    });
    it('is Infinity for DNF', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STOPPED_PUZZLE_UNSOLVED).build(),
      );
      expect(attempt.duration()).toEqual(Infinity);
    });
    it('is Infinity for DNS', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(SIGNED_BEFORE_STARTING).build(),
      );
      expect(attempt.duration()).toEqual(Infinity);
    });
    it('includes the +2 penalty for overly long inspection', () => {
      let attempt = new Attempt(INSPECTION_BUILD(15500).build());
      expect(attempt.duration()).toEqual(TEST_SOLVE_DURATION + 2000);
    });
    it('includes the DNS penalty for overly long inspection', () => {
      let attempt = new Attempt(INSPECTION_BUILD(17500).build());
      expect(attempt.duration()).toEqual(Infinity);
    });
  });

  describe('durationWithoutPenalties', () => {
    it('is difference of solve timestamps in the absence of infractions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.durationWithoutPenalties()).toBe(TEST_SOLVE_DURATION);
    });
    it('is the difference of solve timestamps if +2 penalties occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STARTED_WHILE_TOUCHING_PUZZLE).build(),
      );
      expect(attempt.durationWithoutPenalties()).toEqual(TEST_SOLVE_DURATION);
    });
    it('is the difference of solve timestamps if a DNF occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STOPPED_PUZZLE_UNSOLVED).build(),
      );
      expect(attempt.durationWithoutPenalties()).toEqual(TEST_SOLVE_DURATION);
    });
    it('is the difference of solve timestamps if a DNS occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(SIGNED_BEFORE_STARTING).build(),
      );
      expect(attempt.durationWithoutPenalties()).toEqual(TEST_SOLVE_DURATION);
    });
  })

  describe('result', () => {
    it('is difference of solve timestamps in the absence of infractions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.result()).toBe(TEST_SOLVE_DURATION);
    });
    it('includes the +2 penalty in the time if such an infraction occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STARTED_WHILE_TOUCHING_PUZZLE).build(),
      );
      expect(attempt.result()).toEqual(TEST_SOLVE_DURATION + 2000);
    });
    it('includes multiple +2 penalties in the duration if such infractions occurred', () => {
      let attempt = new Attempt(
        TIMED_BUILD()
          .addInfraction(STARTED_WRONG_HAND_PLACEMENT)
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING)
          .build(),
      );
      expect(attempt.result()).toEqual(TEST_SOLVE_DURATION + 4000);
    });
    it('is "DNF" for corresponding infractions', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(STOPPED_PUZZLE_UNSOLVED).build(),
      );
      expect(attempt.result()).toEqual('DNF');
    });
    it('is "DNS" for corresponding infractions', () => {
      let attempt = new Attempt(
        TIMED_BUILD().addInfraction(SIGNED_BEFORE_STARTING).build(),
      );
      expect(attempt.result()).toEqual('DNS');
    });
    it('includes the +2 penalty for overly long inspection', () => {
      let attempt = new Attempt(INSPECTION_BUILD(15500).build());
      expect(attempt.result()).toEqual(TEST_SOLVE_DURATION + 2000);
    });
    it('is "DNF" for overly long inspection', () => {
      let attempt = new Attempt(INSPECTION_BUILD(17500).build());
      expect(attempt.result()).toEqual('DNF');
    });
  });
});
