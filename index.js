// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AppRegistry, LogBox } from 'react-native';

import App from './src/ui/App';
import { IS_STORYBOOK } from './envs/_env.json';
import Storybook from './storybook';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
LogBox.ignoreLogs(['Require cycle: node_modules\\victory']);

console.log(`Is Storybook: ${IS_STORYBOOK}`);
const RuntimeApp = IS_STORYBOOK ? Storybook : App;
console.log(`App: ${Object.keys(RuntimeApp)}`);
AppRegistry.registerComponent(appName, () => RuntimeApp);
