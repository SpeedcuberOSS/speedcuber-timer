// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { number as numberKnob } from '@storybook/addon-knobs';

import InspectionTimer from '../../src/ui/components/InspectionTimer';

storiesOf('InspectionTimer', module)
  .add('default', () => {
    return (
      <InspectionTimer onInspectionComplete={action('onInspectionComplete')} />
    );
  })
  .add('custom durations', () => (
    <InspectionTimer
      onInspectionComplete={action('onInspectionComplete')}
      inspectionDurationMillis={numberKnob('Inspection Duration (ms)', 20000)}
      stackmatDelayMillis={numberKnob('Stackmat Delay (ms)', 1000)}
      overtimeUntilDnfMillis={numberKnob('Overtime until DNF (ms)', 5000)}
    />
  ));
