// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, View } from 'react-native';

import PlayerControls from './PlayerControls';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

storiesOf('PlayerControls', module).add('default', () => (
  <>
    <View style={{ flex: 1 }} />
    <PlayerControls duration={15000} onSeek={console.debug} />
  </>
));
