// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import LearnScreen from '../screens/LearnScreen';
import PlayScreen from '../screens/PlayScreen';
import PracticeNavigator from './PracticeNavigator';
import * as React from 'react';
import { RootDrawerParamList } from './types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ExamplesNavigator from '../examples/ExamplesNavigator';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator id="Root" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Practice" component={PracticeNavigator} />
      <Drawer.Screen name="Learn" component={LearnScreen} />
      <Drawer.Screen name="Play" component={PlayScreen} />
      {__DEV__ && (
        <Drawer.Screen
          name="Examples"
          component={ExamplesNavigator}
          options={{
            drawerLabel: 'Development',
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
