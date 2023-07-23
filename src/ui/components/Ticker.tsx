// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { IconButton, Text } from 'react-native-paper';
import { useState } from 'react';
import Icons from '../icons/iconHelper';
import { TouchableWithoutFeedback, View } from 'react-native';

type Direction = 'horizontal' | 'vertical';
type TickEffect = 'increment' | 'decrement';
type FlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | undefined;
interface TickerProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  orientation?: Direction;
}

const flexFor: { [D in Direction]: FlexDirection } = {
  horizontal: 'row',
  vertical: 'column',
};
const firstIconFor: { [D in Direction]: string } = {
  horizontal: 'chevron-down',
  vertical: 'chevron-up',
};
const firstIconEffectFor: { [D in Direction]: TickEffect } = {
  horizontal: 'decrement',
  vertical: 'increment',
};
const secondIconFor: { [D in Direction]: string } = {
  horizontal: 'chevron-up',
  vertical: 'chevron-down',
};
const secondIconEffectFor: { [D in Direction]: TickEffect } = {
  horizontal: 'increment',
  vertical: 'decrement',
};

export default function Ticker({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange = () => {},
  orientation: direction = 'vertical',
}: TickerProps) {
  const [value, setValue] = useState(
    Math.min(max, Math.max(min, initialValue)),
  );
  const handleTick = (value: number) => {
    setValue(value);
    onChange(value);
  };
  const effects = {
    increment: () => handleTick(Math.min(max, value + step)),
    decrement: () => handleTick(Math.max(min, value - step)),
  };
  const disabled = {
    increment: value >= max,
    decrement: value <= min,
  };
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: flexFor[direction],
          alignItems: 'center',
          justifyContent: 'center',
          margin: -14,
        }}
        onTouchEnd={e => e.stopPropagation()}>
        <IconButton
          disabled={disabled[firstIconEffectFor[direction]]}
          icon={Icons.Entypo(firstIconFor[direction])}
          onPress={effects[firstIconEffectFor[direction]]}
        />
        <Text
          style={{
            minWidth: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontVariant: ['tabular-nums'],
          }}>
          {min <= max ? value : '-'}
        </Text>
        <IconButton
          disabled={disabled[secondIconEffectFor[direction]]}
          icon={Icons.Entypo(secondIconFor[direction])}
          onPress={effects[secondIconEffectFor[direction]]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
