// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds, STIF, UUID, UnixTimestamp } from '../STIF';

import { STIFError } from '../exceptions';
import { SolutionPhase } from './SolutionPhase';
import { validateSolution } from '../validation/Solution';

interface OptionalArgs {
  start?: UnixTimestamp;
  end?: UnixTimestamp;
}

export class Solution {
  protected solution: STIF.Solution;
  protected opts: OptionalArgs;
  private _phases: SolutionPhase[] | null = null;
  private _moves: STIF.TimestampedMove[] | null = null;
  constructor(solution: STIF.Solution, opts: OptionalArgs = {}) {
    this.solution = validateSolution(solution);
    if (opts.start !== undefined && opts.start > this.moves()[0]?.t) {
      throw new STIFError('Start time cannot be after first move');
    }
    if (
      opts.end !== undefined &&
      opts.end < this.moves()[this.moves().length - 1]?.t
    ) {
      throw new STIFError('End time cannot be before last move');
    }
    if (
      opts.start !== undefined &&
      opts.end !== undefined &&
      opts.start > opts.end
    ) {
      throw new STIFError('Start time cannot be after end time');
    }
    this.opts = opts;
  }
  public stif(): STIF.Solution {
    return this.solution;
  }
  public id(): UUID {
    return this.solution.id;
  }
  public puzzle(): STIF.Puzzle {
    return this.solution.puzzle;
  }
  public scramble(): STIF.Algorithm {
    return this.solution.scramble;
  }
  public reconstruction(): SolutionPhase[] {
    if (this._phases === null) {
      this._phases = this.solution.reconstruction
        .map(phase => new SolutionPhase(phase))
        .sort((a, b) => a.start() - b.start())
        .map((phase, i, arr) => {
          if (i === 0) {
            return phase;
          } else {
            let prev = arr[i - 1];
            let _phase = new SolutionPhase(phase.stif(), { start: prev.end() });
            if (_phase.start() > _phase.end()) {
              throw new STIFError('Solution phases cannot be overlapping');
            }
            return _phase;
          }
        });
    }
    return this._phases;
  }
  public start(): UnixTimestamp {
    return this.opts.start ?? this.firstPhase().start();
  }
  public end(): UnixTimestamp {
    return this.opts.end ?? this.lastPhase().end();
  }
  public duration(): Milliseconds {
    return this.end() - this.start();
  }
  public pickup(): Milliseconds {
    return this.firstPhase().start() - this.start();
  }
  public putdown(): Milliseconds {
    return this.end() - this.lastPhase().end();
  }
  public tps(): number | undefined {
    let duration = this.duration();
    return duration == 0 ? undefined : this.moves().length / (duration / 1000);
  }
  protected firstPhase(): SolutionPhase {
    return this.reconstruction()[0] ?? EMPTY_PHASE;
  }
  protected lastPhase(): SolutionPhase {
    return (
      this.reconstruction()[this.reconstruction().length - 1] ?? EMPTY_PHASE
    );
  }
  public moves(): STIF.TimestampedMove[] {
    if (this._moves === null) {
      this._moves = this.reconstruction()
        .flatMap(phase => phase.moves())
        .sort((a, b) => a.t - b.t);
    }
    return this._moves;
  }
}

const EMPTY_PHASE = new SolutionPhase({
  label: '',
  moves: [],
});
