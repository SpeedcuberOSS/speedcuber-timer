import {
  isBluetoothAccessAllowed,
  isCoarseLocationAccessAllowed,
} from '../permissions';
import {
  mockPermissionsCheck,
  setMockPermissionsCheckResponse,
} from '../__mocks__/PermissionsAndroidMock';

// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { PermissionsAndroid } from 'react-native';

describe('Smartcube Permissions', () => {
  describe('Location Permissions', () => {
    it('Reports Coarse Location Access if enabled', async () => {
      setMockPermissionsCheckResponse(true);
      expect(await isCoarseLocationAccessAllowed()).toEqual(true);
      expect(mockPermissionsCheck).toHaveBeenLastCalledWith(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    });
    it('Reports Coarse Location Access if disabled', async () => {
      setMockPermissionsCheckResponse(false);
      expect(await isCoarseLocationAccessAllowed()).toEqual(false);
      expect(mockPermissionsCheck).toHaveBeenLastCalledWith(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    });
  });
  describe('Bluetooth Permissions', () => {
    it('Reports Bluetooth Access if enabled', async () => {
      setMockPermissionsCheckResponse(true);
      mockPermissionsCheck.mockClear();

      expect(await isBluetoothAccessAllowed()).toEqual(true);

      expect(mockPermissionsCheck).toHaveBeenCalledTimes(2);
      expect(mockPermissionsCheck).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      expect(mockPermissionsCheck).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );
    });
    it('Reports Bluetooth Access if disabled', async () => {
      setMockPermissionsCheckResponse(false);
      mockPermissionsCheck.mockClear();

      expect(await isBluetoothAccessAllowed()).toEqual(false);

      expect(mockPermissionsCheck).toHaveBeenCalledTimes(1);
      expect(mockPermissionsCheck).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      // Skipped by short-circuiting
      // expect(mockPermissionsCheck).toHaveBeenCalledWith(
      //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      // );
    });
  });
});
