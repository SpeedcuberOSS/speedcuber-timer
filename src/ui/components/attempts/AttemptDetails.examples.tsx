// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  EVENT_3x3x3,
  INSPECTION_STARTED_LATE_ONE_MINUTE,
  PUZZLE_3x3x3,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  ScrambleBuilder,
} from '../../../lib/stif';
import { DevelopmentExampleSet } from '../../examples/types';

import AttemptDetails from './AttemptDetails';

export const basicAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']),
  10000,
);
basicAttempt.comment = 'What a neat solve!';
basicAttempt.unixTimestamp = 1663731466876;

export const infractionsAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
infractionsAttempt.unixTimestamp = 1663731466876;
infractionsAttempt.infractions = [STOPPED_PUZZLE_ONE_MOVE_REMAINING];

export const dnfAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
dnfAttempt.unixTimestamp = 1663731466876;
dnfAttempt.infractions = [STOPPED_PUZZLE_UNSOLVED];

export const dnsAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
dnsAttempt.unixTimestamp = 1663731466876;
dnsAttempt.infractions = [INSPECTION_STARTED_LATE_ONE_MINUTE];

const examples: DevelopmentExampleSet = {
  key: 'attemptdetails',
  title: 'Attempt Details',
  description: 'A more detailed view of an attempt.',
  examples: [
    {
      key: 'typical',
      title: 'Typical',
      component: <AttemptDetails attempt={basicAttempt} />,
    },
    {
      key: 'infractions',
      title: 'with Infractions',
      component: <AttemptDetails attempt={infractionsAttempt} />,
    },
    {
      key: 'dnf',
      title: 'with DNF',
      component: <AttemptDetails attempt={dnfAttempt} />,
    },
    {
      key: 'dns',
      title: 'with DNS',
      component: <AttemptDetails attempt={dnsAttempt} />,
    },
  ],
}

export default examples;