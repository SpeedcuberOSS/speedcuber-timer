// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  EVENT_3x3x3,
  EVENT_RELAY_23,
  INSPECTION_EXCEEDED_17_SECONDS,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  TIMELIMIT_EXCEEDED,
} from '../../builtins';
import { STIF, UnixTimestamp } from '../../STIF';

import { Attempt } from '../../wrappers';
import { AttemptBuilder } from '../AttemptBuilder';
import { SolutionBuilder } from '../SolutionBuilder';
import { v4 as uuid } from 'uuid';

const TEST_SOLUTION = new SolutionBuilder()
  .setPuzzle(PUZZLE_3x3x3)
  .setScramble(['R', 'U'])
  .build();
const PREPARED_TIMES = () =>
  new AttemptBuilder().setInspectionStart().setTimerStart().setTimerStop();
const PREPARED_BUILD = () =>
  PREPARED_TIMES().setEvent(EVENT_3x3x3).addSolution(TEST_SOLUTION);

const expectTime = (actual: UnixTimestamp) => {
  return {
    toBeAbout: (expected: UnixTimestamp, margin: number = 100) => {
      expect(actual).toBeGreaterThan(expected - margin);
      expect(actual).toBeLessThan(expected + margin);
    },
  };
};

describe('A new AttemptBuilder', () => {
  describe('builds successfully when', () => {
    it('is given its required fields', () => {
      const NOW = new Date().getTime();

      let attempt: STIF.Attempt = PREPARED_BUILD().build();

      expect(attempt.id).toBeDefined();
      expect(attempt.event).toEqual(EVENT_3x3x3);
      expect(attempt.solutions).toEqual([TEST_SOLUTION]);
      expectTime(attempt.inspectionStart).toBeAbout(NOW);
      expectTime(attempt.timerStart).toBeAbout(NOW);
      expectTime(attempt.timerStop).toBeAbout(NOW);
      expect(attempt.infractions).toEqual([]);
      expect(attempt.comment).toEqual('');
    });
    it('is also given a custom id', () => {
      let id = uuid();

      let attempt: STIF.Attempt = PREPARED_BUILD().setId(id).build();

      expect(attempt.id).toEqual(id);
    });
    it('is also given custom timestamps', () => {
      let inspectionStart = new Date().getTime() - 100000;
      let timerStart = inspectionStart + 1000;
      let timerStop = timerStart + 1000;

      let attempt: STIF.Attempt = PREPARED_BUILD()
        .setInspectionStart(inspectionStart)
        .setTimerStart(timerStart)
        .setTimerStop(timerStop)
        .build();

      expect(attempt.inspectionStart).toEqual(inspectionStart);
      expect(attempt.timerStart).toEqual(timerStart);
      expect(attempt.timerStop).toEqual(timerStop);
    });
    it('is given multiple solutions which match the event', () => {
      const SOLUTION_3x3x3 = TEST_SOLUTION;
      const SOLUTION_2x2x2 = {
        ...TEST_SOLUTION,
        puzzle: PUZZLE_2x2x2,
      };
      let attempt: STIF.Attempt = PREPARED_BUILD()
        .setEvent(EVENT_RELAY_23)
        .addSolution(SOLUTION_2x2x2)
        .build();
      expect(attempt.solutions).toEqual([SOLUTION_3x3x3, SOLUTION_2x2x2]);
    });
    it('is given a single infraction', () => {
      let attempt: STIF.Attempt = PREPARED_BUILD()
        .addInfraction(TIMELIMIT_EXCEEDED)
        .build();
      expect(attempt.infractions).toEqual([TIMELIMIT_EXCEEDED]);
    });
    it('is given multiple infractions', () => {
      let attempt: STIF.Attempt = PREPARED_BUILD()
        .addInfraction(TIMELIMIT_EXCEEDED)
        .addInfraction(INSPECTION_EXCEEDED_17_SECONDS)
        .build();
      expect(attempt.infractions).toEqual([
        TIMELIMIT_EXCEEDED,
        INSPECTION_EXCEEDED_17_SECONDS,
      ]);
    });
    it('is given a custom comment', () => {
      let comment = 'what an attempt!';
      let attempt: STIF.Attempt = PREPARED_BUILD().setComment(comment).build();
      expect(attempt.comment).toEqual(comment);
    });
  });
  describe('fails to build when', () => {
    it('is given a timerStart prior to inspectionStart', () => {
      let timestamp = new Date().getTime() - 10000;
      expect(() =>
        PREPARED_BUILD()
          .setInspectionStart(timestamp)
          .setTimerStart(timestamp - 1000)
          .build(),
      ).toThrow(/'timerStart' \(\d+\) cannot occur prior to 'inspectionStart' \(\d+\)/);
    });
    it('is given a timerStop prior to timerStart', () => {
      let timestamp = new Date().getTime() - 10000;
      expect(() =>
        PREPARED_BUILD()
          .setInspectionStart(timestamp)
          .setTimerStart(timestamp + 1000)
          .setTimerStop(timestamp + 500)
          .build(),
      ).toThrow(/'timerStop' \(\d+\) cannot occur prior to 'timerStart' \(\d+\)/);
    });
    it('is given different number of solutions than puzzles in the event', () => {
      expect(() =>
        PREPARED_TIMES()
          .setEvent(EVENT_3x3x3)
          .addSolution(TEST_SOLUTION)
          .addSolution(TEST_SOLUTION)
          .build(),
      ).toThrow('`solutions` do not match the `event`');
    });
    it('is given a solution for puzzles not in the event', () => {
      const SOLUTION_2x2x2 = {
        ...TEST_SOLUTION,
        puzzle: PUZZLE_2x2x2,
      };
      expect(() =>
      PREPARED_TIMES()
          .setEvent(EVENT_3x3x3)
          .addSolution(SOLUTION_2x2x2)
          .build(),
      ).toThrow('`solutions` do not match the `event`');
    });
    it('is given solutions whose puzzles do not match the event', () => {
      const SOLUTION_4x4x4 = {
        ...TEST_SOLUTION,
        puzzle: PUZZLE_4x4x4,
      };
      expect(() =>
        PREPARED_TIMES()
          .setEvent(EVENT_RELAY_23)
          .addSolution(TEST_SOLUTION)
          .addSolution(SOLUTION_4x4x4)
          .build(),
      ).toThrow('`solutions` do not match the `event`');
    });
    it('is given no additional attributes', () => {
      expect(() => {
        new AttemptBuilder().build();
      }).toThrow(/required attribute/);
    });
    it('is given no `inspectionStart', () => {
      expect(() =>
        new AttemptBuilder()
          .setTimerStart()
          .setTimerStop()
          .setEvent(EVENT_3x3x3)
          .addSolution(TEST_SOLUTION)
          .build(),
      ).toThrow('`inspectionStart` is a required attribute.');
    });
    it('is given no `timerStart', () => {
      expect(() =>
        new AttemptBuilder()
          .setInspectionStart()
          .setTimerStop()
          .setEvent(EVENT_3x3x3)
          .addSolution(TEST_SOLUTION)
          .build(),
      ).toThrow('`timerStart` is a required attribute.');
    });
    it('is given no `timerStop`', () => {
      expect(() =>
        new AttemptBuilder()
          .setInspectionStart()
          .setTimerStart()
          .setEvent(EVENT_3x3x3)
          .addSolution(TEST_SOLUTION)
          .build(),
      ).toThrow('`timerStop` is a required attribute.');
    });
    it('is given no `event`', () => {
      expect(() =>
        new AttemptBuilder()
          .setInspectionStart()
          .setTimerStart()
          .setTimerStop()
          .addSolution(TEST_SOLUTION)
          .build(),
      ).toThrow('`event` is a required attribute.');
    });
    it('is given no `solutions`', () => {
      expect(() =>
        new AttemptBuilder()
          .setInspectionStart()
          .setTimerStart()
          .setTimerStop()
          .setEvent(EVENT_3x3x3)
          .build(),
      ).toThrow('`solutions` is a required attribute.');
    });
  });
  describe('build', () => {
    it('can provide a wrapped Attempt', () => {
      let attempt = PREPARED_BUILD().wrapped().build();
      expect(attempt).toBeInstanceOf(Attempt);
    });
  })
});
