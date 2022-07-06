// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from '../../types';

const TEST_EXTENSION: Extension = {
  id: 'org.speedcuber.stif.extensions.test',
  specUrl: 'https://stif.speedcuber.org/extensions/test',
  data: [],
};

const TEST_EXTENSION_ALT: Extension = {
  id: 'org.speedcuber.stif.extensions.cookies',
  specUrl: 'https://stif.speedcuber.org/extensions/cookies',
  data: [],
};

test('fixtures loaded', () => {});

export { TEST_EXTENSION, TEST_EXTENSION_ALT };
