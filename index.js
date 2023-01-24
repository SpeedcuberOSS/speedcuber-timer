// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import App from './src/ui/App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { suppressKnownWarnings } from './src/ui/utils/suppressKnownWarnings';

suppressKnownWarnings();

AppRegistry.registerComponent(appName, () => App);
