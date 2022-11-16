// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { FAB } from 'react-native-paper';
import Icons from '../icons/iconHelper';
import PracticeView from '../components/PracticeView';
import SmartPuzzlePlayground from '../components/SmartPuzzlePlayground';

function ScannerFAB({ onPress }: { onPress: () => void }) {
  return (
    <FAB
      style={styles.fab}
      icon={Icons.MaterialCommunityIcons('bluetooth')}
      onPress={onPress}
    />
  );
}

function PracticeFAB({ onPress }: { onPress: () => void }) {
  return (
    <FAB
      style={styles.fab}
      icon={Icons.Entypo('stopwatch')}
      onPress={onPress}
    />
  );
}

export default function PracticeScreen() {
  const [currentView, setCurrentView] = useState('PracticeView');
  const onPressFAB = (newView: string) => setCurrentView(newView);

  return (
    <SafeAreaView style={styles.container}>
      {currentView === 'PracticeView' && (
        <>
          <PracticeView />
          <ScannerFAB onPress={() => onPressFAB('ScannerView')} />
        </>
      )}
      {currentView === 'ScannerView' && (
        <>
          <SmartPuzzlePlayground />
          <PracticeFAB onPress={() => onPressFAB('PracticeView')} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  landing: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
  },
  scramble: {
    fontSize: 20,
    textAlign: 'center',
    padding: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 2,
  },
});
