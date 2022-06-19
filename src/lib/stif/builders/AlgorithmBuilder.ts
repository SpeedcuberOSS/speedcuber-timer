// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { v4 as uuid } from 'uuid';
import { Algorithm, Extension } from '../types';

class AlgorithmBuilder {
  private alg: Partial<Algorithm>;
  static fromMoves(moves: string[]): Algorithm {
    return new AlgorithmBuilder().setMoves(moves).build();
  }
  constructor() {
    this.alg = {};
  }
  public setId(id: string): AlgorithmBuilder {
    this.alg.id = id;
    return this;
  }
  public setMoves(moves: string[]): AlgorithmBuilder {
    this.alg.moves = moves;
    return this;
  }
  public addExtension(extension: Extension): AlgorithmBuilder {
    if (this.alg.extensions == undefined) {
      this.alg.extensions = [];
    }
    if (!this.alg.extensions.every(e => e.id !== extension.id)) {
      throw new Error('cannot add a duplicate extension');
    }
    this.alg.extensions.push(extension);
    return this;
  }
  public build(): Algorithm {
    if (Object.keys(this.alg).length === 0)
      throw new Error('Nothing to build!');
    else if (this.alg.moves === undefined)
      throw new Error('`moves` is a required attribute.');
    else {
      return {
        id: this.alg.id ? this.alg.id : uuid(),
        moves: this.alg.moves,
        extensions: this.alg.extensions,
      };
    }
  }
}

export { AlgorithmBuilder };
