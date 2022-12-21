// Copyright (c) 2022 Joseph Hale <me@jhale.dev>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, ConnectionStatus } from '../../lib/bluetooth-puzzle';
import React, { useState } from 'react';

import ActivePuzzlePlayer from '../components/ActivePuzzlePlayer';
import { SafeAreaView } from 'react-native';
import useSmartPuzzles from '../utils/bluetooth/useSmartPuzzles';

export default function LearnScreen() {
  const { puzzles } = useSmartPuzzles();
  const [puzzle, setPuzzle] = useState<BluetoothPuzzle>();
  puzzles.forEach(p => {
    p?.addConnectionStatusListener(status => {
      console.debug('Watching connection status:' + p.name());
      if (status === ConnectionStatus.CONNECTED) {
        setPuzzle(p);
      }
    });
  }, 'LearnScreen');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivePuzzlePlayer />
    </SafeAreaView>
  );
}
