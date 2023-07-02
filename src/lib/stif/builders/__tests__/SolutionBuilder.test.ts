// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { PUZZLE_3x3x3 } from '../../builtins';
import { SolutionBuilder } from '../SolutionBuilder';
import { STIF } from '../../STIF';

describe('A new SolutionBuilder', () => {
  describe('builds successfully when', () => {
    it('is given its required fields (`puzzle`, `scramble`)', () => {
      let solution: STIF.Solution = new SolutionBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setScramble(['R', 'U'])
        .build();
      expect(solution.puzzle).toEqual(PUZZLE_3x3x3);
      expect(solution.scramble).toEqual(['R', 'U']);
      expect(solution.reconstruction).toEqual([]);
    });
    it('is also given a reconstruction', () => {
      const phase: STIF.SolutionPhase = {
        label: 'cross',
        moves: [],
      };
      let solution: STIF.Solution = new SolutionBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setScramble(['R', 'U'])
        .addSolutionPhase(phase)
        .build();
      expect(solution.reconstruction[0]).toEqual(phase);
    });
    it('is given a reconstruction with unsorted phases', () => {
      const phase1 = {
        label: 'cross',
        moves: [
          { t: 0, m: 'R' },
          { t: 100, m: 'U' },
        ],
      };
      const phase2 = {
        label: 'f2l',
        moves: [
          { t: 150, m: 'U' },
          { t: 200, m: 'R' },
        ],
      };
      expect(() =>
        new SolutionBuilder()
          .setPuzzle(PUZZLE_3x3x3)
          .setScramble(['R', 'U'])
          .addSolutionPhase(phase2)
          .addSolutionPhase(phase1)
          .build(),
      ).not.toThrow();
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => new SolutionBuilder().build()).toThrow(/required attribute/);
    });
    it('is given no `puzzle`', () => {
      expect(() =>
        new SolutionBuilder().setScramble(['R', 'U']).build(),
      ).toThrow('`puzzle` is a required attribute.');
    });
    it('is given no `scramble`', () => {
      expect(() =>
        new SolutionBuilder().setPuzzle(PUZZLE_3x3x3).build(),
      ).toThrow('`scramble` is a required attribute.');
    });
    it('is given phases with overlapping time ranges', () => {
      const phase1 = {
        label: 'cross',
        moves: [
          { t: 0, m: 'R' },
          { t: 100, m: 'U' },
        ],
      };
      const phase2 = {
        label: 'f2l',
        moves: [
          { t: 50, m: 'U' },
          { t: 200, m: 'R' },
        ],
      };
      expect(() =>
        new SolutionBuilder()
          .setPuzzle(PUZZLE_3x3x3)
          .setScramble(['R', 'U'])
          .addSolutionPhase(phase1)
          .addSolutionPhase(phase2)
          .build(),
      ).toThrow(/overlapping/);
    });
  });
});
