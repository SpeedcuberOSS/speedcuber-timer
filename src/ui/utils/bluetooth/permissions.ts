// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { PermissionsAndroid } from 'react-native';

async function isCoarseLocationAccessAllowed(): Promise<boolean> {
  return await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  );
}
async function isBluetoothAccessAllowed(): Promise<boolean> {
  return (
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    )) &&
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ))
  );
}
export { isCoarseLocationAccessAllowed, isBluetoothAccessAllowed };
