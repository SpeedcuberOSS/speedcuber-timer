// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * A type of puzzle solving challenge.
 */
type CompetitionEvent = {
  /**
   * A unique identifier for the event. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The name of the event.
   */
  name: string;
  /**
   * A description of the event.
   */
  description: string;
  /**
   * `true` if the event is recognized as an official event by the World
   * Cube Association, `false` otherwise.
   */
  is_wca: boolean;
};

export { type CompetitionEvent };
