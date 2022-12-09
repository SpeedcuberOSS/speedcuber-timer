// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { PermissionsAndroid } from 'react-native';

async function isLocationAccessAllowed(): Promise<boolean> {
  console.debug('Checking location access');
  return await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
}
async function requestLocationAccess(): Promise<boolean> {
  console.debug('Requesting location access');
  return (
    (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message:
          'Scanning for bluetooth devices (e.g. smartcubes) requires location access.',
        buttonPositive: 'OK',
      },
    )) === PermissionsAndroid.RESULTS.GRANTED
  );
}
async function isBluetoothAccessAllowed(): Promise<boolean> {
  console.debug('Checking bluetooth access');
  return (
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    )) &&
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ))
  );
}
export {
  isLocationAccessAllowed,
  requestLocationAccess,
  isBluetoothAccessAllowed,
};
