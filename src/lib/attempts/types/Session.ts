// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * A closed time interval over which a user completed multiple attempts.
 */
type Session = {
  /**
   * A unique identifier for the session. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The name of the session.
   */
  name: string;
  /**
   * The unix timestamp of the start of the session.
   */
  startTime: Date;
  /**
   * The unix timestamp of the end of the session.
   */
  endTime: Date;
};

export { type Session };
