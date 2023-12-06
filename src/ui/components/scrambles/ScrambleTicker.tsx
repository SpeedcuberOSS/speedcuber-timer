// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Algorithm from './Algorithm';
import ScrambleHeader from './ScrambleHeader';
import { ScramblesProps } from './Scrambles';
import SmartPuzzleSelectorModal from '../smartpuzzles/SmartPuzzleSelectorModal';
import Ticker from '../ticker/Ticker';
import { View } from 'react-native';
import { useState } from 'react';

interface ScrambleTickerProps extends ScramblesProps {}

export default function ScrambleTicker({
  scrambles = [],
  layoutHeightLimit,
}: ScrambleTickerProps) {
  const [idx, setIdx] = useState(0);
  const [tickerHeight, setTickerHeight] = useState(0);
  const [showSmartPuzzleSelector, setShowSmartPuzzleSelector] = useState(false);
  function mapToHeader(idx: number) {
    return idx < scrambles.length ? (
      <ScrambleHeader
        puzzle={scrambles[idx].puzzle}
        smartPuzzle={scrambles[idx].smartPuzzle}
        positioning={[idx + 1, scrambles.length]}
        onRequestSmartPuzzleLink={() => setShowSmartPuzzleSelector(true)}
      />
    ) : (
      <></>
    );
  }
  return (
    <>
      <View
        onLayout={event => setTickerHeight(event.nativeEvent.layout.height)}>
        <Ticker
          min={0}
          max={Math.max(scrambles.length - 1, 0)}
          orientation="horizontal"
          onChange={setIdx}
          valueStyle={{ maxWidth: '80%' }}
          iconOrientation="horizontal"
          transform={mapToHeader}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <Algorithm
          algorithm={scrambles[idx]?.algorithm}
          layoutHeightLimit={(layoutHeightLimit ?? Infinity) - tickerHeight}
        />
      </View>
      <SmartPuzzleSelectorModal
        scrambles={scrambles}
        idx={idx}
        visible={showSmartPuzzleSelector}
        onDismiss={() => {
          setShowSmartPuzzleSelector(false);
        }}
      />
    </>
  );
}
