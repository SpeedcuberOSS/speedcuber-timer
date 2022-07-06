// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm, Scramble, ScrambleProvider } from '../types';
import { Puzzle } from '../types/Puzzle';
import { EntityBuilder } from './EntityBuilder';

let DEFAULT_PROVIDER: ScrambleProvider = {
  id: 'org.speedcuber.scrambleproviders.default',
  url: 'https://scrambleproviders.speedcuber.org/default'
}

class ScrambleBuilder extends EntityBuilder {
  protected wip: Partial<Scramble> = {};
  setPuzzle(puzzle: Puzzle): this {
    this.wip.puzzle = puzzle;
    return this;
  }
  setAlgorithm(algorithm: Algorithm): this {
    this.wip.algorithm = algorithm;
    return this;
  }
  setProvider(provider: ScrambleProvider): this {
    this.wip.provider = provider;
    return this;
  }
  build(): Scramble {
    let entity = super.build();
    if (this.wip.puzzle === undefined)
      throw new Error('`puzzle` is a required attribute.');
    if (this.wip.algorithm === undefined)
      throw new Error('`algorithm` is a required attribute.');
    return {
      ...entity,
      puzzle: this.wip.puzzle,
      algorithm: this.wip.algorithm,
      provider: this.wip.provider ?? DEFAULT_PROVIDER,
    };
  }
}

export { ScrambleBuilder, DEFAULT_PROVIDER };
