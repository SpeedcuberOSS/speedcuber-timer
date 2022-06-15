// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { CompetitionEvent } from './CompetitionEvent';
import { Infraction } from './Infraction';
import { Session } from './Session';
import { Solution } from './Solution';

/**
 * A single attempt by a user to complete a competition event.
 */
type Attempt = {
  /**
   * A unique identifier for the attempt. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The unix timestamp (in milliseconds) when the attempt occurred.
   */
  timestamp: Date;
  /**
   * The speedsolving event for the attempt.
   */
  event: CompetitionEvent;
  /**
   * The speedsolving session in which the attempt occurred.
   */
  session: Session;
  /**
   * The solutions completed in the attempt.
   *
   * An array because some events consist of solving multiple puzzles
   * (e.g. multi-blind)
   */
  solutions: Solution[];
  /**
   * The infractions committed while completing the attempt.
   */
  infractions: Infraction[];
  /**
   * A free-form text comment about the attempt.
   */
  comment: string;
};

export { type Attempt };
