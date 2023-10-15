// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';
import formatElapsedTime from '../../utils/formatElapsedTime';

interface TimeSliderProps {
  duration: number;
  currentTimestamp: number;
  onScrubStart: () => void;
  onScrub: (timestamp: number) => void;
  onScrubEnd: () => void;
}

export default function TimeSlider({
  duration,
  currentTimestamp,
  onScrubStart,
  onScrub,
  onScrubEnd,
}: TimeSliderProps) {
  const theme = useTheme();
  return (
    <View style={styles.timeControls}>
      <Text variant="labelSmall" style={styles.time}>
        {formatElapsedTime(currentTimestamp)}
      </Text>
      <Slider
        maximumValue={duration}
        value={currentTimestamp}
        onSlidingStart={onScrubStart}
        onValueChange={onScrub}
        onSlidingComplete={onScrubEnd}
        style={styles.slider}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.onBackground}
      />
      <Text variant="labelSmall" style={styles.time}>
        {formatElapsedTime(duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slider: {
    flex: 4,
  },
  time: {
    flex: 1,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
});
