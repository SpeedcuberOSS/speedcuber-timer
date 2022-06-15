// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * A sequence of moves that can be applied to a puzzle.
 */
type Algorithm = {
  /**
   * A unique identifier for the algorithm. (ideally a UUIDv4)
   */
  id: string;
  /**
   * The moves that comprise the algorithm.
   */
  moves: string[];
};

export { type Algorithm };
