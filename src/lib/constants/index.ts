// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const Inspection = {
  /**
   * The standard number of milliseconds permitted for inspection.
   */
  DEFAULT_DURATION_MILLIS: 15000,
  /**
   * The number of milliseconds a stackmat delays before allowing the
   * timer to start.
   */
  DEFAULT_STACKMAT_DELAY_MILLIS: 500,
  /**
   * The amount of time for the +2 period before a DNF is automatically
   * assigned.
   */
  DEFAULT_OVERTIME_UNTIL_DNF_MILLIS: 2000,
};

export { Inspection };
