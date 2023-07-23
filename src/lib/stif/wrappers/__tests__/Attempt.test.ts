// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AttemptBuilder } from '../../builders';
import {
  EVENT_3x3x3,
  EVENT_3x3x3_BLD_MULTI,
  EVENT_RELAY_23,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  RESET_TIMER_BEFORE_SIGNATURES,
  SIGNED_BEFORE_STARTING,
  STARTED_WHILE_TOUCHING_PUZZLE,
  STARTED_WRONG_HAND_PLACEMENT,
  STOPPED_PUZZLE_HELD,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_WRONG_HAND_PLACEMENT,
} from '../../builtins';
import { Attempt } from '../Attempt';
import { Solution } from '../Solution';
// TODO This import indicates the need for a centralized place for
// reusable test data.
import { RECONSTRUCTION_BUILD } from './Solution.test';

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
const TEST_TIMER_START = TEST_INSPECTION_START + TEST_INSPECTION_DURATION;
const TEST_TIMER_STOP = TEST_TIMER_START + TEST_SOLVE_DURATION;
const TIMED_BUILD = () => {
  return BASE_BUILD()
    .setInspectionStart(TEST_INSPECTION_START)
    .setTimerStart(TEST_TIMER_START)
    .setTimerStop(TEST_TIMER_STOP);
};

const INSPECTION_BUILD = (inspectionDuration: number) => {
  let solveStart = TEST_INSPECTION_START + inspectionDuration;
  let solveEnd = solveStart + TEST_SOLVE_DURATION;
  return BASE_BUILD()
    .setInspectionStart(TEST_INSPECTION_START)
    .setTimerStart(solveStart)
    .setTimerStop(solveEnd);
};

