// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { PUZZLE_3x3x3 } from '../../builtins';
import { Solution } from '../../types';
import { ScrambleBuilder } from '../ScrambleBuilder';
import { SolutionBuilder } from '../SolutionBuilder';
import { TEST_EXTENSION, TEST_EXTENSION_ALT } from './fixtures';
import { v4 as uuid } from 'uuid';
import { AlgorithmBuilder } from '../AlgorithmBuilder';
import { Reconstruction } from '../../types/Reconstruction';

let TEST_SCRAMBLE = ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']);
let TEST_RECONSTRUCTION: Reconstruction = {
  id: uuid(),
  algorithm: new AlgorithmBuilder().setMoves(['R', 'U']).build(),
};

describe('A new SolutionBuilder', () => {
  describe('builds successfully when', () => {
    it("is given a scramble (the 'CORE FIELDS')", () => {
      let solution: Solution = new SolutionBuilder()
        .setScramble(TEST_SCRAMBLE)
        .build();
      expect(solution.scramble).toEqual(TEST_SCRAMBLE);
    });
    it("is given a reconstruction and the 'CORE FIELDS'", () => {
      let solution: Solution = new SolutionBuilder()
        .setScramble(TEST_SCRAMBLE)
        .setReconstruction(TEST_RECONSTRUCTION)
        .build();
      expect(solution.scramble).toEqual(TEST_SCRAMBLE);
      expect(solution.reconstruction?.algorithm.moves).toEqual(['R', 'U']);
    });
    it("is given a custom id and the 'CORE FIELDS'", () => {
      let id = uuid();
      let solution: Solution = new SolutionBuilder()
        .setId(id)
        .setScramble(TEST_SCRAMBLE)
        .build();
      expect(solution.id).toEqual(id);
    });
    it("is given one extension and the 'CORE FIELDS'", () => {
      let solution: Solution = new SolutionBuilder()
        .addExtension(TEST_EXTENSION)
        .setScramble(TEST_SCRAMBLE)
        .build();
      expect(solution.extensions?.length).toBe(1);
    });
    it("is given multiple extensions and the 'CORE FIELDS", () => {
      let solution: Solution = new SolutionBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION_ALT)
        .setScramble(TEST_SCRAMBLE)
        .build();
      expect(solution.extensions?.length).toEqual(2);
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => new SolutionBuilder().build()).toThrow('Nothing to build!');
    });
    it('is given no `scramble`', () => {
      expect(() => new SolutionBuilder().setId(uuid()).build()).toThrow(
        '`scramble` is a required attribute.',
      );
    });
    it('is given a duplicate extension', () => {
      expect(() =>
        new SolutionBuilder()
          .addExtension(TEST_EXTENSION)
          .addExtension(TEST_EXTENSION),
      ).toThrow('cannot add a duplicate extension');
    });
  });
});
