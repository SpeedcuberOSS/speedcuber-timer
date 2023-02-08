// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, View } from 'react-native';

import CenteredBetweenSidebars from './CenteredBetweenSidebars';
import { storiesOf } from '@storybook/react-native';

storiesOf('CenteredBetweenSidebars', module)
  .add('default', () => (
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
  ))
  .add('Custom Weights', () => (
    <CenteredBetweenSidebars contentWeight={7} sidebarWeight={2}>
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
  ));
