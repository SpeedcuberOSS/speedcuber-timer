// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { memo, useCallback, useEffect, useState } from 'react';

import CenteredBetweenSidebars from '../../layouts/CenteredBetweenSidebars';
import PlayerButtons from './PlayerButtons';
import SpeedSelector from './SpeedSelector';
import TimeSlider from './TimerSlider';
import { View } from 'react-native';
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
    seekToTimestamp(currentTimestamp + speedAdjustedDelta, 'jump');
  }

  function onPlay() {
    const nextTimestamp = currentTimestamp >= duration ? 0 : currentTimestamp;
    seekToTimestamp(nextTimestamp);
    setStartedPlayingAt(new Date(millisAgo(nextTimestamp / speed)));
  }

  function onPause() {
    setStartedPlayingAt(null);
  }

  const onScrub = useCallback(
    throttle((newTimestamp: number) => {
      seekToTimestamp(newTimestamp, 'jump');
    }, intervalAtFPS(10)),
    [],
  );

  function onScrubEnd() {
    if (isScrubbing) {
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
        onScrubStart={() => setIsScrubbing(true)}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
      />
      <CenteredBetweenSidebars>
        <View />
        <PlayerButtons
          isPlaying={IS_PLAYING}
          onJumpToStart={() => seekToTimestamp(0, 'jump')}
          onJumpBackward={() => adjustTimestamp(-jumpMillis)}
          onPlay={onPlay}
          onPause={onPause}
          onJumpForward={() => adjustTimestamp(jumpMillis)}
          onJumpToEnd={() => seekToTimestamp(duration, 'jump')}
        />
        <SpeedSelector onSpeedChange={onSpeedChange} />
      </CenteredBetweenSidebars>
    </>
  );
}

export default memo(PlayerControls);
