// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AttemptPlayer from './AttemptPlayer';
import { storiesOf } from '@storybook/react-native';

const smartAttempt2x2x2 = require('../../../lib/bluetooth-puzzle/__fixtures__/particula_2x2x2_attempt.json');
const smartAttempt = require('../../../lib/bluetooth-puzzle/__fixtures__/rubiks_connected_attempt.json');
const smartAttemptGyro = require('../../../lib/bluetooth-puzzle/__fixtures__/particula_3x3x3_attempt.json');

storiesOf('AttemptPlayer', module)
  .add('2x2x2', () => <AttemptPlayer attempt={smartAttempt2x2x2} />)
  .add('3x3x3', () => <AttemptPlayer attempt={smartAttempt} />)
  .add('3x3x3-gyro', () => <AttemptPlayer attempt={smartAttemptGyro} />);
