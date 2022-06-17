// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * A consequence for not following a WCA regulation during an attempt.
 */
enum Penalty {
  /**
   * No penalty.
   */
  NONE,
  /**
   * Add two seconds to the attempt duration.
   */
  PLUS_2,
  /**
   * Mark the attempt as incomplete.
   *
   * Effectively equivalent to an infinite duration for purposes of
   * discarding the worst solve(s) in an average of X.
   */
  DID_NOT_FINISH,
  /**
   * Mark the attempt as not started
   *
   * Effectively equivalent to an infinite duration for purposes of
   * discarding the worst solve(s) in an average of X.
   */
  DID_NOT_START,
}

export { Penalty };
