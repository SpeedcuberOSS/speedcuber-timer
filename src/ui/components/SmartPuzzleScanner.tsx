// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, ProgressBar, Text } from 'react-native-paper';
import React, { useState } from 'react';

import { DEFAULT_BLUETOOTH_SCAN_DURATION } from '../utils/bluetooth';
import SmartPuzzleConnector from '../components/SmartPuzzleConnector';
import { View } from 'react-native';
import useSmartPuzzles from '../utils/bluetooth/useSmartPuzzles';
import { useTranslation } from 'react-i18next';

const SmartPuzzleScanner = () => {
  const { puzzles, puzzleScan } = useSmartPuzzles();
  const [progressVisible, setProgressVisible] = useState(false);
  const [lastMove, setLastMove] = useState<object>({});
  const { t } = useTranslation();
  return (
    <View>
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
    </View>
  );
};

export default SmartPuzzleScanner;
