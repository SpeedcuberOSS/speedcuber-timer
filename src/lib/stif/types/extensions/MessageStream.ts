// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from '..';
import { SmartPuzzle } from '../SmartPuzzle';

export interface Message {
  /**
   * The time in milliseconds at which the message was received.
   */
  t: number;
  /**
   * The message.
   *
   * The format must be inferred externally.
   */
  m: string;
}

export interface MessageStream extends Extension {
  id: 'org.speedcuber.stif.extensions.message-stream';
  specUrl: 'https://speedcuber.org/stif/extensions/message-stream.schema.json';
  data: {
    smartPuzzle: SmartPuzzle;
    stream: Message[];
  };
}
