// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../../STIF';
import { SolutionBuilder } from '../../builders';
import { PUZZLE_3x3x3 } from '../../builtins';
import { Solution } from '../Solution';

const BASE_BUILD = () =>
  new SolutionBuilder().setPuzzle(PUZZLE_3x3x3).setScramble(['R', 'U']);

const TEST_STEP_1: STIF.SolutionPhase = {
  label: 'step1',
  moves: [
    { t: 500, m: 'R' },
    { t: 750, m: 'U' },
  ],
};
const TEST_STEP_2: STIF.SolutionPhase = {
  label: 'step2',
  moves: [
    { t: 1000, m: "U'" },
    { t: 1250, m: "R'" },
  ],
};
const TEST_STEP_3: STIF.SolutionPhase = {
  label: 'step3',
  moves: [
    { t: 1500, m: "U'" },
    { t: 1750, m: "R'" },
  ],
};

const RECONSTRUCTION_BUILD = () =>
  BASE_BUILD()
    .addSolutionPhase(TEST_STEP_1)
    .addSolutionPhase(TEST_STEP_2)
    .addSolutionPhase(TEST_STEP_3);

describe('[Wrapper] Solution', () => {
  it('rejects invalid STIF.Solutions', () => {
    expect(() => new Solution({} as any)).toThrow();
  });
  it('rejects STIF.Solutions without a reconstruction', () => {
    expect(() => new Solution(BASE_BUILD().build())).toThrow(/reconstruction/);
  });
  it('provides access to all STIF.Solution fields', () => {
    let solution = new Solution(RECONSTRUCTION_BUILD().build());
    expect(solution.stif().puzzle).toEqual(PUZZLE_3x3x3);
    expect(solution.stif().scramble).toEqual(['R', 'U']);
    expect(solution.stif().reconstruction).toEqual([
      TEST_STEP_1,
      TEST_STEP_2,
      TEST_STEP_3,
    ]);
  });
  it('configures the `start` of each phase to the end of the prior one', () => {
    let solution = new Solution(RECONSTRUCTION_BUILD().build());
    expect(solution.reconstruction()[0].start()).toEqual(500); // The first phase is unchanged to preserve pickup time.
    expect(solution.reconstruction()[1].start()).toEqual(750);
    expect(solution.reconstruction()[2].start()).toEqual(1250);
  });
  it('rejects STIF.Solutions with overlapping phases', () => {
    let solution = new Solution(
      RECONSTRUCTION_BUILD()
        .addSolutionPhase({
          label: 'step4',
          moves: [{ t: 1100, m: 'R' }],
        })
        .build(),
    );
    expect(() => solution.reconstruction()).toThrow(/overlapping/);
  });
  describe('start', () => {
    describe('if no start time provided', () => {
      it('is the timestamp of the first solution phase', () => {
        let solution = new Solution(RECONSTRUCTION_BUILD().build());
        expect(solution.start()).toEqual(500);
      });
    });
    describe('if start time provided', () => {
      it('is the provided start time', () => {
        let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
          start: 250,
        });
        expect(solution.start()).toEqual(250);
      });
      it('works for the Unix Epoch', () => {
        let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
          start: 0,
        });
        expect(solution.start()).toEqual(0);
      });
      it('raises an exception if after the first move', () => {
        expect(
          () => new Solution(RECONSTRUCTION_BUILD().build(), { start: 1000 }),
        ).toThrow('Start time cannot be after first move');
      });
    });
  });
  describe('end', () => {
    describe('if no end time provided', () => {
      it('is the end timestamp of the last solution phase', () => {
        let solution = new Solution(RECONSTRUCTION_BUILD().build());
        expect(solution.end()).toEqual(1750);
      });
    });
    describe('if end time provided', () => {
      it('is the provided end time', () => {
        let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
          end: 2500,
        });
        expect(solution.end()).toEqual(2500);
      });
      it('raises an exception if before the last move', () => {
        expect(
          () => new Solution(RECONSTRUCTION_BUILD().build(), { end: 1000 }),
        ).toThrow('End time cannot be before last move');
      });
      it('raises an exception if before the provided start', () => {
        expect(
          () =>
            new Solution(BASE_BUILD().build(), {
              start: 1000,
              end: 500,
            }),
        ).toThrow('Start time cannot be after end time');
      });
    });
  });
  describe('pickup', () => {
    it('is the time between the start and the start of the first solution phase', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), { start: 0 });
      expect(solution.pickup()).toEqual(500);
    });
  });
  describe('putdown', () => {
    it('is the time between the end of the last solution phase and the end', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        end: 2000,
      });
      expect(solution.putdown()).toEqual(250);
    });
  });
  describe('duration', () => {
    it('computes the duration as the difference between the first and last phases', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build());
      expect(solution.duration()).toEqual(1250);
    });
    it('handles unsorted phases', () => {
      let solution = new Solution(
        BASE_BUILD()
          .addSolutionPhase(TEST_STEP_2)
          .addSolutionPhase(TEST_STEP_1)
          .addSolutionPhase(TEST_STEP_3)
          .build(),
      );
      expect(solution.duration()).toEqual(1250);
    });
    it('includes pickup time if start time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        start: 0,
      });
      expect(solution.duration()).toEqual(1750);
    });
    it('includes putdown time if end time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        end: 2000,
      });
      expect(solution.duration()).toEqual(1500);
    });
    it('includes pickup and putdown time if start and end time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        start: 0,
        end: 2000,
      });
      expect(solution.duration()).toEqual(2000);
    });
  });
  describe('tps', () => {
    it('is undefined if the duration is zero', () => {
      let solution = new Solution(
        BASE_BUILD()
          .addSolutionPhase({ label: 'solve', moves: [{ t: 1000, m: 'R' }] })
          .build(),
      );
      expect(solution.tps()).toBeUndefined();
    });
    it('is the number of moves divided by the duration', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build());
      expect(solution.tps()).toEqual(6 / 1.25);
    });
    it('includes pickup time if start time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        start: 0,
      });
      expect(solution.tps()).toEqual(6 / 1.75);
    });
    it('includes putdown time if end time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        end: 2000,
      });
      expect(solution.tps()).toEqual(6 / 1.5);
    });
    it('includes pickup and putdown time if start and end time provided', () => {
      let solution = new Solution(RECONSTRUCTION_BUILD().build(), {
        start: 0,
        end: 2000,
      });
      expect(solution.tps()).toEqual(6 / 2);
    });
  });
});
