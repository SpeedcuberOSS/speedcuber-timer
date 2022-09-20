// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { scanBluetooth } from '../utils/bluetooth';

export default function PlayScreen() {
  return (
    <SafeAreaView>
      <Button onPress={scanBluetooth} mode="contained-tonal" icon="bluetooth">
        Scan for devices
      </Button>
    </SafeAreaView>
  );
}
