// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
import { number as numberKnob } from '@storybook/addon-knobs';

import InspectionTime from '../../components/InspectionTime';

storiesOf('InspectionTime', module)
  .add('default', () => {
    return (
      <InspectionTime elapsedMillis={numberKnob('Time Elapsed (ms)', 0)} />
    );
  })
  .add('start', () => <InspectionTime elapsedMillis={0} />)
  .add('first warning', () => <InspectionTime elapsedMillis={8000} />)
  .add('second warning', () => <InspectionTime elapsedMillis={12000} />)
  .add('almost done', () => <InspectionTime elapsedMillis={15000} />)
  .add('overtime +2', () => <InspectionTime elapsedMillis={15001} />)
  .add('overtime DNF', () => <InspectionTime elapsedMillis={17001} />)
  .add('ready', () => <InspectionTime ready elapsedMillis={4000} />)
  .add('ready late', () => <InspectionTime ready elapsedMillis={13000} />)
  .add('ready +2', () => <InspectionTime ready elapsedMillis={16000} />)
  .add('custom durations', () => (
    <InspectionTime
      elapsedMillis={numberKnob('Time Elapsed (ms)', 0)}
      inspectionDurationMillis={numberKnob('Inspection Duration (ms)', 20000)}
      stackmatDelayMillis={numberKnob('Stackmat Delay (ms)', 1000)}
      overtimeUntilDnfMillis={numberKnob('Overtime until DNF (ms)', 5000)}
    />
  ));
