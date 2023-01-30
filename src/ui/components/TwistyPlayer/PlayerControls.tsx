// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { IconButton, Text, useTheme } from 'react-native-paper';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from '../../icons/iconHelper';
import Slider from '@react-native-community/slider';
import formatElapsedTime from '../../utils/formatElapsedTime';

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

function elapsedMillies(since: Date) {
  return new Date().getTime() - since.getTime();
}

function millisAgo(millis: number) {
  return new Date(new Date().getTime() - millis);
}

function PlayerControls({ duration, onSeek }: PlayerControlsProps) {
  const theme = useTheme();
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [startedPlayingAt, setStartedPlayingAt] = useState<Date | null>(null);
  const IS_PLAYING = startedPlayingAt !== null;

  useEffect(() => {
    if (IS_PLAYING) {
      const interval = setInterval(() => {
        const elapsed = elapsedMillies(startedPlayingAt!);
        seekToTimestamp(elapsed);
        if (elapsed >= duration) {
          onPause();
        }
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [startedPlayingAt, currentTimestamp]);

  function seekToTimestamp(timestamp: number) {
    let boundedTimestamp = Math.min(duration, Math.max(0, timestamp));
    setCurrentTimestamp(boundedTimestamp);
    if (IS_PLAYING) {
      setStartedPlayingAt(millisAgo(boundedTimestamp));
    }
    setTimeout(() => onSeek(boundedTimestamp), 0); // Schedule client function to run after the current render
  }

  function onScrub(newTimestamp: number) {
    console.debug('scrub');
    seekToTimestamp(newTimestamp);
  }

  function onJumpToStart() {
    console.debug('jump to start');
    seekToTimestamp(0);
  }

  function onJumpBackward() {
    console.debug('jump backward');
    seekToTimestamp(currentTimestamp - 1000);
  }

  function onPlay() {
    console.debug('play');
    const nextTimestamp = currentTimestamp >= duration ? 0 : currentTimestamp;
    seekToTimestamp(nextTimestamp);
    setStartedPlayingAt(millisAgo(nextTimestamp));
  }

  function onPause() {
    console.debug('pause');
    setStartedPlayingAt(null);
  }

  function onJumpForward() {
    console.debug('jump forward');
    seekToTimestamp(currentTimestamp + 1000);
  }

  function onJumpToEnd() {
    console.debug('jump to end');
    seekToTimestamp(duration);
  }

  return (
    <>
      <View style={styles.timeControls}>
        <Text variant="labelSmall" style={styles.time}>
          {formatElapsedTime(new Date(currentTimestamp))}
        </Text>
        <Slider
          maximumValue={duration}
          value={currentTimestamp}
          onValueChange={onScrub}
          style={styles.slider}
          thumbTintColor={theme.colors.primary}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.onBackground}
        />
        <Text variant="labelSmall" style={styles.time}>
          {formatElapsedTime(new Date(duration))}
        </Text>
      </View>
      <View style={styles.playerControls}>
        <IconButton
          icon={Icons.Entypo('controller-jump-to-start')}
          onPress={onJumpToStart}
        />
        <IconButton
          icon={Icons.Entypo('controller-fast-backward')}
          onPress={onJumpBackward}
        />
        <IconButton
          icon={
            IS_PLAYING
              ? Icons.Entypo('controller-paus')
              : Icons.Entypo('controller-play')
          }
          onPress={IS_PLAYING ? onPause : onPlay}
        />
        <IconButton
          icon={Icons.Entypo('controller-fast-forward')}
          onPress={onJumpForward}
        />
        <IconButton
          icon={Icons.Entypo('controller-next')}
          onPress={onJumpToEnd}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

export default memo(PlayerControls);
