// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Text, useTheme } from 'react-native-paper';
import { Penalty } from '../../lib/attempts/penalties';
import { getCurrentTheme } from '../themes';

interface InspectionTimerProps {
  onInspectionComplete: (penalties: Penalty[]) => any;
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
  let penalties: Penalty[] = [];

  function handlePressIn() {
    startTime = new Date().getTime();
  }

  function handleLongPress() {
    countdownColor = colors.accent;
  }

  function handlePressOut() {
    countdownColor = colors.text;
    if (new Date().getTime() - startTime > STACKMAT_DELAY) {
      props.onInspectionComplete(penalties);
    }
  }

  return (
    <Pressable
      style={styles.container}
      delayLongPress={STACKMAT_DELAY}
      onPressIn={handlePressIn}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}>
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
        onComplete={() => ({ shouldRepeat: true, delay: 2 })}>
        {({ remainingTime }) => (
          <Text style={[styles.timer, { color: countdownColor }]}>
            {remainingTime}
          </Text>
        )}
      </CountdownCircleTimer>
    </Pressable>
  );
};

export default InspectionTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 80,
    color: getCurrentTheme().colors.text,
  },
});
