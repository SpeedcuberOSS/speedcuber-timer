// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';
import { Text, useTheme } from 'react-native-paper';

import { Pressable } from 'react-native';

interface SpeedSelectorProps {
  onSpeedChange: (speed: number) => void;
}

type Speed = '1/8x' | '1/4x' | '1/2x' | '1x' | '2x';

const SPEED_LABELS: Speed[] = ['1/8x', '1/4x', '1/2x', '1x', '2x'];
const SPEEDS: { [key in Speed]: number } = {
  '1/8x': 0.125,
  '1/4x': 0.25,
  '1/2x': 0.5,
  '1x': 1,
  '2x': 2,
};

export default function SpeedSelector({
  onSpeedChange = (_speed: number) => {},
}: SpeedSelectorProps) {
  const theme = useTheme();
  const [speedIdx, setSpeedIdx] = useState(3);
  return (
    <Pressable
      onPress={() => {
        const nextIdx = (speedIdx + 1) % SPEED_LABELS.length;
        setSpeedIdx(nextIdx);
        onSpeedChange(SPEEDS[SPEED_LABELS[nextIdx]]);
      }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        variant="bodySmall"
        numberOfLines={1}
        style={{
          color: theme.colors.primary,
        }}>
        {SPEED_LABELS[speedIdx]}
      </Text>
    </Pressable>
  );
}
