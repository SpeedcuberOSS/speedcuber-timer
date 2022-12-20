// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../types';
import { AttemptBuilder } from '../builders';
import { EVENT_UNKNOWN } from './CompetitiveEvents';
import { SCRAMBLE_UNKNOWN } from './Scrambles';

const ATTEMPT_UNKNOWN: Attempt = Object.freeze(
  AttemptBuilder.buildBasic(EVENT_UNKNOWN, SCRAMBLE_UNKNOWN, 0),
);

export { ATTEMPT_UNKNOWN };
