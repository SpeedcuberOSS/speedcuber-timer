// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF, UUID, UnixTimestamp } from '../STIF';
import { Attempt } from '../wrappers/Attempt';
import { validateAttempt } from '../validation/Attempt';

export class AttemptBuilder {
  protected wip: Partial<STIF.Attempt>;
  constructor(wip?: Partial<STIF.Attempt>) {
    this.wip = wip ?? {};
  }
  public setId(id: UUID): this {
    this.wip.id = id;
    return this;
  }
  public setInspectionStart(inspectionStart?: UnixTimestamp): this {
    this.wip.inspectionStart = inspectionStart ?? new Date().getTime();
    return this;
  }
  public setTimerStart(timerStart?: UnixTimestamp): this {
    this.wip.timerStart = timerStart ?? new Date().getTime();
    return this;
  }
  public setTimerStop(timerStop?: UnixTimestamp): this {
    this.wip.timerStop = timerStop ?? new Date().getTime();
    return this;
  }
  public setEvent(event: STIF.CompetitiveEvent): this {
    this.wip.event = event;
    return this;
  }
  public addSolution(solution: STIF.Solution): this {
    if (this.wip.solutions === undefined) {
      this.wip.solutions = [];
    }
    this.wip.solutions.push(solution);
    return this;
  }
  public addInfraction(infraction: STIF.Infraction): this {
    if (this.wip.infractions === undefined) {
      this.wip.infractions = [];
    }
    this.wip.infractions.push(infraction);
    return this;
  }
  public setComment(comment: string): this {
    this.wip.comment = comment;
    return this;
  }
  public wrapped() {
    return {
      build: () => new Attempt(this.build()),
    }
  }
  public build(): STIF.Attempt {
    return validateAttempt(this.wip);
  }
}
