// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm } from './Algorithm';
import { Extension } from './Extension';
import { Scramble } from './Scramble';

/**
 * Details about a solution to a scramble.
 */
type Solution = {
  /**
   * A unique identifier for the solution. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The duration of the solution (in milliseconds), excluding penalties.
   */
  duration: number;
  /**
   * The scramble use to prepare the puzzle for a solution attempt.
   */
  scramble: Scramble;
  /**
   * The move sequence of the solution.
   */
  reconstruction?: Algorithm;
  /**
   * List of custom extensions.
   */
  extensions?: Extension[];
};

export { type Solution };
