// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AttemptBuilder, SolutionBuilder } from '../../lib/stif/builders';
import { STIF } from '../../lib/stif';
import { Pressable, StyleSheet, View } from 'react-native';
import PuzzleRegistry, {
  MessageSubscription,
} from './smartpuzzles/SmartPuzzleRegistry';

import AttemptTime from './attempts/AttemptTime';
import InspectionTimer from '../components/inspection/InspectionTimer';
import { MessageStreamBuilder } from '../../lib/stif/builders/MessageStreamBuilder';
import SolveTimer from '../components/SolveTimer';
import { Text } from 'react-native-paper';
import { getScrambler } from '../../lib/scrambles/mandy';
import { t } from 'i18next';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useState } from 'react';
import { Attempt } from '../../lib/stif/wrappers';
import { EVENT_3x3x3, PUZZLE_3x3x3 } from '../../lib/stif/builtins';
import { library } from '../../persistence';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}
const now = Date.now();
const TEST_SCRAMBLE: STIF.Algorithm = ['R', 'U'];
const TEST_ATTEMPT: Attempt = new AttemptBuilder()
  .setEvent(EVENT_3x3x3)
  .addSolution({
    puzzle: PUZZLE_3x3x3,
    scramble: TEST_SCRAMBLE,
    reconstruction: [],
  })
  .setInspectionStart(now - 14000)
  .setTimerStart(now)
  .setTimerStop(now)
  .wrapped()
  .build();
export default function PracticeView() {
  const [event] = useCompetitiveEvent();
  const [inspectionStart, setInspectionStart] = useState(0);
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastAttempt, setLastAttempt] = useState(TEST_ATTEMPT);
  const [attemptBuilder, setAttemptBuilder] = useState(new AttemptBuilder());
  const [solutionBuilder, setSolutionBuilder] = useState(new SolutionBuilder());
  const [messageStreamBuilder, setMessageStreamBuilder] = useState(
    new MessageStreamBuilder(),
  );
  const [messageSubscription, setMessageSubscription] =
    useState<MessageSubscription>();

  function getScramble(): string {
    let scramble = getScrambler(event.puzzles[0]).generateScramble();
    attemptBuilder.setEvent(event);
    solutionBuilder.setScramble(scramble);
    solutionBuilder.setPuzzle(event.puzzles[0]);
    if (scramble.length === 0) {
      return t('scramble.hand');
    } else {
      return scramble.join(' ');
    }
  }

  function nextTimerState() {
    let next = (timerState + 1) % 3;
    setTimerState(next);
  }

  function handleInspectionBegin() {
    console.debug('Inspection begin');
    const now = new Date().getTime();
    attemptBuilder.setInspectionStart(now);
    setInspectionStart(now);
    const smartPuzzle = PuzzleRegistry.lastConnectedPuzzle();
    if (smartPuzzle) {
      messageStreamBuilder.setSmartPuzzle(smartPuzzle);
      setMessageSubscription(
        PuzzleRegistry.addMessageListener(smartPuzzle, message => {
          console.debug('Message received:', message);
          messageStreamBuilder.addMessages([message]);
        }),
      );
    }
    nextTimerState();
  }

  function handleInspectionComplete() {
    console.debug('Inspection complete');
    const now = new Date().getTime();
    attemptBuilder.setTimerStart(now);
    if (now - inspectionStart > 17_000) {
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
    attemptBuilder.setTimerStop(new Date().getTime());
    attemptBuilder.addSolution(solutionBuilder.build());
    if (messageSubscription) {
      messageSubscription.remove();
      setMessageSubscription(undefined);
    }
    let prevAttempt = attemptBuilder.wrapped().build();
    library.put(prevAttempt.stif());
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
