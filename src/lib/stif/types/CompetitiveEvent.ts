// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Entity } from './Entity';
import { Extension } from './Extension';
import { Puzzle } from './Puzzle';

/**
 * The type of CompetitionEvent.
 */
enum CompetitiveEventType {
  /**
   * A current WCA event.
   */
  WCA = 'WCA',
  /**
   * A past WCA event.
   */
  WCA_OLD = 'WCA_OLD',
  /**
   * A non-WCA event.
   */
  CUSTOM = 'CUSTOM',
}

/**
 * A category of puzzle solving challenge.
 */
interface CompetitiveEvent extends Entity {
  /**
   * A unique identifier for the event.
   *
   * **Note:** WCA events are identified by their
   * [WCA event identifier](https://github.com/thewca/worldcubeassociation.org/blob/master/WcaOnRails/db/seeds/events.seeds.rb).
   */
  id: string;
  /**
   * The puzzle(s) to be solved in the event.
   */
  puzzle: Puzzle | Puzzle[];
  /**
   * The type of event.
   */
  type: CompetitiveEventType;
};

export { type CompetitiveEvent, CompetitiveEventType };
