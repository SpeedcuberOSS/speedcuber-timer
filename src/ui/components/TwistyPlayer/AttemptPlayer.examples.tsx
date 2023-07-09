// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import AttemptPlayer from './AttemptPlayer';

const smartAttempt2x2x2 = require('../../../lib/bluetooth-puzzle/__fixtures__/particula_2x2x2_attempt.json');
const smartAttempt = require('../../../lib/bluetooth-puzzle/__fixtures__/rubiks_connected_attempt.json');
const smartAttemptGyro = require('../../../lib/bluetooth-puzzle/__fixtures__/particula_3x3x3_attempt.json');

const examples: DevelopmentExampleSet = {
  key: 'attempt-player',
  title: 'Attempt Player',
  description: 'The interactive viewer for replaying a solution Attempt.',
  examples: [
    {
      key: '2x2x2',
      title: '2x2x2',
      component: <AttemptPlayer attempt={smartAttempt2x2x2} />,
    },
    {
      key: '3x3x3',
      title: '3x3x3',
      component: <AttemptPlayer attempt={smartAttempt} />,
    },
    {
      key: '3x3x3-gyro',
      title: '3x3x3 (gyro)',
      component: <AttemptPlayer attempt={smartAttemptGyro} />,
    },
  ],
}

export default examples;