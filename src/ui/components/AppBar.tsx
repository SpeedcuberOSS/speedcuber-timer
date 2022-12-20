// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Appbar, Button } from 'react-native-paper';

import Icons from '../icons/iconHelper';
import React from 'react';

export default function AppBar() {
  return (
    <Appbar.Header elevated={true}>
      {/* @ts-ignore */}
      <Appbar.Action
        icon="menu"
        onPress={() => console.log('PLACEHOLDER: Menu pressed')}
      />
      {/* @ts-ignore */}
      <Appbar.Content
        style={{ paddingTop: 8 }}
        title={
          <Button icon={Icons.WCAEvent('333bf')} mode="contained-tonal">
            3x3x3 Blindfolded
          </Button>
        }
        onPress={() =>
          console.log('PLACEHOLDER: Title pressed')
        }></Appbar.Content>
      {/* @ts-ignore */}
      <Appbar.Action
        icon="bluetooth"
        onPress={() => console.log('PLACEHOLDER: Bluetooth pressed')}
      />
    </Appbar.Header>
  );
}
