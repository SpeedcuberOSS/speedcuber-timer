// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, ConnectionStatus } from '../../lib/bluetooth-puzzle';
import React, { useState } from 'react';

import SmartPuzzleScanner from './SmartPuzzleScanner';
import TwistyPlayer from './TwistyPlayer';
import VerticalSplit from '../structure/VerticalSplit';
import useSmartPuzzles from '../utils/bluetooth/useSmartPuzzles';

export default function SmartPuzzlePlayground() {
  const { puzzles } = useSmartPuzzles();
  const [puzzle, setPuzzle] = useState<BluetoothPuzzle>();
  puzzles.forEach(p => {
    p?.addConnectionStatusListener(status => {
      console.debug('Watching connection status:' + p.name());
      if (status === ConnectionStatus.CONNECTED) {
        console.debug('Playing with ' + p.name());
        setPuzzle(p);
      }
    });
  }, 'SmartPuzzlePlayground');
  return (
    <>
      <VerticalSplit
        top={<SmartPuzzleScanner />}
        bottom={<TwistyPlayer bluetoothPuzzle={puzzle} />}
      />
    </>
  );
}
