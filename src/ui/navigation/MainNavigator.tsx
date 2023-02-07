// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AppBar from './AppBar';
import DrawerNavigator from './DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigator from './TabNavigator';
import { useTheme } from 'react-native-paper';

const MainNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
      {/* <AppBar />
      <TabNavigator /> */}
    </NavigationContainer>
  );
};

MainNavigator.title = 'Bottom Navigation';

export default MainNavigator;
