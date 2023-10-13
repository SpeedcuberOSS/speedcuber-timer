// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as _library from './library';

import { AttemptLibrary } from './types';

export const Backup = require('./backup');

export const Restore = require('./restore');


export const library: AttemptLibrary = {
  boot: _library.boot,
  status: _library.status,
  crashReason: _library.crashReason,
  put: _library.put,
  details: _library.details,
};
