// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import 'jest';

let MOCK_PERMISSIONS_CHECK_RESPONSE = true;
let MOCK_PERMISSIONS_REQUEST_RESPONSE = 'granted';

function setMockPermissionsCheckResponse(response: boolean) {
  MOCK_PERMISSIONS_CHECK_RESPONSE = response;
}

function setMockPermissionsRequestResponse(response: string) {
  MOCK_PERMISSIONS_REQUEST_RESPONSE = response;
}

let mockPermissionsCheck = jest
  .fn()
  .mockName('[MOCK] PermissionsAndroid.check')
  .mockImplementation(
    () => new Promise(resolve => resolve(MOCK_PERMISSIONS_CHECK_RESPONSE)),
  );
let mockPermissionsRequest = jest
  .fn()
  .mockName('[MOCK] PermissionsAndroid.request')
  .mockImplementation(
    () => new Promise(resolve => resolve(MOCK_PERMISSIONS_REQUEST_RESPONSE)),
  );

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => {
    const PermissionsAndroid = jest.requireActual(
      'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
    );
    console.log(PermissionsAndroid);
    return {
      ...PermissionsAndroid,
      check: mockPermissionsCheck,
      request: mockPermissionsRequest,
    };
  },
);

export {
  setMockPermissionsCheckResponse,
  setMockPermissionsRequestResponse,
  mockPermissionsCheck,
  mockPermissionsRequest,
};
