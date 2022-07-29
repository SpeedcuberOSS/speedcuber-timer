// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InspectionTimer from '../components/InspectionTimer';
import { Text } from 'react-native-paper';
import SolveTimer from '../components/SolveTimer';
import formatElapsedTime from '../utils/formatElapsedTime';
import { Scrambler3x3x3 } from '../../lib/scrambles/mandy';
import {
  AttemptBuilder,
  EVENT_3x3x3,
  Infraction,
  SolutionBuilder,
} from '../../lib/stif';
import { getLibrary } from '../../lib/attempts';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

export default function PracticeScreen() {
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastTime, setLastTime] = useState(new Date(0));
  const [attemptBuilder] = useState(new AttemptBuilder());
  const [solutionBuilder] = useState(new SolutionBuilder());

  function get3x3x3Scramble(): string {
    let scramble = new Scrambler3x3x3().generateScramble();
    attemptBuilder.setEvent(EVENT_3x3x3);
    solutionBuilder.setScramble(scramble);
    return scramble.algorithm.moves.join(' ');
  }

  function nextTimerState() {
    let next = (timerState + 1) % 3;
    setTimerState(next);
  }

  function handleInspectionComplete(infractions: Infraction[]) {
    console.debug('Inspection complete', infractions);
    infractions.forEach(infraction => {
      attemptBuilder.addInfraction(infraction);
    });
    nextTimerState();
  }

  function handleSolveComplete(duration: Date) {
    setLastTime(duration);
    attemptBuilder.setDuration(duration.getTime());
    attemptBuilder.addSolution(solutionBuilder.build());
    getLibrary().add(attemptBuilder.build());
    nextTimerState();
  }

  return (
    <SafeAreaView style={styles.container}>
      {(timerState === TimerState.SCRAMBLING && (
        <Pressable style={styles.landing} onPress={nextTimerState}>
          <Text style={styles.scramble}>{get3x3x3Scramble()}</Text>
          <Text style={styles.time}>{formatElapsedTime(lastTime)}</Text>
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
