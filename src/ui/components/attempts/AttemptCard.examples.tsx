// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  EVENT_3x3x3,
  PUZZLE_3x3x3,
  ScrambleBuilder,
} from '../../../lib/stif';
import { DevelopmentExampleSet } from '../../examples/types';

import AttemptCard from './AttemptCard';

let attempt = AttemptBuilder.buildBasic(
  EVENT_3x3x3,
  ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']),
  10000,
);
attempt.unixTimestamp = 1663731466876;

const examples: DevelopmentExampleSet = {
  key: 'attemptcard',
  title: 'Attempt Card',
  description: 'A card that displays an attempt.',
  examples: [
    {
      key: 'typical',
      title: 'Typical',
      component: <AttemptCard attempt={attempt} />,
    },
  ],
};

export default examples;
