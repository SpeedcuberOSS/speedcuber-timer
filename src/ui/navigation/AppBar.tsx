// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Appbar, Button } from 'react-native-paper';

import EventSelectorModal from '../components/events/EventSelectorModal';
import Icons from '../icons/iconHelper';
import { PracticeStackHeaderProps } from './types';
import PuzzleRegistry from '../components/smartpuzzles/SmartPuzzleRegistry';
import { STIF } from '../../lib/stif';
import SmartPuzzleScannerModal from '../components/smartpuzzles/SmartPuzzleScannerModal';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AppBar({ navigation, back }: PracticeStackHeaderProps) {
  const [event, setEvent] = useCompetitiveEvent();
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [showPuzzleScanner, setShowPuzzleScanner] = useState(false);
  const smartPuzzle = PuzzleRegistry.lastConnectedPuzzle()
  const { t } = useTranslation();
  return (
    <>
      <Appbar.Header mode="center-aligned" elevated>
        {back ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
        )}
        <Appbar.Content
          title={
            <Button
              icon={Icons.STIF(`event-${event.id}`)}
              mode="contained-tonal"
              onPress={() => setShowEventSelector(true)}>
              {t(`events.${event.id}`)}
            </Button>
          }
        />
        <Appbar.Action
          icon={smartPuzzle ? "bluetooth-connect" : "bluetooth" }
          onPress={() => setShowPuzzleScanner(true)}
        />
      </Appbar.Header>
      <EventSelectorModal
        visible={showEventSelector}
        onDismiss={() => setShowEventSelector(false)}
        onSelect={(event: STIF.CompetitiveEvent) => {
          setEvent(event);
          setShowEventSelector(false);
        }}
      />
      <SmartPuzzleScannerModal
        visible={showPuzzleScanner}
        onDismiss={() => setShowPuzzleScanner(false)}
      />
    </>
  );
}
