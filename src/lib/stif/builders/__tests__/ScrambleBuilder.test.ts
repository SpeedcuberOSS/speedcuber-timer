// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { ScrambleBuilder } from '../ScrambleBuilder';
import { v4 as uuid } from 'uuid';
import { PUZZLE_3x3x3 } from '../../builtins';
import { Algorithm, Scramble, ScrambleProvider } from '../../types';
import { AlgorithmBuilder } from '../AlgorithmBuilder';
import { TEST_EXTENSION, TEST_EXTENSION_ALT } from './fixtures';

const TEST_PROVIDER: ScrambleProvider = {
  id: 'org.speedcuber.stif.scrambleproviders.test',
  url: 'https://stif.speedcuber.org/scrambleproviders/test',
};

const TEST_ALGORITHM: Algorithm = new AlgorithmBuilder()
  .setMoves(['R', 'U'])
  .build();
const TEST_ALGORITHM_ALT: Algorithm = new AlgorithmBuilder()
  .setMoves(['R', 'U', 'D'])
  .build();

describe('A new ScrambleBuilder', () => {
  describe('builds successfully when', () => {
    it("is given a puzzle, algorithm, and a scramble provider (the 'CORE FIELDS')", () => {
      let scramble: Scramble = new ScrambleBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setAlgorithm(TEST_ALGORITHM)
        .setProvider(TEST_PROVIDER)
        .build();
      expect(scramble).toBeTruthy();
      expect(scramble.puzzle).toEqual(PUZZLE_3x3x3);
      expect(scramble.algorithm).toEqual(TEST_ALGORITHM);
      expect(scramble.provider).toEqual(TEST_PROVIDER);
    });
    it("is given a custom id and the 'CORE FIELDS'", () => {
      let id = uuid();
      let scramble: Scramble = new ScrambleBuilder()
        .setId(id)
        .setPuzzle(PUZZLE_3x3x3)
        .setAlgorithm(TEST_ALGORITHM)
        .setProvider(TEST_PROVIDER)
        .build();
      expect(scramble.id).toEqual(id);
    });
    it("is given one extension and the 'CORE FIELDS'", () => {
      let scramble: Scramble = new ScrambleBuilder()
        .setPuzzle(PUZZLE_3x3x3)
        .setAlgorithm(TEST_ALGORITHM)
        .setProvider(TEST_PROVIDER)
        .addExtension(TEST_EXTENSION)
        .build();
      expect(scramble.extensions?.length).toBe(1);
    });
    it("is given multiple extensions and the 'CORE FIELDS", () => {
      let scramble: Scramble = new ScrambleBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION_ALT)
        .setPuzzle(PUZZLE_3x3x3)
        .setAlgorithm(TEST_ALGORITHM)
        .setProvider(TEST_PROVIDER)
        .build();
      expect(scramble.extensions?.length).toEqual(2);
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => {
        new ScrambleBuilder().build();
      }).toThrow('Nothing to build!');
    });
    it('is given no puzzle', () => {
      expect(() => new ScrambleBuilder().setId(uuid()).build()).toThrow(
        '`puzzle` is a required attribute.',
      );
    });
    it('is given no algorithm', () => {
      expect(() =>
        new ScrambleBuilder().setId(uuid()).setPuzzle(PUZZLE_3x3x3).build(),
      ).toThrow('`algorithm` is a required attribute.');
    });
    it('is given no provider', () => {
      expect(() =>
        new ScrambleBuilder()
          .setId(uuid())
          .setPuzzle(PUZZLE_3x3x3)
          .setAlgorithm(TEST_ALGORITHM)
          .build(),
      ).toThrow('`provider` is a required attribute.');
    });
    it('is given a duplicate extension', () => {
      expect(() =>
        new ScrambleBuilder()
          .addExtension(TEST_EXTENSION)
          .addExtension(TEST_EXTENSION),
      ).toThrow('cannot add a duplicate extension');
    });
  });
});
