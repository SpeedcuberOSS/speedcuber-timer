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

const TEST_ALGORITHM: Algorithm = AlgorithmBuilder.fromMoves(['R', 'U']);

describe('ScrambleBuilder', () => {
  test('should fail to build if not provided anything', () => {
    expect(() => {
      new ScrambleBuilder().build();
    }).toThrow('Nothing to build!');
  });
  test('should fail to build if puzzle not provided', () => {
    expect(() => new ScrambleBuilder().setId(uuid()).build()).toThrow(
      '`puzzle` is a required attribute.',
    );
  });
  test('should fail to build if algorithm not provided', () => {
    expect(() =>
      new ScrambleBuilder().setId(uuid()).setPuzzle(PUZZLE_3x3x3).build(),
    ).toThrow('`algorithm` is a required attribute.');
  });
  test('should fail to build if provider not provided', () => {
    expect(() =>
      new ScrambleBuilder()
        .setId(uuid())
        .setPuzzle(PUZZLE_3x3x3)
        .setAlgorithm(TEST_ALGORITHM)
        .build(),
    ).toThrow('`provider` is a required attribute.');
  });
  test('should build successfully with a puzzle, algorithm, and scramble provider.', () => {
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
  test('should allow setting a custom extension', () => {
    let scramble: Scramble = new ScrambleBuilder()
      .setPuzzle(PUZZLE_3x3x3)
      .setAlgorithm(TEST_ALGORITHM)
      .setProvider(TEST_PROVIDER)
      .addExtension(TEST_EXTENSION)
      .build();
    expect(scramble.extensions?.length).toBe(1);
  });
  test('should fail to build if given just an extension', () => {
    expect(() =>
      new ScrambleBuilder().addExtension(TEST_EXTENSION).build(),
    ).toThrow('is a required attribute.');
  });
  test('should fail to add a duplicate extension', () => {
    expect(() =>
      new ScrambleBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION),
    ).toThrow('cannot add a duplicate extension');
  });
  test('should allow adding multiple extensions', () => {
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
