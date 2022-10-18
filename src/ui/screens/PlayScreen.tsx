// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, Text } from 'react-native-paper';

import { BluetoothPuzzle } from '../../lib/bluetooth-puzzle';
import React from 'react';
import { SafeAreaView } from 'react-native';
import SmartPuzzleCard from '../components/SmartPuzzleCard';
import { getAvailableBluetoothCubes } from '../utils/bluetooth';
import { useTranslation } from 'react-i18next';

export default function PlayScreen() {
  const [cubes, setCubes] = React.useState<BluetoothPuzzle[]>([]);
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Button
        onPress={async () => {
          console.debug('Scanning for cubes');
          const cubes = await getAvailableBluetoothCubes();
          setCubes(cubes);
        }}
        mode="contained-tonal"
        icon="bluetooth">
        {t('bluetooth.start_scan')}
      </Button>
      {cubes ? (
        cubes.map(cube => (
          // TODO convert to a driving component to update status.
          <SmartPuzzleCard
            key={cube.id}
            name={cube.name}
            brand={cube.brand}
            puzzle={cube.puzzle}
            connectionStatus={cube.connectionStatus}
            onConnect={async () => {
              await cube.connect();
              await cube.monitorTurns((error, value) => {
                if (error) {
                  console.error(error);
                }
                console.debug(value);
              });
            }}
          />
        ))
      ) : (
        <Text>No smartcubes found!</Text>
      )}
    </SafeAreaView>
  );
}
