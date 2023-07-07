// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Divider, List } from 'react-native-paper';
import { DevelopmentStackScreenProps } from './types';
import { FlatList } from 'react-native';
import { exampleByKey } from './examples';

export default function ExampleListScreen(
  props: DevelopmentStackScreenProps<'ExampleList'>,
) {
  const keys = props.route.params.keys;
  console.debug(`Received ${keys.length} keys`);
  return (
    <FlatList
      data={keys}
      renderItem={({ item }) => (
        <List.Item
          title={exampleByKey(item).name}
          onPress={() => props.navigation.navigate('Example', { key: item })}
        />
      )}
      ItemSeparatorComponent={Divider}
      keyExtractor={(item) => item}
    />
  );
}
