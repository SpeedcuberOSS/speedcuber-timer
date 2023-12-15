// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../../lib/stif/wrappers';
import AttemptsChart from './AttemptsChart';
import { DevelopmentExampleSet } from '../../examples/types';
import { INSPECTION_EXCEEDED_17_SECONDS } from '../../../lib/stif/builtins';
import attempts from '../../../lib/analytics/demo/twisty2stif';

const attemptsWithDNF = attempts
  .map((attempt, idx) => {
    return {
      ...attempt.stif(),
      infractions: [
        ...attempt.stif().infractions,
        ...(idx % 7 === 0 ? [INSPECTION_EXCEEDED_17_SECONDS] : []),
      ],
    };
  })
  .map(attempt => new Attempt(attempt));

const examples: DevelopmentExampleSet = {
  title: 'Attempts Chart',
  description: 'A scatter plot of attempt durations and trends.',
  examples: [
    {
      title: 'Default',
      component: <AttemptsChart attempts={attempts.slice(0, 250)} />,
    },
    {
      title: 'with DNFs',
      component: <AttemptsChart attempts={attemptsWithDNF.slice(0, 250)} />,
    },
    {
      title: 'Empty',
      component: <AttemptsChart />,
    },
    {
      title: 'Ao50, Ao100',
      component: <AttemptsChart attempts={attempts} averages={[50, 100]} />,
    },
    {
      title: 'Ao100, Ao1000',
      component: <AttemptsChart attempts={attempts} averages={[100, 1000]} />,
    },
  ],
};

export default examples;
