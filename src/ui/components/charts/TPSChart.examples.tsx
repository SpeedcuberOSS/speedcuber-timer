// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';
import { DevelopmentExampleSet } from '../../examples/types';
import TPSChart from './TPSChart';

const replay2x2x2 =
  require('../../../lib/bluetooth-puzzle/__fixtures__/particula_2x2x2_solve_replay.json') as SolveReplay;
const replay3x3x3 =
  require('../../../lib/bluetooth-puzzle/__fixtures__/rubiks_connected_solve_replay.json') as SolveReplay;
const replayGyro =
  require('../../../lib/bluetooth-puzzle/__fixtures__/particula_3x3x3_solve_replay.json') as SolveReplay;

const examples: DevelopmentExampleSet = {
  key: 'tps-chart',
  title: 'TPS Chart',
  description: 'A chart that displays the TPS of a solve over time.',
  examples: [
    {
      key: '2x2x2',
      title: '2x2x2',
      component: <TPSChart solveReplay={replay2x2x2} duration={7561} />,
    },
    {
      key: '3x3x3',
      title: '3x3x3',
      component: <TPSChart solveReplay={replay3x3x3} duration={14835} />,
    },
    {
      key: '3x3x3-gyro',
      title: '3x3x3 (Gyro)',
      component: <TPSChart solveReplay={replayGyro} duration={11833} />,
    },
  ]
}

export default examples;