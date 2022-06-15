// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { CompetitionEvent } from './CompetitionEvent';

/**
 * A user defined category for grouping attempts.
 */
type UserCategory = {
  /**
   * A unique identifier for the user category. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The name of the user category.
   */
  name: string;
  /**
   * The event that the user category is associated with.
   */
  event: CompetitionEvent;
};

export { type UserCategory };
