// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InspectionTimer from '../components/InspectionTimer';
import { Text } from 'react-native-paper';
import { Penalty } from '../../lib/attempts/types/Penalty';
import SolveTimer from '../components/SolveTimer';
import format_elapsed_time from '../utils/format_elapsed_time';
import { Scrambler, NbyN } from '../../lib/scramblers';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

function get3x3Scramble(): string {
  let scrambler = new Scrambler(new NbyN(3));
  let scrambleMoves = scrambler.generateScramble().map(move => move.toString());
  let scramble = scrambleMoves.join(' ');
  return scramble;
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
        <>
          <Text onPress={nextTimerState}>{format_elapsed_time(lastTime)}</Text>
          <Text onPress={nextTimerState}>{get3x3Scramble()}</Text>
        </>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
