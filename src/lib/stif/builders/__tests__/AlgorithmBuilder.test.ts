// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Algorithm } from '../../types';
import { AlgorithmBuilder } from '../AlgorithmBuilder';
import { v4 as uuid } from 'uuid';
import { TEST_EXTENSION, TEST_EXTENSION_ALT } from './fixtures';

const TEST_MOVES = ['R', 'U', "R'", "U'"];

describe('A new Algorithm Builder', () => {
  describe('builds successfully when', () => {
    it('is given just a move sequence', () => {
      let algorithm: Algorithm = new AlgorithmBuilder()
        .setMoves(TEST_MOVES)
        .build();
      expect(algorithm.moves.length).toEqual(TEST_MOVES.length);
    });
    it('is given a custom id and a move sequence', () => {
      let id = uuid();
      let algorithm: Algorithm = new AlgorithmBuilder()
        .setId(id)
        .setMoves(TEST_MOVES)
        .build();
      expect(algorithm.id).toEqual(id);
    });
    it('is given one extension and a move sequence', () => {
      let algorithm: Algorithm = new AlgorithmBuilder()
        .addExtension(TEST_EXTENSION)
        .setMoves(TEST_MOVES)
        .build();
      expect(algorithm.extensions?.length).toBe(1);
    });
    it('is given multiple extensions and a move sequence', () => {
      let algorithm = new AlgorithmBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION_ALT)
        .setMoves(TEST_MOVES)
        .build();
      expect(algorithm.extensions?.length).toEqual(2);
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => new AlgorithmBuilder().build()).toThrow('Nothing to build!');
    });
    it('is given a duplicate extension', () => {
      expect(() =>
        new AlgorithmBuilder()
          .addExtension(TEST_EXTENSION)
          .addExtension(TEST_EXTENSION),
      ).toThrow('cannot add a duplicate extension');
    });
  });
});
