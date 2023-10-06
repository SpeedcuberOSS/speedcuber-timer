// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  AttemptBuilder,
  MessageStreamBuilder,
  SolutionBuilder,
} from '../../lib/stif/builders';
import { Attempt } from '../../lib/stif/wrappers';
import PuzzleRegistry, {
  MessageSubscription,
} from './smartpuzzles/SmartPuzzleRegistry';

import { t } from 'i18next';
import { Text } from 'react-native-paper';
import { parseReconstruction } from '../../lib/recordings/parseReconstruction';
import { getScrambler } from '../../lib/scrambles/mandy';
import {
  useAttemptCreator,
  useSolveRecordingCreator,
} from '../../persistence/hooks';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import SolveTimer from './SolveTimer';
import AttemptTime from './attempts/AttemptTime';
import InspectionTimer from './inspection/InspectionTimer';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

export default function PracticeView() {
  const createAttempt = useAttemptCreator();
  const createRecording = useSolveRecordingCreator();
  const [event] = useCompetitiveEvent();
  const [inspectionStart, setInspectionStart] = useState(0);
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastAttempt, setLastAttempt] = useState(
    undefined as Attempt | undefined,
  );
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
    const solution = solutionBuilder.build();
    const attempt = attemptBuilder
      .setTimerStop(new Date().getTime())
      .addSolution(solution)
      .build();
    try {
      const recording = messageStreamBuilder.build();
      solution.reconstruction = parseReconstruction(
        recording,
        solution.scramble,
        attempt.timerStart,
      );
      attempt.solutions = [solution];
      createRecording(solution.id, recording);
    } catch (error) {
      console.log(`Cannot save a recording because: ${error}`);
    }
    if (messageSubscription) {
      messageSubscription.remove();
      setMessageSubscription(undefined);
    }
    createAttempt(attempt);
    setLastAttempt(new Attempt(attempt));
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
