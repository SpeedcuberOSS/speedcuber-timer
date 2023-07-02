// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../STIF';
import { STIFError } from '../exceptions';
import { err } from './_utils';

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
    if (this.phasesOverlap()) {
      throw new STIFError('Solution phases cannot be overlapping');
    }
    return {
      puzzle: this.wip.puzzle ?? err('puzzle'),
      scramble: this.wip.scramble ?? err('scramble'),
      reconstruction: this.wip.reconstruction ?? [],
    };
  }
  protected phasesOverlap(): boolean {
    if (this.wip.reconstruction === undefined) {
      return false;
    }
    let phases = this.wip.reconstruction
      .filter(value => value.moves.length > 1)
      .map(phase => ({
        start: phase.moves.sort((a, b) => a.t - b.t)[0].t,
        end: phase.moves.sort((a, b) => b.t - a.t)[0].t,
      }))
      .sort((a, b) => a.start - b.start);
    for (let i = 0; i < phases.length - 1; i++) {
      let phase = phases[i];
      let nextPhase = phases[i + 1];
      if (phase.end > nextPhase.start) {
        return true;
      }
    }
    return false;
  }
}
