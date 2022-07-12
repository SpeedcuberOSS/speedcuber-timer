// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'react-native-get-random-values';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import i18n from './src/localization';
import { getCurrentTheme } from './src/ui/themes';

import MainNavigator from './src/ui/navigation/MainNavigator';

const App = () => {
  if (i18n.isInitialized) {
    console.log('i18n initialized');
  }
  return (
    <PaperProvider theme={getCurrentTheme()}>
      <MainNavigator />
    </PaperProvider>
  );
};

export default App;
