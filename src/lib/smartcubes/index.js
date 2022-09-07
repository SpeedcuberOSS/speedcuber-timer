// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager } from 'react-native-ble-plx';

let manager = new BleManager();

function getBleManager() {
  return manager;
}

function scanBluetooth() {
  console.log('Scanning Bluetooth');
  getBleManager().onStateChange(state => console.log(state), true);
}

export { scanBluetooth };
