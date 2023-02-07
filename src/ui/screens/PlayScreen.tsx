// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, View } from 'react-native';

import { Attempt } from '../../lib/stif';
import AttemptPlayer from '../components/TwistyPlayer/AttemptPlayer';
import React from 'react';

const attempt =
  require('../../lib/bluetooth-puzzle/__fixtures__/particula_3x3x3_attempt.json') as Attempt;

export default function PlayScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Button
        onPress={() => console.log(JSON.stringify(getLibrary().getAll()))}>
        Print Attempt Library
      </Button>
      */}
      <AttemptPlayer attempt={attempt} />
    </SafeAreaView>
  );
}
