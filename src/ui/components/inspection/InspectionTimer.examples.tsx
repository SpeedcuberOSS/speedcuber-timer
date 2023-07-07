// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import InspectionTimer from './InspectionTimer';

const examples = [
  {
    key: 'inspectionTimer:default',
    name: 'Inspection Timer: Default',
    component: (
      <InspectionTimer
        onInspectionComplete={() => console.log('Inspection Complete')}
      />
    ),
  },
  {
    key: 'inspectionTimer:customDurations',
    name: 'Inspection Timer: Custom Durations',
    component: (
      <InspectionTimer
        onInspectionComplete={() => console.log('Inspection Complete')}
        inspectionDurationMillis={20000}
        stackmatDelayMillis={1000}
        overtimeUntilDnfMillis={5000}
      />
    ),
  },
];

export default examples;
