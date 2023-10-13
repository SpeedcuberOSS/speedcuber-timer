// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../../lib/stif/wrappers';
import { DevelopmentExampleSet } from '../../examples/types';
import { STIF } from '../../../lib/stif';
import Solution from './Solution';

const smartAttempt2x2x2 =
  require('../../../lib/recordings/__fixtures__/particula_2x2x2_attempt.json') as STIF.Attempt;
const smartAttempt =
  require('../../../lib/recordings/__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const smartAttemptGyro =
  require('../../../lib/recordings/__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;

const examples: DevelopmentExampleSet = {
  title: 'Solution',
  description: 'The interactive viewer of a Solution.',
  examples: [
    {
      title: '2x2x2',
      component: (
        <Solution solution={new Attempt(smartAttempt2x2x2).solutions()[0]} />
      ),
    },
    {
      title: '3x3x3',
      component: (
        <Solution solution={new Attempt(smartAttempt).solutions()[0]} />
      ),
    },
    {
      title: '3x3x3 (with Gyroscope)',
      component: (
        <Solution solution={new Attempt(smartAttemptGyro).solutions()[0]} />
      ),
    },
    {
      title: '3x3x3 (partway replayed)',
      component: (
        <Solution
          solution={new Attempt(smartAttempt).solutions()[0]}
          atTimestamp={7654}
        />
      ),
    },
  ],
};

export default examples;
