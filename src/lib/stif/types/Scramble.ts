// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm } from './Algorithm';
import { Entity } from './Entity';
import { Puzzle } from './Puzzle';
import { ScrambleProvider } from './ScrambleProvider';

/**
 * Details about the scramble used to prepare a puzzle for an attempt.
 */
interface Scramble extends Entity {
  /**
   * The puzzle for which this scramble was generated.
   */
  puzzle: Puzzle;
  /**
   * The move sequence of the scramble.
   */
  algorithm: Algorithm;
  /**
   * Details about the software used to generate the scramble.
   */
  provider: ScrambleProvider;
};

export { type Scramble };
