// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface PaginationItemProps {
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
}

export default function PaginationItem({
  animValue,
  index,
  length,
}: PaginationItemProps) {
  const theme = useTheme();
  const width = 5;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        width: width,
        height: width,
        borderRadius: 50,
        marginHorizontal: 2,
        overflow: 'hidden',
        transform: [{ rotateZ: '0deg' }],
      }}>
      <Animated.View
        style={[
          {
            flex: 1,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
          },
          animStyle,
        ]}
      />
    </View>
  );
}
