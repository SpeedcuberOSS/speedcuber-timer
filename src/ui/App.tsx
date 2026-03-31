// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'react-native-get-random-values';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './navigation/MainNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { getCurrentTheme } from './themes';
import i18n from '../localization';
import { DatabaseProvider } from '../persistence/sqlitedb/DatabaseProvider';

const DevComponents = () => {
  const FlipperAsyncStorage =
    require('rn-flipper-async-storage-advanced').default;
  return (
    <>
      <FlipperAsyncStorage />
    </>
  );
};

const App = () => {
  if (i18n.isInitialized) {
    console.log('i18n initialized');
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={getCurrentTheme()}>
        <DatabaseProvider>
          {__DEV__ && <DevComponents />}
          <MainNavigator />
        </DatabaseProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
