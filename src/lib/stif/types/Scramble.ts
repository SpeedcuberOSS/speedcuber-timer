// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm } from './Algorithm';
import { CompetitiveEvent } from './CompetitiveEvent';
import { Extension } from './Extension';
import { ScrambleProvider } from './ScrambleProvider';

/**
 * Details about the scramble used to prepare a puzzle for an attempt.
 */
type Scramble = {
  /**
   * A unique identifier for the scramble. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The event for which this scramble was generated.
   */
  event: CompetitiveEvent;
  /**
   * The move sequence of the scramble.
   */
  algorithm: Algorithm;
  /**
   * Details about the software used to generate the scramble.
   */
  provider: ScrambleProvider;
  /**
   * List of custom extensions.
   */
  extensions?: Extension[];
};

export { type Scramble };
