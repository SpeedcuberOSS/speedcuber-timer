// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { IconButton, Text, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';

import CenteredBetweenSidebars from '../../structure/CenteredBetweenSidebars';
import Icons from '../../icons/iconHelper';
import Slider from '@react-native-community/slider';
import formatElapsedTime from '../../utils/formatElapsedTime';
import throttle from 'lodash/throttle';

function elapsedMillies(since: Date) {
  return new Date().getTime() - since.getTime();
}

function millisAgo(millis: number, speed?: number) {
  const speedMultiplier = speed ? speed : 1;
  const adjustedMillisAgo = millis * speedMultiplier;
  return new Date(new Date().getTime() - adjustedMillisAgo);
}

function intervalAtFPS(fps: number) {
  return 1000 / fps;
}

interface PlayerButtonsProps {
  isPlaying: boolean;
  onJumpToStart: () => void;
  onJumpBackward: () => void;
  onPlay: () => void;
  onPause: () => void;
  onJumpForward: () => void;
  onJumpToEnd: () => void;
}

function PlayerButtons({
  isPlaying,
  onJumpToStart,
  onJumpBackward,
  onPlay,
  onPause,
  onJumpForward,
  onJumpToEnd,
}: PlayerButtonsProps) {
  return (
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
          isPlaying
            ? Icons.Entypo('controller-paus')
            : Icons.Entypo('controller-play')
        }
        animated={true}
        onPress={isPlaying ? onPause : onPlay}
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
  );
}

interface TimeSliderProps {
  duration: number;
  currentTimestamp: number;
  onScrubStart: () => void;
  onScrub: (timestamp: number) => void;
  onScrubEnd: () => void;
}

function TimeSlider({
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
        {formatElapsedTime(new Date(currentTimestamp))}
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
        {formatElapsedTime(new Date(duration))}
      </Text>
    </View>
  );
}

interface SpeedSelectorProps {
  onSpeedChange: (speed: number) => void;
}

const SPEED_LABELS = ['1/16x', '1/8x', '1/4x', '1/2x', '1x', '2x', '4x'];
const SPEEDS = {
  '1/16x': 0.0625,
  '1/8x': 0.125,
  '1/4x': 0.25,
  '1/2x': 0.5,
  '1x': 1,
  '2x': 2,
  '4x': 4,
};

function SpeedSelector({
  onSpeedChange = (_speed: number) => {},
}: SpeedSelectorProps) {
  const theme = useTheme();
  const [speedIdx, setSpeedIdx] = useState(4);
  return (
    <Pressable
      onPress={() => {
        const nextIdx = (speedIdx + 1) % SPEED_LABELS.length;
        setSpeedIdx(nextIdx);
        // @ts-ignore
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
  /**
   * The rate at which onSeek is called when playing the timer.
   *
   * Defaults to 60fps
   */
  refreshRate?: number;
  /**
   * The number of milliseconds to jump forward/backward when using the
   * forward/backward buttons.
   *
   * Defaults to 1000ms (1 second)
   */
  jumpMillis?: number;
}

function PlayerControls({
  duration,
  onSeek,
  refreshRate = 60,
  jumpMillis = 1000,
}: PlayerControlsProps) {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [startedPlayingAt, setStartedPlayingAt] = useState<Date | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [speed, setSpeed] = useState(1);
  const IS_PLAYING = startedPlayingAt !== null;

  useEffect(() => {
    if (IS_PLAYING && !isScrubbing) {
      const interval = setInterval(() => {
        const elapsed = elapsedMillies(startedPlayingAt!) * speed;
        seekToTimestamp(elapsed);
        if (elapsed >= duration) {
          onPause();
        }
      }, intervalAtFPS(refreshRate));
      return () => clearInterval(interval);
    }
  }, [startedPlayingAt, currentTimestamp]);

  function seekToTimestamp(timestamp: number, type?: 'jump') {
    let boundedTimestamp = Math.min(duration, Math.max(0, timestamp));
    setCurrentTimestamp(boundedTimestamp);
    if (IS_PLAYING && type === 'jump') {
      setStartedPlayingAt(new Date(millisAgo(boundedTimestamp / speed)));
    }
    setTimeout(() => onSeek(boundedTimestamp), 0); // Schedule client function to run after the current render
  }

  function adjustTimestamp(delta: number) {
    const speedAdjustedDelta = delta * speed;
    console.log('adjustTimestamp', delta, speed, speedAdjustedDelta);
    seekToTimestamp(currentTimestamp + speedAdjustedDelta, 'jump');
  }

  function onJumpToStart() {
    console.debug('jump to start');
    seekToTimestamp(0, 'jump');
  }

  function onJumpBackward() {
    console.debug('jump backward');
    adjustTimestamp(-jumpMillis);
  }

  function onPlay() {
    console.debug('play');
    const nextTimestamp = currentTimestamp >= duration ? 0 : currentTimestamp;
    seekToTimestamp(nextTimestamp);
    setStartedPlayingAt(new Date(millisAgo(nextTimestamp / speed)));
  }

  function onPause() {
    console.debug('pause');
    setStartedPlayingAt(null);
  }

  function onJumpForward() {
    console.debug('jump forward');
    adjustTimestamp(jumpMillis);
  }

  function onJumpToEnd() {
    console.debug('jump to end');
    seekToTimestamp(duration, 'jump');
  }

  function onScrubStart() {
    console.debug('scrub start');
    setIsScrubbing(true);
  }

  const onScrub = useCallback(
    throttle((newTimestamp: number) => {
      console.debug('scrub', newTimestamp);
      seekToTimestamp(newTimestamp, 'jump');
    }, intervalAtFPS(10)),
    [],
  );

  function onScrubEnd() {
    if (isScrubbing) {
      console.debug('scrub end');
      setIsScrubbing(false);
      if (IS_PLAYING) {
        setStartedPlayingAt(new Date(millisAgo(currentTimestamp / speed)));
      }
    }
  }

  function onSpeedChange(speed: number) {
    setSpeed(speed);
    if (IS_PLAYING) {
      setStartedPlayingAt(new Date(millisAgo(currentTimestamp / speed)));
    }
  }

  return (
    <>
      <TimeSlider
        duration={duration}
        currentTimestamp={currentTimestamp}
        onScrubStart={onScrubStart}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
      />
      <CenteredBetweenSidebars>
        <View />
        <PlayerButtons
          isPlaying={IS_PLAYING}
          onJumpToStart={onJumpToStart}
          onJumpBackward={onJumpBackward}
          onPlay={onPlay}
          onPause={onPause}
          onJumpForward={onJumpForward}
          onJumpToEnd={onJumpToEnd}
        />
        <SpeedSelector onSpeedChange={onSpeedChange} />
      </CenteredBetweenSidebars>
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
