// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import AttemptsChart from './AttemptsChart';

import attempts from '../../../lib/analytics/demo/twisty2stif';

const examples: DevelopmentExampleSet = {
  key: 'attempts-chart',
  title: 'Attempts Chart',
  description: 'A scatter plot of attempt durations and trends.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <AttemptsChart attempts={attempts.slice(0, 50)} />,
    },
    {
      key: '50-100',
      title: 'Ao20, Ao50',
      component: (
        <AttemptsChart
          attempts={attempts.slice(0, 100)}
          averages={[20, 50]}
        />
      ),
    },
  ],
};

export default examples;
