// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Permission, PermissionsAndroid, Platform } from 'react-native';
import { SmartPuzzleError, SmartPuzzleErrorCode } from './SmartPuzzleError';

import BLE from './BLE';
import LocationStatus from './LocationStatus';
import { t } from 'i18next';

export async function ensureScanningReady() {
  if (Platform.OS === 'android') {
    if (Platform.Version <= 30) {
      await ensureLocationPermissionGranted();
      await ensureLocationEnabled();
    }
  }
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
            t('location.denied'),
          );
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          throw new SmartPuzzleError(
            SmartPuzzleErrorCode.LOCATION_PERMISSION_NEVER_ASK_AGAIN,
            t('location.never_ask_again'),
          );
        case PermissionsAndroid.RESULTS.GRANTED:
          return; // We have the required permission!
        default:
          throw new Error(t('location.unexpected_result', { result: result }));
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
    throw new Error(t('error.permissions_check', { error: err }));
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
      title: t('location.request_title'),
      message: t('location.request_rationale'),
      buttonPositive: t('common.ok'),
    });
    console.debug(`Location permission request result: ${result}`);
    return result;
  } catch (err) {
    throw new Error(t('location.error_request', { error: err }));
  }
}

function getRequiredLocationPermissionForDevice() {
  let requiredPermission = null;
  if (Platform.OS === 'android') {
    if (23 <= Platform.Version && Platform.Version < 29) {
      requiredPermission =
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
    }
    if (29 <= Platform.Version && Platform.Version < 31) {
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
              t('bluetooth.denied'),
            );
          case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
            throw new SmartPuzzleError(
              SmartPuzzleErrorCode.BLUETOOTH_PERMISSION_NEVER_ASK_AGAIN,
              t('bluetooth.never_ask_again'),
            );
          case PermissionsAndroid.RESULTS.GRANTED:
            return; // We have the required permission!
          default:
            throw new Error(
              t('bluetooth.unexpected_result', { result: result }),
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
    throw new Error(t('bluetooth.error_request', { error: err }));
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
        t('location.disabled'),
      );
    }
  }
}

async function ensureBluetoothEnabled() {
  console.debug('Checking if Bluetooth is enabled...');
  let enabled = await BLE.isEnabled();
  console.debug(`Bluetooth enabled: ${enabled}`);
  if (!enabled) {
    throw new SmartPuzzleError(
      SmartPuzzleErrorCode.BLUETOOTH_DISABLED,
      t('bluetooth.disabled'),
    );
  }
}
