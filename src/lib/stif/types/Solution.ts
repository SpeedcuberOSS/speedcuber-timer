// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Entity } from './Entity';
import { Reconstruction } from './Reconstruction';
import { Scramble } from './Scramble';

/**
 * Details about a solution to a scramble.
 */
interface Solution extends Entity {
  /**
   * The scramble use to prepare the puzzle for a solution attempt.
   */
  scramble: Scramble;
  /**
   * The reconstruction of the solution.
   */
  reconstruction?: Reconstruction;
}

export { type Solution };
