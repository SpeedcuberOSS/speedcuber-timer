// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: View,
  };
});

jest.mock('react-native-ble-manager');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

import * as actualfs from '@dr.pogodin/react-native-fs';
jest.mock('@dr.pogodin/react-native-fs', () => ({
  DocumentDirectoryPath: 'DocumentDirectoryPath',
  ExternalDirectoryPath: 'ExternalDirectoryPath',
  appendFile: jest.fn(),
  copyFile: jest.fn(),
  exists: jest.fn(),
  mkdir: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn(),
  writeFile: jest.fn(),
}));
export const fs = jest.mocked(actualfs);