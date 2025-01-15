// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/__mocks__/globalMock.js',
  ],

  // From: https://stackoverflow.com/a/73203803/14765128
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because
    // Jest does not support package.json.exports. See
    // https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    // Mock out font files that aren't available to Jest
    // https://github.com/oblador/react-native-vector-icons/issues/1681#issuecomment-2585560725
    '\\.(ttf)$': '<rootDir>/src/__mocks__/file-mock.js',
  },
};
