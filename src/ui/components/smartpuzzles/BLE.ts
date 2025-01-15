// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import BleManager from 'react-native-ble-manager';
import { Platform } from 'react-native';

BleManager.start();

export async function isEnabled(): Promise<boolean> {
  let state = await BleManager.checkState();
  if (state === Platform.select({ android: 'turning_on', ios: 'unknown' })) {
    // wait a bit for it to finish turning on.
    return new Promise((resolve) => {
      setTimeout(async () => {
        state = await BleManager.checkState();
        resolve(state === 'on')
      }, 250)
    })
  } else {
    return state === 'on';
  }
}

const BLE = {
  Manager: BleManager,
  isEnabled,
}

export default BLE;