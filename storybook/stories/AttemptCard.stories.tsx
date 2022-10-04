// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

import {
  AttemptBuilder,
  ScrambleBuilder,
  PUZZLE_3x3x3,
  EVENT_3x3x3,
} from '../../src/lib/stif';
import AttemptCard from '../../src/ui/components/AttemptCard';

let attempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']),
  10000,
);
attempt.unixTimestamp = 1663731466876;

storiesOf('AttemptCard', module).add('default', () => (
  <AttemptCard attempt={attempt} />
));
