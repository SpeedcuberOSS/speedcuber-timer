// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  MessageStreamBuilder,
  SolutionBuilder,
} from '../../lib/stif/builders';
import PuzzleRegistry, {
  MessageSubscription,
} from './smartpuzzles/SmartPuzzleRegistry';
import { StyleSheet, View } from 'react-native';
import {
  useAttemptCreator,
  useSolveRecordingCreator,
} from '../../persistence/hooks';
import { useCallback, useEffect, useState } from 'react';

import { Attempt } from '../../lib/stif/wrappers';
import { GeneratedScramble } from './scrambles/types';
import InspectionTimer from './inspection/InspectionTimer';
import { STIF } from '../../lib/stif';
import ScramblingView from './scrambles/ScramblingView';
import SolveTimer from './SolveTimer';
import { parseReconstructionAsync } from '../../lib/recordings/parseReconstructionAsync';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

interface WIPSolution {
  scramble: GeneratedScramble;
  builder: SolutionBuilder;
  messages?: MessageStreamBuilder;
  messageSubscription?: MessageSubscription;
}

function emptyAttemptForEvent(event: STIF.CompetitiveEvent): Attempt {
  const attempt = new AttemptBuilder()
    .setEvent(event)
    .setInspectionStart(0)
    .setTimerStart(0)
    .setTimerStop(0);
  event.puzzles
    .map(puzzle => {
      return new SolutionBuilder().setPuzzle(puzzle).setScramble([]).build();
    })
    .forEach(solution => {
      attempt.addSolution(solution);
    });
  return attempt.wrapped().build();
}

export default function PracticeView() {
  const createAttempt = useAttemptCreator();
  const createRecording = useSolveRecordingCreator();
  const [event] = useCompetitiveEvent();
  const [inspectionStart, setInspectionStart] = useState(0);
  const [timerStart, setTimerStart] = useState(0);
  const [timerState, setTimerState] = useState(TimerState.SCRAMBLING);
  const [lastAttempt, setLastAttempt] = useState(emptyAttemptForEvent(event));
  useEffect(() => setLastAttempt(emptyAttemptForEvent(event)), [event]);
  const [wipSolutions, setSolutions] = useState<WIPSolution[]>([]);

  function nextTimerState() {
    let next = (timerState + 1) % 3;
    setTimerState(next);
  }

  function handleInspectionBegin(scrambles: GeneratedScramble[]) {
    setInspectionStart(new Date().getTime());
    setSolutions(
      scrambles.map(scramble => {
        return {
          scramble,
          builder: new SolutionBuilder()
            .setPuzzle(scramble.puzzle)
            .setScramble(scramble.algorithm),
          ...(() => {
            if (scramble.smartPuzzle) {
              const messages = new MessageStreamBuilder().setSmartPuzzle(
                scramble.smartPuzzle,
              );
              const subscription = PuzzleRegistry.addMessageListener(
                scramble.smartPuzzle,
                message => messages.addMessages([message]),
              );
              return { messages, messageSubscription: subscription };
            } else {
              return {};
            }
          })(),
        };
      }),
    );
    nextTimerState();
  }

  function handleInspectionComplete() {
    const now = new Date().getTime();
    setTimerStart(now);
    const didNotStart = now - inspectionStart > 17_000;
    if (didNotStart) {
      console.log('DNF Detected');
      // TODO Ensure DNFs are handled correctly.
      handleSolveComplete();
    } else {
      nextTimerState();
    }
  }

  const handleSolveComplete = useCallback(() => {
    const now = new Date().getTime();

    // Capture state before transitioning so async code uses the right snapshot.
    const capturedWipSolutions = wipSolutions;
    const capturedInspectionStart = inspectionStart;
    const capturedTimerStart = timerStart;
    const capturedEvent = event;

    // Stop BLE subscriptions and snapshot the recordings synchronously so
    // no new messages are added after the solve ends.
    const capturedRecordings = capturedWipSolutions.map(wip => {
      if (wip.messageSubscription) {
        wip.messageSubscription.remove();
      }
      return wip.messages?.build();
    });

    // Transition the UI immediately so the user sees no lag.
    setTimerState(TimerState.SCRAMBLING);

    // Build and persist the attempt in the background.
    const didNotStart = capturedTimerStart < capturedInspectionStart;
    const attemptBuilder = new AttemptBuilder()
      .setEvent(capturedEvent)
      .setInspectionStart(capturedInspectionStart)
      .setTimerStart(didNotStart ? now : capturedTimerStart)
      .setTimerStop(now);

    Promise.all(
      capturedWipSolutions.map(async (wip, idx) => {
        const recording = capturedRecordings[idx];
        if (recording) {
          const reconstruction = await parseReconstructionAsync(
            recording,
            wip.scramble.algorithm,
            capturedTimerStart,
          );
          reconstruction.forEach(phase => wip.builder.addSolutionPhase(phase));
        }
        return wip.builder.build();
      }),
    )
      .then(solutions => {
        solutions.forEach(solution => attemptBuilder.addSolution(solution));
        const attempt = attemptBuilder.build();
        createAttempt(attempt);
        setLastAttempt(new Attempt(attempt));
        capturedWipSolutions.forEach((wip, idx) => {
          const recording = capturedRecordings[idx];
          if (recording) {
            createRecording(attempt.solutions[idx].id, recording);
          }
        });
      })
      .catch(e => console.error('Failed to assemble or persist attempt', e));
  }, [
    wipSolutions,
    inspectionStart,
    timerStart,
    event,
    createAttempt,
    createRecording,
  ]);

  return (
    <View style={styles.container}>
      {(timerState === TimerState.SCRAMBLING && (
        <ScramblingView
          previousAttempt={lastAttempt.stif()}
          onPress={handleInspectionBegin}
        />
      )) ||
        (timerState === TimerState.INSPECTION && (
          <InspectionTimer
            onInspectionComplete={handleInspectionComplete}
            onCancel={() => {
              setTimerState(TimerState.SCRAMBLING);
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
