// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, View } from 'react-native';

import CenteredBetweenSidebars from './CenteredBetweenSidebars';
import { DevelopmentExampleSet } from '../examples/types';

const examples: DevelopmentExampleSet = {
  key: 'centered-between-sidebars',
  title: 'Centered Between Sidebars',
  description: 'A layout component that centers content between two sidebars.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: (
        <CenteredBetweenSidebars>
          <View
            style={{
              backgroundColor: 'red',
              height: Dimensions.get('screen').height,
            }}
          />
          <View
            style={{
              backgroundColor: 'green',
              height: Dimensions.get('screen').height,
            }}
          />
          <View
            style={{
              backgroundColor: 'red',
              height: Dimensions.get('screen').height,
            }}
          />
        </CenteredBetweenSidebars>
      ),
    },
    {
      key: 'custom-weights',
      title: 'Custom Weights',
      component: (
        <CenteredBetweenSidebars contentWeight={2} sidebarWeight={2}>
          <View
            style={{
              backgroundColor: 'red',
              height: Dimensions.get('screen').height,
            }}
          />
          <View
            style={{
              backgroundColor: 'green',
              height: Dimensions.get('screen').height,
            }}
          />
          <View
            style={{
              backgroundColor: 'red',
              height: Dimensions.get('screen').height,
            }}
          />
        </CenteredBetweenSidebars>
      ),
    },
  ],
};

export default examples;