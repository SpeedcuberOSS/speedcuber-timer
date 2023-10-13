// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Divider, List } from 'react-native-paper';

import { DevelopmentStackScreenProps } from './types';
import Examples from './examples';
import { FlatList } from 'react-native';
import { slugify } from './_utils';
import { useState } from 'react';

export default function ExampleListScreen(
  props: DevelopmentStackScreenProps<'ExampleList'>,
) {
  const keys = props.route.params.keys;
  return (
    <FlatList
      data={keys}
      renderItem={({ item }) => (
        <ExampleListItem
          setKey={item}
          onSelectExample={key =>
            props.navigation.navigate('Example', {
              key: key,
            })
          }
        />
      )}
      ItemSeparatorComponent={Divider}
      keyExtractor={item => item}
    />
  );
}

interface ExampleListItemProps {
  setKey: string;
  onSelectExample: (key: string) => void;
}
function ExampleListItem(props: ExampleListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const set = Examples.setByKey(props.setKey);
  return (
    <List.Accordion
      title={set.title}
      description={set.description}
      expanded={expanded}
      onPress={handlePress}
      left={props => <List.Icon {...props} icon="folder" />}>
      {set.examples.map(example => (
        <List.Item
          key={slugify(example.title)}
          title={example.title}
          description={example.description}
          onPress={() => props.onSelectExample(`${slugify(set.title)}:${slugify(example.title)}`)}
        />
      ))}
    </List.Accordion>
  );
}
