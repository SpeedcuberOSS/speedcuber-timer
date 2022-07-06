// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Scramble, Solution } from '../types';
import { EntityBuilder } from './EntityBuilder';

class SolutionBuilder extends EntityBuilder {
  protected wip: Partial<Solution> = {};
  static buildBasic(scramble: Scramble, duration: number): Solution {
    return new SolutionBuilder()
      .setScramble(scramble)
      .setDuration(duration)
      .build();
  }
  public setDuration(duration: number): this {
    this.wip.duration = duration;
    return this;
  }
  public setScramble(scramble: Scramble): this {
    this.wip.scramble = scramble;
    return this;
  }
  public build(): Solution {
    let entity = super.build()
    if (this.wip.duration === undefined)
      throw new Error('`duration` is a required attribute.')
    if (this.wip.scramble === undefined) 
      throw new Error("`scramble` is a required attribute.")
    return {
      ...entity,
      duration: this.wip.duration,
      scramble: this.wip.scramble,
      reconstruction: this.wip.reconstruction,
    }
  }
}

export { SolutionBuilder };
