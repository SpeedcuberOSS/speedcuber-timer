// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Message, MessageStream } from '../../types/extensions';

import { SMARTPUZZLE_UNKNOWN } from '../SmartPuzzles';

export const MESSAGE_STREAM_TEMPLATE: MessageStream = Object.freeze({
  id: 'org.speedcuber.stif.extensions.message-stream',
  specUrl: 'https://speedcuber.org/stif/extensions/message-stream.schema.json',
  data: {
    smartPuzzle: SMARTPUZZLE_UNKNOWN,
    stream: [] as Message[],
  },
});
