// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AppBar from './AppBar';
import AttemptPlayerScreen from '../screens/AttemptPlayerScreen';
import { PracticeStackParamList } from './types';
import TimerNavigator from './TimerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<PracticeStackParamList>();

export default function PracticeStackNavigator() {
  return (
    <Stack.Navigator>
      {/* @ts-ignore */}
      <Stack.Group screenOptions={{ header: AppBar }}>
        <Stack.Screen name="Timer" component={TimerNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Player" component={AttemptPlayerScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
