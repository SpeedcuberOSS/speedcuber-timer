// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  EVENT_2x2x2,
  EVENT_3x3x3,
  EVENT_3x3x3_BLD,
  EVENT_3x3x3_FEET,
  EVENT_3x3x3_OH,
  EVENT_4x4x4,
  EVENT_4x4x4_BLD,
  EVENT_5x5x5,
  EVENT_5x5x5_BLD,
  EVENT_6x6x6,
  EVENT_7x7x7,
} from '../../lib/stif';

export function getKnownCompetitiveEvents() {
  // Note: This function will eventually need to load a user's custom events.
  return [
    EVENT_2x2x2,
    EVENT_3x3x3,
    EVENT_3x3x3_BLD,
    // EVENT_3x3x3_BLD_MULTI, // Requires special handling
    EVENT_3x3x3_OH,
    // EVENT_3x3x3_FMC, // Requires special handling
    EVENT_3x3x3_FEET,
    EVENT_4x4x4,
    EVENT_4x4x4_BLD,
    EVENT_5x5x5,
    EVENT_5x5x5_BLD,
    EVENT_6x6x6,
    EVENT_7x7x7,
    // No scramblers available for these puzzles yet.
    // EVENT_CLOCK,
    // EVENT_PYRAMINX,
    // EVENT_MEGAMINX,
    // EVENT_SQUARE_1,
    // EVENT_SKEWB,
  ];
}
