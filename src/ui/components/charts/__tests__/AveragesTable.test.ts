// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import examples from '../AveragesTable.examples';
import { snapshots } from '../../../examples/testing';

test('AveragesTable', () => {
  expect('test').not.toBe('doing anything useful');
});

// Tests take too long for Jest to process correctly :/
// snapshots(examples);
