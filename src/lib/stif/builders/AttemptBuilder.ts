// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt, CompetitiveEvent, Infraction, Solution } from '../types';
import { EntityBuilder } from './EntityBuilder';

class AttemptBuilder extends EntityBuilder {
  protected wip: Partial<Attempt> = {};
  setEvent(event: CompetitiveEvent): this {
    this.wip.event = event;
    return this;
  }
  addSolution(solution: Solution): this {
    if (this.wip.solutions == undefined) {
      this.wip.solutions = [];
    }
    this.wip.solutions.push(solution);
    return this;
  }
  setTimestamp(timestamp: Date): this {
    this.wip.timestamp = timestamp;
    return this;
  }
  addInfraction(infraction: Infraction): this {
    if (this.wip.infractions === undefined) {
      this.wip.infractions = [];
    }
    this.wip.infractions.push(infraction);
    return this;
  }
  setComment(comment: string): this {
    this.wip.comment = comment;
    return this;
  }
  build(): Attempt {
    let entity = super.build();
    if (this.wip.event === undefined)
      throw new Error('`event` is a required attribute.');
    if (this.wip.solutions === undefined || this.wip.solutions.length === 0)
      throw new Error('At least one `solution` must be provided.');
    return {
      ...entity,
      timestamp: this.wip.timestamp ?? new Date(),
      event: this.wip.event,
      solutions: this.wip.solutions,
      infractions: this.wip.infractions ?? [],
      comment: this.wip.comment ?? '',
    };
  }
}

export { AttemptBuilder };
