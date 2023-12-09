// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { IconButton, Text } from 'react-native-paper';
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';

import Icons from '../../icons/iconHelper';

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
  transform?: (value: number) => JSX.Element | string;
  onChange?: (value: number) => void;
  valueStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  orientation?: Direction;
  iconOrientation?: Direction;
}

const flexFor: { [D in Direction]: FlexDirection } = {
  horizontal: 'row',
  vertical: 'column',
};
const firstIconFor: { [D in Direction]: { [D in Direction]: string } } = {
  vertical: {
    horizontal: 'chevron-right',
    vertical: 'chevron-up',
  },
  horizontal: {
    horizontal: 'chevron-left',
    vertical: 'chevron-down',
  },
};
const firstIconEffectFor: { [D in Direction]: TickEffect } = {
  horizontal: 'decrement',
  vertical: 'increment',
};
const secondIconFor: { [D in Direction]: { [D in Direction]: string } } = {
  vertical: {
    horizontal: 'chevron-left',
    vertical: 'chevron-down',
  },
  horizontal: {
    horizontal: 'chevron-right',
    vertical: 'chevron-up',
  },
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
  transform = value => value.toString(),
  onChange = () => {},
  valueStyle = {},
  iconStyle = {},
  orientation = 'vertical',
  iconOrientation = 'vertical',
}: TickerProps) {
  const init = Math.min(max, Math.max(min, initialValue));
  const [value, setValue] = useState(init);
  useEffect(() => setValue(init), [initialValue]);
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
  const transformedValue = min <= max ? transform(value) : '-';
  const Content =
    typeof transformedValue === 'string' ? (
      <Text
        style={{
          minWidth: 20,
          textAlign: 'center',
          textAlignVertical: 'center',
          fontVariant: ['tabular-nums'],
        }}>
        {transformedValue}
      </Text>
    ) : (
      transformedValue
    );
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: flexFor[orientation],
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onTouchEnd={e => e.stopPropagation()}>
        <IconButton
          style={iconStyle}
          disabled={disabled[firstIconEffectFor[orientation]]}
          icon={Icons.Entypo(firstIconFor[orientation][iconOrientation])}
          onPress={effects[firstIconEffectFor[orientation]]}
        />
        <View style={valueStyle}>{Content}</View>
        <IconButton
          style={iconStyle}
          disabled={disabled[secondIconEffectFor[orientation]]}
          icon={Icons.Entypo(secondIconFor[orientation][iconOrientation])}
          onPress={effects[secondIconEffectFor[orientation]]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
