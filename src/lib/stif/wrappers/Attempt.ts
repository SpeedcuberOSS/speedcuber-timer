// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds, STIF, UnixTimestamp } from '../STIF';
import { AttemptBuilder } from '../builders';
import {
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
} from '../builtins';
import { Solution } from './Solution';

const SECONDS = 1000;

const PENALTY_MILLIS: Map<STIF.Penalty, Milliseconds> = new Map([
  ['', 0],
  ['+2', 2 * SECONDS],
  ['DNF', Infinity],
  ['DNS', Infinity],
]);

export class Attempt {
  protected attempt: STIF.Attempt;
  private _moves: STIF.TimestampedMove[] | null = null;
  constructor(attempt: STIF.Attempt) {
    this.attempt = new AttemptBuilder(attempt).build();
  }
  public stif(): STIF.Attempt {
    return this.attempt;
  }
  public id(): string {
    return this.attempt.id;
  }
  public event(): STIF.CompetitiveEvent {
    return this.attempt.event;
  }
  public inspectionStart(): UnixTimestamp {
    return this.attempt.inspectionStart;
  }
  public timerStart(): UnixTimestamp {
    return this.attempt.timerStart;
  }
  public timerEnd(): UnixTimestamp {
    return this.attempt.timerStop;
  }
  public solutions(): Solution[] {
    return this.attempt.solutions.map(s => new Solution(s));
  }
  public comment(): string {
    return this.attempt.comment;
  }
  public inspectionDuration(): Milliseconds {
    return this.attempt.timerStart - this.attempt.inspectionStart;
  }
  public duration(): Milliseconds {
    return this.durationWithoutPenalties() + this.penaltyDuration();
  }
  public durationWithoutPenalties(): Milliseconds {
    return this.attempt.timerStop - this.attempt.timerStart;
  }
  public result(): Milliseconds | 'DNF' | 'DNS' {
    const penalties = this.infractions().map(i => i.penalty);
    if (penalties.includes('DNS')) return 'DNS';
    else if (penalties.includes('DNF')) return 'DNF';
    else return this.duration();
  }
  public penaltyCount(penalty?: STIF.Penalty): number {
    return this.infractions().filter(i =>
      penalty === undefined ? true : i.penalty === penalty,
    ).length;
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
  public moveCount(): number {
    return this.moves().length;
  }
  /**
   * `protected` because this strips away information about which
   * solution the moves belong to.
   */
  protected moves(): STIF.TimestampedMove[] {
    if (this._moves === null) {
      this._moves = this.solutions()
        .flatMap(solution => solution.moves())
        .sort((a, b) => a.t - b.t);
    }
    return this._moves;
  }
  public tps(): number | undefined {
    const moves = this.moves();
    if (moves.length === 0) return undefined;
    return moves.length / (this.duration() / SECONDS);
  }
}
