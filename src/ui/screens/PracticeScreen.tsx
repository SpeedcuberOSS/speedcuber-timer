// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InspectionTimer from '../components/InspectionTimer';
import { Text } from 'react-native-paper';
import { Penalty } from '../../lib/stif/types/Penalty';
import SolveTimer from '../components/SolveTimer';
import format_elapsed_time from '../utils/format_elapsed_time';
import { Scrambler3x3x3 } from '../../lib/scrambles/mandy';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

function get3x3x3Scramble(): string {
  let moves = new Scrambler3x3x3().generateScramble().algorithm.moves;
  const movesPerLine = 10;
  let lines = [];
  for (let i = 0; i < moves.length; i += movesPerLine) {
    lines.push(moves.slice(i, i + movesPerLine).join(' '));
  }
  return lines.join('\n');
}

export default function PracticeScreen() {
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastTime, setLastTime] = useState(new Date(0));

  function nextTimerState() {
    let next = (timerState + 1) % 3;
    setTimerState(next);
  }

  function handleInspectionComplete(penalties: Penalty[]) {
    console.debug('Inspection complete', penalties);
    nextTimerState();
  }

  function handleSolveComplete(duration: Date) {
    setLastTime(duration);
    nextTimerState();
  }

  return (
    <SafeAreaView style={styles.container}>
      {(timerState === TimerState.SCRAMBLING && (
        <Pressable style={styles.landing} onPress={nextTimerState}>
          <Text style={styles.scramble}>{get3x3x3Scramble()}</Text>
          <Text style={styles.time}>{format_elapsed_time(lastTime)}</Text>
          <Text style={styles.scramble}>{''}</Text>
        </Pressable>
      )) ||
        (timerState === TimerState.INSPECTION && (
          <InspectionTimer onInspectionComplete={handleInspectionComplete} />
        )) ||
        (timerState === TimerState.SOLVING && (
          <SolveTimer onStopTimer={handleSolveComplete} />
        ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landing: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
  },
  scramble: {
    fontSize: 20,
    textAlign: 'center',
    padding: 40,
  },
});
