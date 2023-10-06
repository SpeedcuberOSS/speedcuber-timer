// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds, STIF, UnixTimestamp } from '../STIF';
import { SolutionPhaseBuilder } from '../builders/SolutionPhaseBuilder';

interface OptionalArgs {
  start?: UnixTimestamp;
}

export class SolutionPhase {
  protected phase: STIF.SolutionPhase;
  protected opts: OptionalArgs;
  private _moves: STIF.TimestampedMove[] | null = null;
  constructor(phase: STIF.SolutionPhase, opts: OptionalArgs = {}) {
    this.phase = new SolutionPhaseBuilder(phase).build();
    this.opts = opts;
  }
  public stif(): STIF.SolutionPhase {
    return this.phase;
  }
  public label(): string {
    return this.phase.label;
  }
  public moves(): STIF.TimestampedMove[] {
    if (this._moves === null) {
      this._moves = [...this.phase.moves].sort((a, b) => a.t - b.t);
    }
    return this._moves;
  }
  public start(): UnixTimestamp {
    return this.moves().length > 0 ? this.opts.start ?? this.firstMove().t : 0;
  }
  public end(): UnixTimestamp {
    return this.lastMove().t;
  }
  public duration(): Milliseconds {
    return this.end() - this.start();
  }
  public recognition(): Milliseconds {
    return this.firstMove().t - this.start();
  }
  public tps(): number | undefined {
    return this.duration() == 0
      ? undefined
      : this.moves().length / (this.duration() / 1000);
  }
  protected firstMove(): STIF.TimestampedMove {
    return this.moves()[0] ?? { t: 0, move: '' };
  }
  protected lastMove(): STIF.TimestampedMove {
    return this.moves()[this.moves().length - 1] ?? { t: 0, move: '' };
  }
}
