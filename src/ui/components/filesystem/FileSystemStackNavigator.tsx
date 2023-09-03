// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import FileSystemScreen from './FileSystemScreen';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootDrawerParamList, RootDrawerScreenProps } from '../../navigation/types';

export type FileSystemStackParamList = {
  FileSystem: { path: string};
};
export type FileSystemStackScreenProps<T extends keyof FileSystemStackParamList> =
  CompositeScreenProps<
    StackScreenProps<FileSystemStackParamList, T>,
    RootDrawerScreenProps<keyof RootDrawerParamList>
  >;

const Stack = createStackNavigator<FileSystemStackParamList>();

export default function FileSystemStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FileSystem" component={FileSystemScreen} />
    </Stack.Navigator>
  );
}