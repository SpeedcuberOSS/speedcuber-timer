// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Message, MessageStream } from '../types/extensions';

import { MESSAGE_STREAM_TEMPLATE } from '../builtins';
import { SmartPuzzle } from '../types';

class MessageStreamBuilder {
  protected wipSmartPuzzle: SmartPuzzle | undefined;
  protected wipMessages: Message[] = [];
  public setSmartPuzzle(smartPuzzle: SmartPuzzle): this {
    this.wipSmartPuzzle = smartPuzzle;
    return this;
  }
  public addMessages(messages: Message[]): this {
    this.wipMessages.push(...messages);
    return this;
  }
  public build(): MessageStream {
    if (this.wipSmartPuzzle === undefined) {
      throw new Error('`smartPuzzle` is a required attribute.');
    } else {
      return {
        ...MESSAGE_STREAM_TEMPLATE,
        data: {
          smartPuzzle: {
            prefix: this.wipSmartPuzzle.prefix,
            brand: this.wipSmartPuzzle.brand,
            puzzle: this.wipSmartPuzzle.puzzle,
            uuids: this.wipSmartPuzzle.uuids,
          },
          stream: this.wipMessages,
        },
      };
    }
  }
}

export { MessageStreamBuilder };
