// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Text, useTheme } from 'react-native-paper';
import {
  Infraction,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
} from '../../lib/stif';
import { getCurrentTheme } from '../themes';

interface InspectionTimerProps {
  onInspectionComplete: (infractions: Infraction[]) => any;
}
enum TimerState {
  INSPECTION = 0,
  OVERTIME = 1,
}

/**
 * The number of milliseconds a stackmat delays before allowing the
 * timer to start.
 */
const STACKMAT_DELAY = 500;

const InspectionTimer: React.FC<InspectionTimerProps> = (
  args: InspectionTimerProps,
) => {
  const defaults = {};
  const props = { ...defaults, ...args };

  const { colors } = useTheme();
  let startTime: number = Infinity;
  let countdownColor = colors.text;
  let infractions: Infraction[] = [];
  const [timerState, setTimerState] = useState(TimerState.INSPECTION);
  console.debug(`Current InspectionTimer State ${timerState}`);
  function handlePressIn() {
    startTime = new Date().getTime();
  }

  function handleLongPress() {
    countdownColor = colors.accent;
  }

  function handlePressOut() {
    countdownColor = colors.text;
    if (new Date().getTime() - startTime > STACKMAT_DELAY) {
      props.onInspectionComplete(infractions);
    }
  }

  return (
    <Pressable
      style={styles.container}
      delayLongPress={STACKMAT_DELAY}
      onPressIn={handlePressIn}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}>
      {(timerState === TimerState.INSPECTION && (
        <CountdownCircleTimer
          isPlaying
          duration={15}
          colors={[
            `#${colors.primary.slice(1)}`,
            `#${colors.accent.slice(1)}`,
            `#${colors.error.slice(1)}`,
            `#${colors.error.slice(1)}`,
          ]}
          colorsTime={[15, 7, 3, 0]}
          onComplete={() => {
            infractions = [INSPECTION_EXCEEDED_15_SECONDS];
            setTimerState(TimerState.OVERTIME);
          }}>
          {({ remainingTime }) => (
            <Text style={[styles.timer, { color: countdownColor }]}>
              {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer>
      )) ||
        (timerState === TimerState.OVERTIME && (
          <CountdownCircleTimer
            isPlaying
            duration={2}
            colors={[`#${colors.error.slice(1)}`, `#${colors.error.slice(1)}`]}
            colorsTime={[2, 0]}
            onComplete={() => {
              infractions = [INSPECTION_EXCEEDED_17_SECONDS];
              props.onInspectionComplete(infractions);
            }}>
            {({ remainingTime }) => (
              <Text style={[styles.timer, { color: countdownColor }]}>+2</Text>
            )}
          </CountdownCircleTimer>
        ))}
    </Pressable>
  );
};

export default InspectionTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  timer: {
    fontSize: 80,
    color: getCurrentTheme().colors.text,
  },
});
