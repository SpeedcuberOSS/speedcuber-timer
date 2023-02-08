// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as React from 'react';

import Time from './Time';
import { Timer } from '../../lib/timers';

interface SolveTimerProps {
  onStopTimer: (duration: Date) => void;
}

const SolveTimer: React.FC<SolveTimerProps> = ({ onStopTimer }) => {
  const [timer] = useState(new Timer());
  const [elapsed, setElapsed] = useState(new Date(0));
  useEffect(() => {
    if (!timer.isRunning()) {
      timer.start();
    }
    const interval = setInterval(() => {
      setElapsed(new Date(timer.elapsedMilliseconds()));
    }, 20);
    return () => clearInterval(interval);
  });

  function handleOnPressIn() {
    timer.reset();
    onStopTimer(elapsed);
  }

  return (
    <Pressable style={styles.container} onPressIn={handleOnPressIn}>
      <Time elapsed={elapsed} />
    </Pressable>
  );
};

export default SolveTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  timer: {
    fontSize: 40,
    fontFamily: 'RubikMonoOne-Regular',
  },
});
