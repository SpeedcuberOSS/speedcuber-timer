// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AppBar from './AppBar';
import LearnScreen from '../screens/LearnScreen';
import PlayScreen from '../screens/PlayScreen';
import React from 'react';
import TimerNavigator from './TimerNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ header: props => <AppBar {...props} /> }}>
      <Drawer.Screen name="Timer" component={TimerNavigator} />
      <Drawer.Screen name="Learn" component={LearnScreen} />
      <Drawer.Screen name="Play" component={PlayScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
