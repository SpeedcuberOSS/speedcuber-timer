// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { NativeEventEmitter, NativeModules } from 'react-native';

import BleManager from 'react-native-ble-manager';

BleManager.start({ showAlert: false });
const BleEventEmitter = new NativeEventEmitter(NativeModules.BleManager);

export function isBluetoothEnabled(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const subscription = BleEventEmitter.addListener(
      'BleManagerDidUpdateState',
      ({ state }) => {
        resolve(state === 'on');
        subscription.remove();
      },
    );
    BleManager.checkState();
  });
}
