// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from './Extension';

/**
 * A twisty toy that can be scrambled and solved.
 */
type Puzzle = {
  /**
   * A unique identifier for the puzzle.
   *
   * **Note:** WCA puzzles are identified by the [WCA event
   * identifier](https://github.com/thewca/worldcubeassociation.org/blob/master/WcaOnRails/db/seeds/events.seeds.rb)
   * corresponding to the puzzle's standard event.
   */
  id: string;
  /**
   * List of custom extensions.
   */
  extensions?: Extension[];
};

export { type Puzzle };
