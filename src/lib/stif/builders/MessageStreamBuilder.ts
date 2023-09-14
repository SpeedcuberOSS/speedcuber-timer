// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../STIF';
import { err } from '../validation/_utils';

export class MessageStreamBuilder {
  protected wip: Partial<STIF.SolveRecording>;
  constructor(wip?: Partial<STIF.SolveRecording>) {
    this.wip = wip ?? {};
  }
  public setSmartPuzzle(smartPuzzle: STIF.SmartPuzzle): this {
    this.wip.smartPuzzle = smartPuzzle;
    return this;
  }
  public addMessages(messages: STIF.Message[]): this {
    if (this.wip.stream === undefined) {
      this.wip.stream = [];
    }
    this.wip.stream.push(...messages);
    return this;
  }
  public build(): STIF.SolveRecording {
    return {
      smartPuzzle: this.wip.smartPuzzle ?? err('smartPuzzle'),
      stream: this.wip.stream ?? [],
    };
  }
}
