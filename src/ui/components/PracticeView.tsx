// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  Infraction,
  Penalty,
  SCRAMBLE_UNKNOWN,
  SolutionBuilder,
} from '../../lib/stif';
import { Pressable, StyleSheet, View } from 'react-native';
import PuzzleRegistry, {
  MessageSubscription,
} from '../utils/bluetooth/SmartPuzzleRegistry';
import React, { useState } from 'react';

import { ATTEMPT_UNKNOWN } from '../../lib/stif';
import AttemptTime from './attempts/AttemptTime';
import InspectionTimer from '../components/inspection/InspectionTimer';
import { MessageStreamBuilder } from '../../lib/stif/builders/MessageStreamBuilder';
import SolveTimer from '../components/SolveTimer';
import { Text } from 'react-native-paper';
import { getLibrary } from '../../lib/attempts';
import { getScrambler } from '../../lib/scrambles/mandy';
import { t } from 'i18next';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

export default function PracticeView() {
  const [event] = useCompetitiveEvent();
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastAttempt, setLastAttempt] = useState(ATTEMPT_UNKNOWN);
  const [attemptBuilder, setAttemptBuilder] = useState(new AttemptBuilder());
  const [solutionBuilder, setSolutionBuilder] = useState(new SolutionBuilder());
  const [messageStreamBuilder, setMessageStreamBuilder] = useState(
    new MessageStreamBuilder(),
  );
  const [messageSubscription, setMessageSubscription] =
    useState<MessageSubscription>();

  function getScramble(): string {
    let scramble = getScrambler(event).generateScramble();
    attemptBuilder.setEvent(event);
    solutionBuilder.setScramble(scramble);
    if (scramble === SCRAMBLE_UNKNOWN) {
      return t('scramble.hand');
    } else {
      return scramble.algorithm.moves.join(' ');
    }
  }

  function nextTimerState() {
    let next = (timerState + 1) % 3;
    setTimerState(next);
  }

  function handleInspectionBegin() {
    console.debug('Inspection begin');
    attemptBuilder.setTimestamp(new Date().getTime());
    const smartPuzzle = PuzzleRegistry.lastConnectedPuzzle();
    if (smartPuzzle) {
      messageStreamBuilder.setSmartPuzzle(smartPuzzle);
      setMessageSubscription(
        PuzzleRegistry.addMessageListener(smartPuzzle, message => {
          messageStreamBuilder.addMessages([message]);
        }),
      );
    }
    nextTimerState();
  }

  function handleInspectionComplete(infractions: Infraction[]) {
    console.debug('Inspection complete', infractions);
    attemptBuilder.setInspectionCompleteTimestamp(new Date().getTime());
    infractions.forEach(infraction => {
      attemptBuilder.addInfraction(infraction);
    });
    if (infractions.some(i => i.penalty === Penalty.DID_NOT_FINISH)) {
      console.log('DNF Detected');
      // TODO Ensure DNFs are handled correctly.
      completeAndSaveAttempt(new Date(-1));
      setTimerState(TimerState.SCRAMBLING);
    } else {
      nextTimerState();
    }
  }

  function handleSolveComplete(duration: Date) {
    completeAndSaveAttempt(duration);
    nextTimerState();
  }

  function completeAndSaveAttempt(duration: Date) {
    attemptBuilder.setDuration(duration.getTime());
    attemptBuilder.addSolution(solutionBuilder.build());
    if (messageSubscription) {
      attemptBuilder.addExtension(messageStreamBuilder.build());
      messageSubscription.remove();
      setMessageSubscription(undefined);
    }
    let prevAttempt = attemptBuilder.build();
    getLibrary().add(prevAttempt);
    setLastAttempt(prevAttempt);
    setAttemptBuilder(new AttemptBuilder());
    setSolutionBuilder(new SolutionBuilder());
    setMessageStreamBuilder(new MessageStreamBuilder());
  }

  return (
    <View style={styles.container}>
      {(timerState === TimerState.SCRAMBLING && (
        <Pressable style={styles.landing} onPress={handleInspectionBegin}>
          <Text style={styles.scramble}>{getScramble()}</Text>
          <AttemptTime attempt={lastAttempt} />
          <Text style={styles.scramble}>{''}</Text>
        </Pressable>
      )) ||
        (timerState === TimerState.INSPECTION && (
          <InspectionTimer
            onInspectionComplete={handleInspectionComplete}
            onCancel={() => {
              setTimerState(TimerState.SCRAMBLING);
              setMessageStreamBuilder(new MessageStreamBuilder());
            }}
          />
        )) ||
        (timerState === TimerState.SOLVING && (
          <SolveTimer onStopTimer={handleSolveComplete} />
        ))}
    </View>
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
    fontFamily: 'RubikMonoOne-Regular',
  },
  scramble: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
});
