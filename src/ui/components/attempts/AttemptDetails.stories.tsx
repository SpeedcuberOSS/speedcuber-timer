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

import AttemptDetails from './AttemptDetails';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

// import { action } from '@storybook/addon-actions';

let basicAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']),
  10000,
);
basicAttempt.comment = 'What a neat solve!';
basicAttempt.unixTimestamp = 1663731466876;

let infractionsAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
infractionsAttempt.unixTimestamp = 1663731466876;
infractionsAttempt.infractions = [STOPPED_PUZZLE_ONE_MOVE_REMAINING];

let dnfAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
dnfAttempt.unixTimestamp = 1663731466876;
dnfAttempt.infractions = [STOPPED_PUZZLE_UNSOLVED];

let dnsAttempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U', "R'", "U'"]),
  10000,
);
dnsAttempt.unixTimestamp = 1663731466876;
dnsAttempt.infractions = [INSPECTION_STARTED_LATE_ONE_MINUTE];

storiesOf('AttemptDetails', module)
  .add('default', () => <AttemptDetails attempt={basicAttempt} />)
  .add('with Infractions', () => (
    <AttemptDetails attempt={infractionsAttempt} />
  ))
  .add('with DNF', () => <AttemptDetails attempt={dnfAttempt} />)
  .add('with DNS', () => <AttemptDetails attempt={dnsAttempt} />);
