// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleScreen from './ExampleScreen';
import ExampleListScreen from './ExampleListScreen';
import Examples from './examples';

const Stack = createStackNavigator<DevelopmentStackParamList>();


export default function DevelopmentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExampleList"
        component={ExampleListScreen}
        initialParams={{keys: Examples.setKeys()}}
        options={{
          title: "Examples"
        }}
      />
      <Stack.Screen name="Example" component={ExampleScreen} />
    </Stack.Navigator>
  );
}
