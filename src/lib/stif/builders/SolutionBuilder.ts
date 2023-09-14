// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../STIF';
import { validateSolution } from '../validation/Solution';

export class SolutionBuilder {
  protected wip: Partial<STIF.Solution>;
  constructor(wip?: Partial<STIF.Solution>) {
    this.wip = wip ?? {};
  }
  public setPuzzle(puzzle: STIF.Puzzle): this {
    this.wip.puzzle = puzzle;
    return this;
  }
  public setScramble(scramble: STIF.Algorithm): this {
    this.wip.scramble = scramble;
    return this;
  }
  public addSolutionPhase(phase: STIF.SolutionPhase): this {
    if (this.wip.reconstruction === undefined) {
      this.wip.reconstruction = [];
    }
    this.wip.reconstruction.push(phase);
    return this;
  }
  public build(): STIF.Solution {
    return validateSolution(this.wip);
  }
}
