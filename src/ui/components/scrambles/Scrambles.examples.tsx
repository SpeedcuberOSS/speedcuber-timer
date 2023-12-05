// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ATTEMPT_RELAY_234567 } from '../../../lib/stif/demo';
import { DevelopmentExampleSet } from '../../examples/types';
import { Dimensions } from 'react-native';
import Scrambles from './Scrambles';

const relayScrambles = ATTEMPT_RELAY_234567.solutions.map(s => ({
  puzzle: s.puzzle,
  algorithm: s.scramble,
}));
const height25Pct = Dimensions.get('window').height * 0.25; 

const examples: DevelopmentExampleSet = {
  title: 'Scrambles',
  description: 'Displays a set of scrambles',
  examples: [
    {
      title: 'Zero scrambles',
      component: <Scrambles />,
    },
    {
      title: 'One scramble',
      component: (
        <Scrambles
          scrambles={[
            {
              puzzle: '222',
              algorithm: ['R', 'U', "R'", "U'"],
            },
          ]}
        />
      ),
    },
    {
      title: 'Two scrambles',
      component: (
        <Scrambles
          scrambles={[
            {
              puzzle: '222',
              algorithm: ['R', 'U', "R'", "U'"],
            },
            {
              puzzle: '333',
              algorithm: ['R', 'U', "R'", "U'", 'R', 'U', "R'", "U'"],
            },
          ]}
        />
      ),
    },
    {
      title: 'Many scrambles',
      component: <Scrambles scrambles={relayScrambles} />,
    },
    {
      title: 'Height limited (one long scramble)',
      component: <Scrambles scrambles={[{
        puzzle: '333',
        algorithm: ['R', 'U', "R'", "U'"].flatMap(m => Array(100).fill(m)),
      }]} layoutHeightLimit={height25Pct}/>,
    },
    {
      title: 'Height limited (many scrambles)',
      component: <Scrambles scrambles={relayScrambles} layoutHeightLimit={height25Pct}/>,
    },
  ],
};

export default examples;
