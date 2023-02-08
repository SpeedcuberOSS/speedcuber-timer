// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';
import TPSChart from './TPSChart';
import { storiesOf } from '@storybook/react-native';

const replay2x2x2 =
  require('../../../lib/bluetooth-puzzle/__fixtures__/particula_2x2x2_solve_replay.json') as SolveReplay;
const replay3x3x3 =
  require('../../../lib/bluetooth-puzzle/__fixtures__/rubiks_connected_solve_replay.json') as SolveReplay;
const replayGyro =
  require('../../../lib/bluetooth-puzzle/__fixtures__/particula_3x3x3_solve_replay.json') as SolveReplay;

storiesOf('TPSChart', module)
  .add('2x2x2', () => <TPSChart solveReplay={replay2x2x2} duration={7561} />)
  .add('3x3x3', () => <TPSChart solveReplay={replay3x3x3} duration={14835} />)
  .add('3x3x3-gyro', () => (
    <TPSChart solveReplay={replayGyro} duration={11833} />
  ));
