// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, ProgressBar, Text } from 'react-native-paper';
import React, { useState } from 'react';

import { BluetoothPuzzle } from '../../lib/bluetooth-puzzle';
import { SafeAreaView } from 'react-native';
import SmartPuzzleConnector from '../components/SmartPuzzleConnector';
import { getAvailableBluetoothCubes } from '../utils/bluetooth';
import { useTranslation } from 'react-i18next';

export default function PlayScreen() {
  const [cubes, setCubes] = useState<BluetoothPuzzle[]>([]);
  const [progressVisible, setProgressVisible] = useState(false);
  const [moves, setMoves] = useState<string[]>([]);
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Button
        onPress={async () => {
          console.debug('Scanning for cubes');
          setProgressVisible(true);
          try {
            const cubes = await getAvailableBluetoothCubes();
            setCubes(cubes);
          } catch (error) {
            console.error(`Error while discovering cubes: ${error}`);
          }
          setProgressVisible(false);
        }}
        mode="contained-tonal"
        icon="bluetooth">
        {t('bluetooth.start_scan')}
      </Button>
      <ProgressBar visible={progressVisible} indeterminate />
      {cubes.length > 0 &&
        cubes.map(cube => (
          <SmartPuzzleConnector
            key={cube.id()}
            smartPuzzle={cube}
            onMove={move => setMoves([...moves, move])}
          />
        ))}
      <Text>{moves.join(', ')}</Text>
    </SafeAreaView>
  );
}
