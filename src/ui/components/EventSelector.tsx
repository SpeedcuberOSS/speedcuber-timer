// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Avatar, Surface, Text } from 'react-native-paper';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { CompetitiveEvent } from '../../lib/stif';
import Icons from '../icons/iconHelper';
import React from 'react';
import { getKnownCompetitiveEvents } from '../utils/knownEvents';
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
      <Text style={styles.label} variant="labelSmall">
        {t(`events.${item.id}`)}
      </Text>
    </Pressable>
  );
}

export default function EventSelector({ onSelect }: EventSelectorProps) {
  return (
    <FlatList
      data={getKnownCompetitiveEvents()}
      numColumns={3}
      renderItem={({ item }) => (
        <EventItem key={item.id} item={item} onPress={() => onSelect(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 16,
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: { padding: 10 },
});