describe('[Wrapper] Attempt', () => {
  it('rejects invalid STIF.Attempts', () => {
    expect(
      () =>
        new Attempt({
          id: 'test',
          event: EVENT_3x3x3,
          inspectionStart: TEST_INSPECTION_START,
          timerStart: TEST_INSPECTION_START - TEST_INSPECTION_DURATION, // Solving before inspection
          timerStop: TEST_INSPECTION_START + TEST_SOLVE_DURATION,
          solutions: [], // Missing solutions
          infractions: [],
          comment: '',
        }),
    ).toThrow();
  });
  it('provides access to all STIF.Attempt fields', () => {
    let attempt = new Attempt(TIMED_BUILD().setComment('test comment').build());
    expect(attempt.id()).toBeDefined();
    expect(attempt.event()).toEqual(EVENT_3x3x3);
    expect(attempt.inspectionStart()).toEqual(TEST_INSPECTION_START);
    expect(attempt.timerStart()).toEqual(TEST_TIMER_START);
    expect(attempt.timerEnd()).toEqual(TEST_TIMER_STOP);
    expect(attempt.solutions().length).toEqual(1);
    expect(attempt.infractions()).toEqual([]);
    expect(attempt.comment()).toEqual('test comment');
  });
  it('provides access to the raw STIF.Attempt', () => {
    let stifAttempt = TIMED_BUILD().build();
    let attempt = new Attempt(stifAttempt);
    expect(attempt.stif()).toEqual(stifAttempt);
  });
  it('computes inspection duration correctly', () => {
    let attempt = new Attempt(TIMED_BUILD().build());
    expect(attempt.inspectionDuration()).toEqual(TEST_INSPECTION_DURATION);
  });

  describe('solutions', () => {
    it('returns Solution wrappers', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.solutions()[0]).toBeInstanceOf(Solution);
    });
    it('wraps all solutions in the STIF.Attempt', () => {
      let solution2x2x2 = {
        puzzle: PUZZLE_2x2x2,
        scramble: ['R', 'U'],
        reconstruction: [],
      };
      let attempt = new Attempt(
        new AttemptBuilder()
          .setEvent(EVENT_RELAY_23)
          .setInspectionStart(TEST_INSPECTION_START)
          .setTimerStart(TEST_TIMER_START)
          .setTimerStop(TEST_TIMER_STOP)
          .addSolution(solution2x2x2)
          .addSolution(TEST_SOLUTION)
          .build(),
      );
      expect(attempt.solutions().length).toEqual(2);
      expect(attempt.solutions()[0].stif()).toEqual(solution2x2x2);
      expect(attempt.solutions()[1].stif()).toEqual(TEST_SOLUTION);
    });
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

  describe('penaltyCount', () => {
    it('is zero for attempts with no infractions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.penaltyCount()).toEqual(0);
    });
    it('includes both inspection and other infractions', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(15500)
          .addInfraction(STARTED_WRONG_HAND_PLACEMENT)
          .build(),
      );
      expect(attempt.penaltyCount()).toEqual(2);
    });
    it('includes penalties of all types by default', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(17500) // DNF
          .addInfraction(SIGNED_BEFORE_STARTING) // DNS
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING) // +2
          .build(),
      );
      expect(attempt.penaltyCount()).toEqual(3);
    });
    it('counts just +2 penalties when requested', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(15500) // +2
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING) // +2
          .addInfraction(STOPPED_WRONG_HAND_PLACEMENT) // +2
          .addInfraction(STOPPED_PUZZLE_HELD) // DNF
          .addInfraction(RESET_TIMER_BEFORE_SIGNATURES) // DNF
          .addInfraction(SIGNED_BEFORE_STARTING) // DNS
          .build(),
      );
      expect(attempt.penaltyCount('+2')).toEqual(3);
    });
    it('counts just DNF penalties when requested', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(15500) // +2
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING) // +2
          .addInfraction(STOPPED_WRONG_HAND_PLACEMENT) // +2
          .addInfraction(STOPPED_PUZZLE_HELD) // DNF
          .addInfraction(RESET_TIMER_BEFORE_SIGNATURES) // DNF
          .addInfraction(SIGNED_BEFORE_STARTING) // DNS
          .build(),
      );
      expect(attempt.penaltyCount('DNF')).toEqual(2);
    });
    it('counts just DNS penalties when requested', () => {
      let attempt = new Attempt(
        INSPECTION_BUILD(15500) // +2
          .addInfraction(STOPPED_PUZZLE_ONE_MOVE_REMAINING) // +2
          .addInfraction(STOPPED_WRONG_HAND_PLACEMENT) // +2
          .addInfraction(STOPPED_PUZZLE_HELD) // DNF
          .addInfraction(RESET_TIMER_BEFORE_SIGNATURES) // DNF
          .addInfraction(SIGNED_BEFORE_STARTING) // DNS
          .build(),
      );
      expect(attempt.penaltyCount('DNS')).toEqual(1);
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
    });
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
  });

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
  });

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
  describe('moveCount', () => {
    it('is zero for attempts with no reconstructed solutions', () => {
      let attempt = new Attempt(TIMED_BUILD().build());
      expect(attempt.moveCount()).toBe(0);
    });
    it('is the move count of the reconstructed solution for attempts with one solution', () => {
      let attempt = new Attempt(
        new AttemptBuilder()
          .setEvent(EVENT_3x3x3)
          .setInspectionStart(TEST_INSPECTION_START)
          .setTimerStart(TEST_TIMER_START)
          .setTimerStop(TEST_TIMER_STOP)
          .addSolution(RECONSTRUCTION_BUILD().build())
          .build(),
      );
      expect(attempt.moveCount()).toBe(6);
    });
    it('is the summed move count of all reconstructed solutions for attempts with multiple solutions', () => {
      let event = {
        ...EVENT_3x3x3_BLD_MULTI,
        puzzles: new Array(3).fill(PUZZLE_3x3x3),
      };
      let attempt = new Attempt(
        new AttemptBuilder()
          .setEvent(event)
          .setInspectionStart(TEST_INSPECTION_START)
          .setTimerStart(TEST_TIMER_START)
          .setTimerStop(TEST_TIMER_STOP)
          .addSolution(RECONSTRUCTION_BUILD().build())
          .addSolution(RECONSTRUCTION_BUILD().build())
          .addSolution(RECONSTRUCTION_BUILD().build())
          .build(),
      );
      expect(attempt.moveCount()).toBe(18);
    });
  });
  describe('tps', () => {
    it('is undefined if the duration is zero', () => {
      let attempt = new Attempt(
        new AttemptBuilder()
          .setEvent(EVENT_3x3x3)
          .setInspectionStart(TEST_INSPECTION_START)
          .setTimerStart(TEST_TIMER_START)
          .setTimerStop(TEST_TIMER_START)
          .addSolution(TEST_SOLUTION)
          .build(),
      );
      expect(attempt.tps()).toBeUndefined();
    });
    it('is the number of moves divided by the duration', () => {
      let attempt = new Attempt(
        new AttemptBuilder()
          .setEvent(EVENT_3x3x3)
          .setInspectionStart(TEST_INSPECTION_START)
          .setTimerStart(TEST_TIMER_START)
          .setTimerStop(TEST_TIMER_STOP)
          .addSolution(RECONSTRUCTION_BUILD().build())
          .build(),
      );
      expect(attempt.tps()).toEqual(1.5);
    });
  });
});
