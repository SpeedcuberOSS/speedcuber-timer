// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF, UnixTimestamp } from '../STIF';
import { err } from './_utils';

export class SolutionPhaseBuilder {
  protected wip: Partial<STIF.SolutionPhase>;
  constructor(wip?: Partial<STIF.SolutionPhase>) {
    this.wip = wip ?? {};
  }
  public setLabel(label: string): this {
    this.wip.label = label;
    return this;
  }
  public addMove(move: {t: UnixTimestamp, m: STIF.Move}): this {
    if (this.wip.moves === undefined) {
      this.wip.moves = [];
    }
    this.wip.moves.push(move);
    return this;
  }
  public build(): STIF.SolutionPhase {
    if (this.wip.moves === undefined || this.wip.moves.length === 0) {
      err('moves');
    }
    return {
      label: this.wip.label ?? err('label'),
      moves: this.wip.moves,
    };
  }
}
