// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm } from './Algorithm';
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
  duration: Date;
  /**
   * The algorithm used to scramble the puzzle for the attempt.
   */
  scramble: Scramble;
  /**
   * The move sequence of the solution.
   */
  algorithm: Algorithm;
};

export { type Solution };
