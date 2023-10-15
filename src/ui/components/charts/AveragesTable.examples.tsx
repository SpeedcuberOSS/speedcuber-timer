// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AveragesTable from './AveragesTable';
import { DevelopmentExampleSet } from '../../examples/types';
import { attemptFixtureWithTime } from '../../../lib/analytics/demo/attemptSets';
import attempts from '../../../lib/analytics/demo/twisty2stif';

const MILLIS = 1;
const SECONDS = 1_000 * MILLIS;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const LONG_DURATIONS = [
  13 * HOURS + 56 * MINUTES + 33 * SECONDS + 224 * MILLIS,
  12 * HOURS + 46 * MINUTES + 33 * SECONDS + 916 * MILLIS,
  11 * HOURS + 36 * MINUTES + 33 * SECONDS + 843 * MILLIS,
  14 * HOURS + 26 * MINUTES + 33 * SECONDS + 281 * MILLIS,
  15 * HOURS + 16 * MINUTES + 33 * SECONDS + 417 * MILLIS,
  11 * HOURS + 51 * MINUTES + 33 * SECONDS + 743 * MILLIS,
  12 * HOURS + 52 * MINUTES + 33 * SECONDS + 578 * MILLIS,
  13 * HOURS + 53 * MINUTES + 33 * SECONDS + 500 * MILLIS,
  14 * HOURS + 54 * MINUTES + 33 * SECONDS + 256 * MILLIS,
  15 * HOURS + 55 * MINUTES + 33 * SECONDS + 665 * MILLIS,
  11 * HOURS + 21 * MINUTES + 33 * SECONDS + 523 * MILLIS,
  12 * HOURS + 32 * MINUTES + 33 * SECONDS + 937 * MILLIS,
  13 * HOURS + 43 * MINUTES + 33 * SECONDS + 91 * MILLIS,
  14 * HOURS + 17 * MINUTES + 33 * SECONDS + 379 * MILLIS,
  10 * HOURS + 13 * MINUTES + 33 * SECONDS + 272 * MILLIS,
].map(attemptFixtureWithTime);

const examples: DevelopmentExampleSet = {
  title: 'Averages Table',
  description: 'Detailed breakdown of record solution statistics.',
  examples: [
    {
      title: 'Small Averages',
      component: <AveragesTable attempts={attempts} />,
    },
    {
      title: 'Large Averages',
      component: (
        <AveragesTable
          attempts={attempts}
          averages={[
            { type: 'trimmed', size: 50 },
            { type: 'trimmed', size: 100 },
            { type: 'trimmed', size: 1000 },
          ]}
        />
      ),
    },
    {
      title: 'Weird Averages',
      component: (
        <AveragesTable
          attempts={attempts}
          averages={[
            { type: 'trimmed', size: 86 },
            { type: 'mean', size: 302 },
            { type: 'trimmed', size: 209 },
          ]}
        />
      ),
    },
    {
      title: 'Empty',
      component: <AveragesTable />,
    },
    {
      title: 'Few Attempts',
      component: <AveragesTable attempts={attempts.slice(0, 9)} />,
    },
    {
      title: 'Long Durations',
      component: <AveragesTable attempts={LONG_DURATIONS} />,
    },
    {
      title: 'Paged Averages',
      component: (
        <AveragesTable
          attempts={attempts}
          averages={[
            { type: 'mean', size: 3 },
            { type: 'trimmed', size: 5 },
            { type: 'trimmed', size: 12 },
            { type: 'trimmed', size: 50 },
            { type: 'trimmed', size: 100 },
            { type: 'trimmed', size: 1000 },
          ]}
          perPage={3}
        />
      ),
    },
    {
      title: 'Load Test',
      component: (
        <AveragesTable
          attempts={[
            ...attempts,
            ...attempts,
            ...attempts,
            ...attempts,
            ...attempts,
          ]}
          averages={[
            { type: 'mean', size: 3 },
            { type: 'trimmed', size: 5 },
            { type: 'trimmed', size: 12 },
            { type: 'trimmed', size: 50 },
            { type: 'trimmed', size: 100 },
            { type: 'trimmed', size: 1000 },
          ]}
        />
      ),
    },
    // On press average
  ],
};

export default examples;
