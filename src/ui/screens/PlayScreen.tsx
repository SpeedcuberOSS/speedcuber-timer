// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import { getAvailableBluetoothCubes, connectToCube } from '../utils/bluetooth';
import { Device } from 'react-native-ble-plx';

export default function PlayScreen() {
  const [cubeScanning, setCubeScanning] = React.useState(false);
  const [devices, setDevices] = React.useState<Device[]>([]);
  useEffect(() => {
    async function scanForCubes() {
      console.debug('Scanning for cubes');
      const cubes = await getAvailableBluetoothCubes();
      setDevices(cubes);
      setCubeScanning(false);
    }
    if (cubeScanning) {
      scanForCubes();
    }
  }, [cubeScanning]);
  return (
    <SafeAreaView>
      <Button
        onPress={() => setCubeScanning(true)}
        mode="contained-tonal"
        icon="bluetooth">
        Scan for devices
      </Button>
      {devices ? (
        devices.map(device => (
          <Card key={device.id}>
            <Card.Title title={device.name} />
            <Card.Content>
              <Button
                onPress={() => connectToCube(device)}
                mode="contained-tonal"
                icon="bluetooth">
                Connect
              </Button>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No smartcubes found!</Text>
      )}
    </SafeAreaView>
  );
}
