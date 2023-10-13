// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../examples/types';
import SplitScreen from './SplitScreen';
import { View } from 'react-native';

const View1 = <View style={{ backgroundColor: 'red', flex: 1 }} />;
const View2 = <View style={{ backgroundColor: 'blue', flex: 1 }} />;

const examples: DevelopmentExampleSet = {
  title: 'Split Screen',
  description: 'Show two views side by side',
  examples: [
    {
      title: 'Default',
      component: (
        <SplitScreen>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
    {
      title: '10/90 Split',
      component: (
        <SplitScreen split={10}>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
    {
      title: '60/40 Split',
      component: (
        <SplitScreen split={60}>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
    {
      title: '47/53 Horizontal Split',
      component: (
        <SplitScreen split={47} direction={'horizontal'}>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
    {
      title: 'with styles',
      component: (
        <SplitScreen
          style={{ borderColor: 'pink', borderRadius: 13, borderWidth: 37 }}>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
    {
      title: 'ignores custom flex direction',
      component: (
        <SplitScreen style={{ flexDirection: 'row' }}>
          {View1}
          {View2}
        </SplitScreen>
      ),
    },
  ],
};

export default examples;
