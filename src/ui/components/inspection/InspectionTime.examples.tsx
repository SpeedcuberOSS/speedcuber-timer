// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import InspectionTime from './InspectionTime';

const examples: DevelopmentExampleSet = {
  title: 'Inspection Time',
  description: 'A rendering of the inspection time.',
  examples: [
    {
      title: 'Default',
      component: <InspectionTime elapsed={0} />,
    },
    {
      title: 'First Warning',
      component: <InspectionTime elapsed={8000} />,
    },
    {
      title: 'Second Warning',
      component: <InspectionTime elapsed={12000} />,
    },
    {
      title: 'Almost Done',
      component: <InspectionTime elapsed={15000} />,
    },
    {
      title: 'Overtime +2',
      component: <InspectionTime elapsed={15001} />,
    },
    {
      title: 'Overtime DNF',
      component: <InspectionTime elapsed={17001} />,
    },
    {
      title: 'Ready',
      component: <InspectionTime ready elapsed={4000} />,
    },
    {
      title: 'Ready Late',
      component: <InspectionTime ready elapsed={13000} />,
    },
    {
      title: 'Ready +2',
      component: <InspectionTime ready elapsed={16000} />,
    },
  ],
};

export default examples;
