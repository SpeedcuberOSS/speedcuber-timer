// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, IconButton, ProgressBar, Text } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { DEFAULT_BLUETOOTH_SCAN_DURATION } from '../utils/bluetooth';
import Icons from '../icons/iconHelper';
import SmartPuzzleConnector from '../components/SmartPuzzleConnector';
import useSmartPuzzles from '../utils/bluetooth/useSmartPuzzles';
import { useTranslation } from 'react-i18next';

export default function PlayScreen() {
  const { puzzles, puzzleScan } = useSmartPuzzles();
  const [progressVisible, setProgressVisible] = useState(false);
  const [lastMove, setLastMove] = useState<object>({});
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Button
        onPress={async () => {
          console.debug('Scanning for cubes');
          setProgressVisible(true);
          try {
            puzzleScan(DEFAULT_BLUETOOTH_SCAN_DURATION);
          } catch (error) {
            console.error(`Error while discovering cubes: ${error}`);
          }
          setTimeout(() => {
            setProgressVisible(false);
          }, DEFAULT_BLUETOOTH_SCAN_DURATION);
        }}
        mode="contained-tonal"
        icon="bluetooth">
        {t('bluetooth.start_scan')}
      </Button>
      <ProgressBar visible={progressVisible} indeterminate />
      {puzzles.length > 0 &&
        puzzles.map(cube => (
          <SmartPuzzleConnector
            key={cube.id()}
            smartPuzzle={cube}
            onMove={move => setLastMove(JSON.parse(move))}
          />
        ))}
      <Text>{JSON.stringify(lastMove)}</Text>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: lastMove?.face?.toLowerCase() ?? 'black',
        }}></View>
      {lastMove.direction === 'clockwise' && (
        <IconButton icon={Icons.MaterialIcons('rotate-right')} size={50} />
      )}
      {lastMove.direction === 'counterclockwise' && (
        <IconButton icon={Icons.MaterialIcons('rotate-left')} size={50} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  connecting: {
    marginHorizontal: 28,
  },
  connection: {
    marginHorizontal: 20,
    fontSize: 50,
  },
});
