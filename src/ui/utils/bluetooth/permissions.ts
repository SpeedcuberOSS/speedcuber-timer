// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Permission, PermissionsAndroid, Platform } from 'react-native';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import LocationStatus from './LocationStatus';
import { isBluetoothEnabled } from '.';

export async function ensureScanningReady() {
  await ensureLocationPermissionGranted();
  await ensureLocationEnabled();
  await ensureBluetoothPermissionGranted();
  await ensureBluetoothEnabled();
}

async function ensureLocationPermissionGranted() {
  let requiredPermission = getRequiredLocationPermissionForDevice();
  if (requiredPermission) {
    let granted = await checkPermission(requiredPermission);
    if (!granted) {
      let result = await requestLocationPermission(requiredPermission);
      switch (result) {
        case PermissionsAndroid.RESULTS.DENIED:
          throw new SmartPuzzleError(
            SmartPuzzleErrorCode.LOCATION_PERMISSION_DENIED,
            'Location permission denied. Please grant location permissions to use smart puzzles.',
          );
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          throw new SmartPuzzleError(
            SmartPuzzleErrorCode.LOCATION_PERMISSION_NEVER_ASK_AGAIN,
            "Location permission denied. Please grant location permissions in your device's settings to use smart puzzles.",
          );
        case PermissionsAndroid.RESULTS.GRANTED:
          return; // We have the required permission!
        default:
          throw new Error(
            `Unexpected location permission request result: ${result}`,
          );
      }
    }
  }
}

async function checkPermission(permission: Permission) {
  console.debug(`Checking permission: ${permission}`);
  try {
    var result = await PermissionsAndroid.check(permission);
    console.debug(`Permission (${permission}) check result: ${result}`);
    return result;
  } catch (err) {
    throw new Error(`Unknown error while checking permission: ${err}`);
  }
}

async function checkPermissions(permissions: Permission[]) {
  let checks = permissions.map(
    async permission => await checkPermission(permission),
  );
  let results = Promise.all(checks);
  return (await results).every(r => r === true);
}

async function requestLocationPermission(requiredPermission: Permission) {
  console.debug(`Requesting location permission: ${requiredPermission}`);
  try {
    let result = await PermissionsAndroid.request(requiredPermission, {
      title: 'Location Access Required',
      message:
        'Speedcuber Timer needs location permissions to find smart puzzles near you.',
      buttonPositive: 'OK',
    });
    console.debug(`Location permission request result: ${result}`);
    return result;
  } catch (err) {
    throw new Error(
      `Unknown error while requesting Location permissions: ${err}`,
    );
  }
}

function getRequiredLocationPermissionForDevice() {
  let requiredPermission = null;
  if (Platform.OS === 'android') {
    if (Platform.Version >= 23) {
      requiredPermission =
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
    }
    if (Platform.Version >= 29) {
      requiredPermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    }
  }
  return requiredPermission;
}

async function ensureBluetoothPermissionGranted() {
  let requiredPermissions = getRequiredBluetoothPermissionsForDevice();
  if (requiredPermissions) {
    let granted = await checkPermissions(requiredPermissions);
    if (!granted) {
      let result = await requestBluetoothPermissions(requiredPermissions);
      requiredPermissions.forEach(permission => {
        switch (result[permission]) {
          case PermissionsAndroid.RESULTS.DENIED:
            throw new SmartPuzzleError(
              SmartPuzzleErrorCode.BLUETOOTH_PERMISSION_DENIED,
              'Bluetooth permission denied. Please grant Bluetooth permissions to use smart puzzles.',
            );
          case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
            throw new SmartPuzzleError(
              SmartPuzzleErrorCode.BLUETOOTH_PERMISSION_NEVER_ASK_AGAIN,
              "Bluetooth permission denied. Please grant Bluetooth permissions in your device's settings to use smart puzzles.",
            );
          case PermissionsAndroid.RESULTS.GRANTED:
            return; // We have the required permission!
          default:
            throw new Error(
              `Unexpected Bluetooth permission request result: ${result}`,
            );
        }
      });
    }
  }
}

function getRequiredBluetoothPermissionsForDevice() {
  let requiredPermissions: Permission[] = [];
  if (Platform.OS === 'android') {
    if (Platform.Version >= 31) {
      requiredPermissions = [
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ];
    }
  }
  return requiredPermissions;
}

async function requestBluetoothPermissions(permissions: Permission[]) {
  console.debug(`Requesting Bluetooth permissions: ${permissions}`);
  try {
    var result = await PermissionsAndroid.requestMultiple(permissions);
    console.debug(
      `Bluetooth permission request result: ${JSON.stringify(result)}`,
    );
    return result;
  } catch (err) {
    throw new Error(
      `Unknown error while requesting Bluetooth permissions: ${err}`,
    );
  }
}

async function ensureLocationEnabled() {
  if (Platform.OS === 'android') {
    console.debug('Checking if location is enabled...');
    let enabled = await LocationStatus.isLocationEnabled();
    console.debug(`Location enabled: ${enabled}`);
    if (!enabled) {
      throw new SmartPuzzleError(
        SmartPuzzleErrorCode.LOCATION_DISABLED,
        'Location is turned off. Please enable location to find nearby smart puzzles.',
      );
    }
  }
}

async function ensureBluetoothEnabled() {
  console.debug('Checking if Bluetooth is enabled...');
  let enabled = await isBluetoothEnabled();
  console.debug(`Bluetooth enabled: ${enabled}`);
  if (!enabled) {
    throw new SmartPuzzleError(
      SmartPuzzleErrorCode.BLUETOOTH_DISABLED,
      'Bluetooth is turned off. Please enable Bluetooth to connect to smart puzzles.',
    );
  }
}
