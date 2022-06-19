// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { Timer } from '../../lib/timers';
import format_elapsed_time from '../utils/format_elapsed_time';

interface SolveTimerProps {
  onStopTimer: (duration: Date) => void;
}

let timer = new Timer();

const SolveTimer: React.FC<SolveTimerProps> = ({ onStopTimer }) => {
  const [elapsed, setElapsed] = useState(new Date(0));
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(new Date(timer.elapsedMilliseconds()));
    }, 20);
    return () => clearInterval(interval);
  });

  function handleOnPressIn() {
    timer.reset();
    onStopTimer(elapsed);
  }

  if (!timer.isRunning()) {
    timer.start();
  }

  return (
    <Pressable style={styles.container} onPressIn={handleOnPressIn}>
      <Text>{format_elapsed_time(elapsed)}</Text>
    </Pressable>
  );
};

export default SolveTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});