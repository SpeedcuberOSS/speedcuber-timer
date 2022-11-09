// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import App from './src/ui/App';
import { AppRegistry } from 'react-native';
import Constants from 'expo-constants';
import { IS_STORYBOOK } from './envs/_env.json';
import { THREE } from 'expo-three';
import { name as appName } from './app.json';
import { suppressKnownWarnings } from './src/ui/utils/suppressKnownWarnings';

// import Storybook from './storybook';

/**
 * Due to some issues with the Metro bundler you may need to manually
 * define the global instance of Three.js. This is important because
 * three.js doesn't fully use ECMAScript but rather mutates a single
 * global instance of THREE with side-effects.
 *
 * https://www.npmjs.com/package/expo-three#user-content-usage
 */
global.THREE = global.THREE || THREE;

console.log('Expo Constants: ' + Constants.systemFonts);

suppressKnownWarnings();

AppRegistry.registerComponent(appName, () => (IS_STORYBOOK ? App : App));
