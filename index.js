// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AppRegistry, LogBox } from 'react-native';

import { IS_STORYBOOK } from './envs/_env.json';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
LogBox.ignoreLogs(['Require cycle: node_modules\\victory']);

console.log(`Is Storybook: ${IS_STORYBOOK}`);
const App = IS_STORYBOOK
  ? require('./storybook').default
  : require('./src/ui/App').default;
console.log(`App: ${Object.keys(App)}`);
AppRegistry.registerComponent(appName, () => App);
