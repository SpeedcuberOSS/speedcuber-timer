// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Algorithm } from '../types';
import { EntityBuilder } from './EntityBuilder';

class AlgorithmBuilder extends EntityBuilder {
  protected wip: Partial<Algorithm> = {};
  public static buildFromMoves(moves: string[]): Algorithm {
    return new AlgorithmBuilder().setMoves(moves).build();
  }
  public setMoves(moves: string[]): this {
    this.wip.moves = moves;
    return this;
  }
  public build(): Algorithm {
    let entity = super.build();
    if (this.wip.moves === undefined)
      throw new Error('`moves` is a required attribute.');
    else {
      return {
        ...entity,
        moves: this.wip.moves,
      };
    }
  }
}

export { AlgorithmBuilder };
