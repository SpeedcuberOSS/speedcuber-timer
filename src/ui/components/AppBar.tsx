// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Appbar,
  Avatar,
  Button,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { Dimensions, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';

import Icons from '../icons/iconHelper';
import { getKnownCompetitiveEvents } from '../utils/knownEvents';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useTranslation } from 'react-i18next';

export default function AppBar() {
  const [event, setEvent] = useCompetitiveEvent();
  const [showEventSelector, setShowEventSelector] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <Appbar.Header elevated={true}>
        {/* @ts-ignore */}
        <Appbar.Action
          icon="menu"
          onPress={() => console.log('PLACEHOLDER: Menu pressed')}
        />
        {/* @ts-ignore */}
        <Appbar.Content
          style={{ paddingTop: 8 }}
          title={
            <Button icon={Icons.WCAEvent(event.id)} mode="contained-tonal">
              {t(`events.${event.id}`)}
            </Button>
          }
          onPress={() => setShowEventSelector(true)}
        />
        {/* @ts-ignore */}
        <Appbar.Action
          icon="bluetooth"
          onPress={() => console.log('PLACEHOLDER: Bluetooth pressed')}
        />
      </Appbar.Header>
      <Portal>
        <Modal
          visible={showEventSelector}
          onDismiss={() => setShowEventSelector(false)}
          contentContainerStyle={{
            maxHeight: 0.6 * Dimensions.get('window').height,
            margin: 20,
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text variant="titleLarge" style={{ padding: 20 }}>
            {t('dialogs.select_event')}
          </Text>
          <FlatList
            data={getKnownCompetitiveEvents()}
            numColumns={3}
            style={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setEvent(item);
                  setShowEventSelector(false);
                }}
                style={{
                  margin: 8,
                  width: Dimensions.get('window').width / 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Avatar.Icon icon={Icons.WCAEvent(item.id)} />
                <Text style={{ padding: 10 }}>{t(`events.${item.id}`)}</Text>
              </Pressable>
            )}
          />
        </Modal>
      </Portal>
    </>
  );
}
