// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { parseMessage } from '../ParticulaPuzzle';

describe('ParticulaPuzzle', () => {
  describe('MessageParser', () => {
    it('correctly parses a message with a small checksum', () => {
      const message = 'KhgDODAjLTEwODYwIzE1MjMjMTIxMzUJDQo=';
      expect(() => parseMessage(message)).not.toThrow();
    });
  });
});
