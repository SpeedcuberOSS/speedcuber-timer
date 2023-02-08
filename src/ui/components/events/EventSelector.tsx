// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Avatar, Text } from 'react-native-paper';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { CompetitiveEvent } from '../../../lib/stif';
import Icons from '../../icons/iconHelper';
import { getKnownCompetitiveEvents } from '../../utils/knownEvents';
import { useTranslation } from 'react-i18next';

interface EventSelectorProps {
  onSelect: (event: CompetitiveEvent) => void;
}

interface EventItemProps {
  item: CompetitiveEvent;
  onPress: () => void;
}

function EventItem({ item, onPress }: EventItemProps) {
  const { t } = useTranslation();
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Avatar.Icon icon={Icons.WCAEvent(item.id)} size={60} />
      <Text numberOfLines={1} variant="labelSmall">
        {t(`events.${item.id}`)}
      </Text>
    </Pressable>
  );
}

export default function EventSelector({ onSelect }: EventSelectorProps) {
  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.list}
        data={getKnownCompetitiveEvents()}
        numColumns={3}
        renderItem={({ item }) => (
          <EventItem key={item.id} item={item} onPress={() => onSelect(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  list: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    padding: 10,
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
  },
  label: { padding: 10 },
});
