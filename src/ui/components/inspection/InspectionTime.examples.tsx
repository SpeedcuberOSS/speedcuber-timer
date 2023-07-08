// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import InspectionTime from './InspectionTime';

const examples: DevelopmentExampleSet = {
  key: 'inspection-time',
  title: 'Inspection Time',
  description: 'A rendering of the inspection time.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <InspectionTime elapsedMillis={0} />,
    },
    {
      key: 'first-warning',
      title: 'First Warning',
      component: <InspectionTime elapsedMillis={8000} />,
    },
    {
      key: 'second-warning',
      title: 'Second Warning',
      component: <InspectionTime elapsedMillis={12000} />,
    },
    {
      key: 'almost-done',
      title: 'Almost Done',
      component: <InspectionTime elapsedMillis={15000} />,
    },
    {
      key: 'overtime-2',
      title: 'Overtime +2',
      component: <InspectionTime elapsedMillis={15001} />,
    },
    {
      key: 'overtime-dnf',
      title: 'Overtime DNF',
      component: <InspectionTime elapsedMillis={17001} />,
    },
    {
      key: 'ready',
      title: 'Ready',
      component: <InspectionTime ready elapsedMillis={4000} />,
    },
    {
      key: 'ready-late',
      title: 'Ready Late',
      component: <InspectionTime ready elapsedMillis={13000} />,
    },
    {
      key: 'ready-2',
      title: 'Ready +2',
      component: <InspectionTime ready elapsedMillis={16000} />,
    },
  ],
};

export default examples;
