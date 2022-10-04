// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Scramble, Solution } from '../types';
import { Reconstruction } from '../types/Reconstruction';
import { EntityBuilder } from './EntityBuilder';

class SolutionBuilder extends EntityBuilder {
  protected wip: Partial<Solution> = {};
  public setScramble(scramble: Scramble): this {
    this.wip.scramble = scramble;
    return this;
  }
  public setReconstruction(reconstruction: Reconstruction): this {
    this.wip.reconstruction = reconstruction;
    return this;
  }
  public build(): Solution {
    let entity = super.build();
    if (this.wip.scramble === undefined) {
      throw new Error('`scramble` is a required attribute.');
    }
    return {
      ...entity,
      scramble: this.wip.scramble,
      reconstruction: this.wip.reconstruction,
    };
  }
}

export { SolutionBuilder };
