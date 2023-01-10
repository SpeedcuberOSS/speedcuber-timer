// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, IconButton, Surface } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { CompetitiveEvent } from '../../lib/stif';
import EventSelectorModal from '../components/EventSelectorModal';
import Icons from '../icons/iconHelper';
import SmartPuzzleScannerModal from '../components/SmartPuzzleScannerModal';
import { modeAppbarHeight } from 'react-native-paper/src/components/Appbar/utils';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useTranslation } from 'react-i18next';

export default function AppBar() {
  const [event, setEvent] = useCompetitiveEvent();
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [showPuzzleScanner, setShowPuzzleScanner] = useState(false);
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Surface style={styles.appbar}>
        {/* @ts-ignore */}
        <IconButton
          icon="menu"
          onPress={() => console.log('PLACEHOLDER: Menu pressed')}
        />
        <Button
          icon={Icons.WCAEvent(event.id)}
          mode="contained-tonal"
          onPress={() => setShowEventSelector(true)}>
          {t(`events.${event.id}`)}
        </Button>
        {/* @ts-ignore */}
        <IconButton
          icon="bluetooth"
          onPress={() => setShowPuzzleScanner(true)}
        />
      </Surface>
      <EventSelectorModal
        visible={showEventSelector}
        onDismiss={() => setShowEventSelector(false)}
        onSelect={(event: CompetitiveEvent) => {
          setEvent(event);
          setShowEventSelector(false);
        }}
      />
      <SmartPuzzleScannerModal
        visible={showPuzzleScanner}
        onDismiss={() => setShowPuzzleScanner(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appbar: {
    height: modeAppbarHeight['center-aligned'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
