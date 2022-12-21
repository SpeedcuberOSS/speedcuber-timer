// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  CompetitiveEvent,
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
} from '../../stif';
import {
  Scrambler2x2x2,
  Scrambler3x3x3,
  Scrambler4x4x4,
  Scrambler5x5x5,
  Scrambler6x6x6,
  Scrambler7x7x7,
  ScramblerUnknown,
} from './scramblers';

import { Scrambler } from './core';

const SCRAMBLER_MAP = new Map<CompetitiveEvent, Scrambler>([
  [EVENT_2x2x2, new Scrambler2x2x2()],
  [EVENT_3x3x3, new Scrambler3x3x3()],
  [EVENT_3x3x3_BLD, new Scrambler3x3x3()],
  [EVENT_3x3x3_OH, new Scrambler3x3x3()],
  [EVENT_3x3x3_FEET, new Scrambler3x3x3()],
  [EVENT_4x4x4, new Scrambler4x4x4()],
  [EVENT_4x4x4_BLD, new Scrambler4x4x4()],
  [EVENT_5x5x5, new Scrambler5x5x5()],
  [EVENT_5x5x5_BLD, new Scrambler5x5x5()],
  [EVENT_6x6x6, new Scrambler6x6x6()],
  [EVENT_7x7x7, new Scrambler7x7x7()],
]);

export function getScrambler(event: CompetitiveEvent) {
  return SCRAMBLER_MAP.get(event) ?? new ScramblerUnknown();
}
