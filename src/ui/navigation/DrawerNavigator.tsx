// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react';

import BackupScreen from '../screens/BackupScreen';
import ExamplesNavigator from '../examples/ExamplesNavigator';
import FileSystemStackNavigator from '../components/filesystem/FileSystemStackNavigator';
import PlayScreen from '../screens/PlayScreen';
import PracticeNavigator from './PracticeNavigator';
import { RootDrawerParamList } from './types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Drawer.Navigator id="Root" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Practice" component={PracticeNavigator} />
      <Drawer.Screen
        name="Backup"
        component={BackupScreen}
        options={{
          drawerLabel: t('backup.drawerLabel'),
        }}
      />
      {__DEV__ && (
        <>
          <Drawer.Screen
            name="Examples"
            component={ExamplesNavigator}
            options={{
              drawerLabel: 'Dev Examples',
            }}
          />
          <Drawer.Screen
            name="Play"
            component={PlayScreen}
            options={{
              drawerLabel: 'Dev Playground',
            }}
          />
          <Drawer.Screen
            name="FileSystemStack"
            component={FileSystemStackNavigator}
            options={{
              drawerLabel: 'File System',
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
