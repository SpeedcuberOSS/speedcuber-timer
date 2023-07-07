// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import InspectionTime from './InspectionTime';

const examples = [
  {
    key: 'inspection-time:default',
    name: 'Default Inspection Time',
    component: <InspectionTime elapsedMillis={0} />,
  },
  {
    key: 'inspection-time:first-warning',
    name: 'Inspection: First Warning',
    component: <InspectionTime elapsedMillis={8000} />,
  },
  {
    key: 'inspection-time:second-warning',
    name: 'Inspection: Second Warning',
    component: <InspectionTime elapsedMillis={12000} />,
  },
  {
    key: 'inspection-time:almost-done',
    name: 'Inspection: Almost Done',
    component: <InspectionTime elapsedMillis={15000} />,
  },
  {
    key: 'inspection-time:overtime-2',
    name: 'Inspection: Overtime +2',
    component: <InspectionTime elapsedMillis={15001} />,
  },
  {
    key: 'inspection-time:overtime-dnf',
    name: 'Inspection: Overtime DNF',
    component: <InspectionTime elapsedMillis={17001} />,
  },
  {
    key: 'inspection-time:ready',
    name: 'Inspection: Ready',
    component: <InspectionTime ready elapsedMillis={4000} />,
  },
  {
    key: 'inspection-time:ready-late',
    name: 'Inspection: Ready Late',
    component: <InspectionTime ready elapsedMillis={13000} />,
  },
  {
    key: 'inspection-time:ready-2',
    name: 'Inspection: Ready +2',
    component: <InspectionTime ready elapsedMillis={16000} />,
  },
]

export default examples;