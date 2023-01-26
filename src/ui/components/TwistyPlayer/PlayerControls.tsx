// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { IconButton, useTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from '../../icons/iconHelper';
import Slider from '@react-native-community/slider';

const FRAME_RATE = 60;
const INTERVAL = 1000 / FRAME_RATE;

interface PlayerControlsProps {
  /**
   * The max duration of the player in milliseconds
   */
  duration: number;
  /**
   * Called whenever the player seeks to a new timestamp.
   *  - Automatically via playing the timer
   *  - Manually via dragging the slider
   *  - Manually via the forward/backward/start/finish buttons
   * @param timestamp the current timestamp in milliseconds
   */
  onSeek: (timestamp: number) => void;
}

export default function PlayerControls({
  duration,
  onSeek,
}: PlayerControlsProps) {
  const theme = useTheme();
  const [sliderValue, setSliderValue] = useState(0);
  const [playing, setPlaying] = useState<Date | null>(null);
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        const elapsedMillies = new Date().getTime() - playing.getTime();
        if (elapsedMillies >= duration) {
          setPlaying(null);
        }
        setTimestamp(elapsedMillies);
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [playing, sliderValue]);

  function togglePlaying() {
    if (playing) {
      setPlaying(null);
    } else if (sliderValue >= duration) {
      setTimestamp(0);
      setPlaying(new Date());
    } else {
      seekToTimestamp(sliderValue, new Date());
    }
  }

  function seekToTimestamp(timestamp: number, startPlaying = playing) {
    let boundedTimestamp = Math.min(duration, Math.max(0, timestamp));
    setTimestamp(boundedTimestamp);
    if (startPlaying) {
      setPlaying(new Date(new Date().getTime() - boundedTimestamp));
    }
  }

  function setTimestamp(timestamp: number) {
    setSliderValue(timestamp);
    onSeek(timestamp);
  }

  return (
    <>
      <Slider
        maximumValue={duration}
        value={sliderValue}
        onValueChange={value => seekToTimestamp(value)}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.onBackground}
      />
      <View style={styles.playerControls}>
        <IconButton
          icon={Icons.Entypo('controller-jump-to-start')}
          onPress={() => seekToTimestamp(0)}
        />
        <IconButton
          icon={Icons.Entypo('controller-fast-backward')}
          onPress={() => seekToTimestamp(sliderValue - 1000)}
        />
        <IconButton
          icon={
            playing
              ? Icons.Entypo('controller-paus')
              : Icons.Entypo('controller-play')
          }
          onPress={togglePlaying}
        />
        <IconButton
          icon={Icons.Entypo('controller-fast-forward')}
          onPress={() => seekToTimestamp(sliderValue + 1000)}
        />
        <IconButton
          icon={Icons.Entypo('controller-next')}
          onPress={() => seekToTimestamp(duration)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
