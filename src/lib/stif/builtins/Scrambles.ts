// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_UNKNOWN } from './Puzzles';
import { Scramble } from '../types';
import { ScrambleBuilder } from '../builders';

const SCRAMBLE_UNKNOWN: Scramble = Object.freeze(
  ScrambleBuilder.buildBasic(PUZZLE_UNKNOWN, []),
);

export { SCRAMBLE_UNKNOWN };