// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import CenteredBetweenSidebars from './CenteredBetweenSidebars';
import { DevelopmentExampleSet } from '../examples/types';
import { View } from 'react-native';

const examples: DevelopmentExampleSet = {
  title: 'Centered Between Sidebars',
  description: 'A layout component that centers content between two sidebars.',
  examples: [
    {
      title: 'Default',
      component: (
        <CenteredBetweenSidebars containerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
          <View style={{ flex: 1, backgroundColor: 'green' }} />
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </CenteredBetweenSidebars>
      ),
    },
    {
      title: 'Vertical',
      component: (
        <CenteredBetweenSidebars direction="vertical" containerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
          <View style={{ flex: 1, backgroundColor: 'green' }} />
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </CenteredBetweenSidebars>
      ),
    },
    {
      title: 'Custom Weights',
      component: (
        <CenteredBetweenSidebars
          contentWeight={2}
          sidebarWeight={2}
          onLayoutAll={console.log}
          containerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
          <View style={{ flex: 1, backgroundColor: 'green' }} />
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </CenteredBetweenSidebars>
      ),
    },
    {
      title: 'Styled Contents',
      component: (
        <CenteredBetweenSidebars
          contentWeight={2}
          contentStyle={{ borderColor: 'blue', borderWidth: 2 }}
          sidebarStyle={{ borderColor: 'yellow', borderWidth: 2 }}
          sidebarWeight={2}
          containerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
          <View style={{ flex: 1, backgroundColor: 'green' }} />
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </CenteredBetweenSidebars>
      ),
    },
  ],
};

export default examples;
