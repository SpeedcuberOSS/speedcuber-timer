// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import DrawerNavigator from './DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { getCurrentTheme } from '../themes';

const MainNavigator = () => {
  const theme = getCurrentTheme();
  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

MainNavigator.title = 'Bottom Navigation';

export default MainNavigator;
