// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Algorithm, Extension } from '../../types';
import { AlgorithmBuilder } from '../AlgorithmBuilder';
import { v4 as uuid } from 'uuid';

const TEST_EXTENSION: Extension = {
  id: 'org.speedcuber.stif.extensions.test',
  specUrl: 'https://stif.speedcuber.org/extensions/test',
  data: [],
};

const TEST_EXTENSION_ALT: Extension = {
  id: 'org.speedcuber.stif.extensions.cookies',
  specUrl: 'https://stif.speedcuber.org/extensions/cookies',
  data: [],
};

const TEST_MOVES = ['R', 'U', "R'", "U'"];

describe('AlgorithmBuilder', () => {
  test('should offer static builder from just a move sequence', () => {
    let algorithm: Algorithm = AlgorithmBuilder.fromMoves(TEST_MOVES);
    expect(algorithm.moves.length).toEqual(TEST_MOVES.length);
  });
  test('should fail to build when given nothing', () => {
    expect(() => new AlgorithmBuilder().build()).toThrow('Nothing to build!');
  });
  test('should successfully build when given just a move sequence', () => {
    let algorithm: Algorithm = new AlgorithmBuilder()
      .setMoves(TEST_MOVES)
      .build();
    expect(algorithm.moves.length).toEqual(TEST_MOVES.length);
  });
  test('should allow setting a custom id', () => {
    let id = uuid();
    let algorithm: Algorithm = new AlgorithmBuilder()
      .setId(id)
      .setMoves(TEST_MOVES)
      .build();
    expect(algorithm.id).toEqual(id);
  });
  test('should fail to build if given an id without any moves', () => {
    expect(() => new AlgorithmBuilder().setId(uuid()).build()).toThrow(
      '`moves` is a required attribute.',
    );
  });
  test('should allow setting a custom extension', () => {
    let algorithm: Algorithm = new AlgorithmBuilder()
      .addExtension(TEST_EXTENSION)
      .setMoves(TEST_MOVES)
      .build();
    expect(algorithm.extensions?.length).toBe(1);
  });
  test('should fail to build if given an extension without any moves', () => {
    expect(() =>
      new AlgorithmBuilder().addExtension(TEST_EXTENSION).build(),
    ).toThrow('`moves` is a required attribute.');
  });
  test('should fail to add a duplicate extension', () => {
    expect(() =>
      new AlgorithmBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION),
    ).toThrow('cannot add a duplicate extension');
  });
  test('should allow adding multiple extensions', () => {
    let algorithm = new AlgorithmBuilder()
      .addExtension(TEST_EXTENSION)
      .addExtension(TEST_EXTENSION_ALT)
      .setMoves(TEST_MOVES)
      .build();
    expect(algorithm.extensions?.length).toEqual(2);
  });
});
