// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Details about a software system that can generate scrambles.
 */
type ScrambleProvider = {
  /**
   * A unique identifier for the event. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The name of the scramble provider.
   */
  name: string;
  /**
   * The URL containing more information about the scramble provider.
   */
  url: string;
};

export { type ScrambleProvider };
