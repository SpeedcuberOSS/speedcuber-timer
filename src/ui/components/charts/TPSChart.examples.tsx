// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import { STIF } from '../../../lib/stif';
import TPSChart from './TPSChart';

const replay2x2x2 =
  require('../../../lib/recordings/__fixtures__/particula_2x2x2_solve_replay.json') as STIF.TimestampedMove[];
const replay3x3x3 =
  require('../../../lib/recordings/__fixtures__/rubiks_connected_solve_replay.json') as STIF.TimestampedMove[];
const replayGyro =
  require('../../../lib/recordings/__fixtures__/particula_3x3x3_solve_replay.json') as STIF.TimestampedMove[];

const examples: DevelopmentExampleSet = {
  title: 'TPS Chart',
  description: 'A chart that displays the TPS of a solve over time.',
  examples: [
    {
      title: '2x2x2',
      component: <TPSChart solveReplay={replay2x2x2} duration={7561} />,
    },
    {
      title: '3x3x3',
      component: <TPSChart solveReplay={replay3x3x3} duration={14835} />,
    },
    {
      title: '3x3x3 (Gyro)',
      component: <TPSChart solveReplay={replayGyro} duration={11833} />,
    },
  ]
}

export default examples;