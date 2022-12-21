// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Avatar, Surface, Text } from 'react-native-paper';
import { Dimensions, FlatList, Pressable } from 'react-native';

import { CompetitiveEvent } from '../../lib/stif';
import Icons from '../icons/iconHelper';
import React from 'react';
import { getKnownCompetitiveEvents } from '../utils/knownEvents';
import { useTranslation } from 'react-i18next';

interface EventSelectorProps {
  onSelect: (event: CompetitiveEvent) => void;
}

export default function EventSelector({ onSelect }: EventSelectorProps) {
  const { t } = useTranslation();
  return (
    <>
      <Surface
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          alignItems: 'center',
        }}>
        <Text variant="titleLarge" style={{ padding: 10 }}>
          {t('dialogs.select_event')}
        </Text>
      </Surface>
      <FlatList
        data={getKnownCompetitiveEvents()}
        numColumns={3}
        style={{ paddingTop: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item)}
            style={{
              margin: 8,
              width: Dimensions.get('window').width / 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar.Icon icon={Icons.WCAEvent(item.id)} size={45} />
            <Text style={{ padding: 10 }} variant="labelSmall">
              {t(`events.${item.id}`)}
            </Text>
          </Pressable>
        )}
      />
    </>
  );
}
