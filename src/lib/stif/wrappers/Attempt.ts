// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds, STIF } from '../STIF';
import { AttemptBuilder } from '../builders';
import {
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
} from '../builtins';

const SECONDS = 1000;

const PENALTY_MILLIS: Map<STIF.Penalty, Milliseconds> = new Map([
  ['', 0],
  ['+2', 2 * SECONDS],
  ['DNF', Infinity],
  ['DNS', Infinity],
]);

export class Attempt {
  protected attempt: STIF.Attempt;
  constructor(attempt: STIF.Attempt) {
    this.attempt = new AttemptBuilder(attempt).build();
  }
  public stif(): STIF.Attempt {
    return this.attempt;
  }
  public inspectionDuration(): Milliseconds {
    return this.attempt.solveStart - this.attempt.inspectionStart;
  }
  public duration(): Milliseconds {
    return this.durationWithoutPenalties() + this.penaltyDuration();
  }
  public durationWithoutPenalties(): Milliseconds {
    return this.attempt.solveEnd - this.attempt.solveStart;
  }
  public result(): Milliseconds | 'DNF' | 'DNS' {
    const penalties = this.infractions().map(i => i.penalty);
    if (penalties.includes('DNS')) return 'DNS';
    else if (penalties.includes('DNF')) return 'DNF';
    else return this.duration();
  }
  public penaltyDuration(): Milliseconds {
    return this.infractions()
      .map(i => PENALTY_MILLIS.get(i.penalty)!)
      .reduce((sum, p) => sum + p, 0);
  }
  public infractions(): STIF.Infraction[] {
    let i = [...this.attempt.infractions];
    if (this.inspectionDuration() > 17 * SECONDS) {
      i.push(INSPECTION_EXCEEDED_17_SECONDS);
    } else if (this.inspectionDuration() > 15 * SECONDS) {
      i.push(INSPECTION_EXCEEDED_15_SECONDS);
    }
    return [...new Set(i)];
  }
}
