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
import { useEffect, useState } from 'react';

import { Attempt } from '../../lib/stif/wrappers';
import { GeneratedScramble } from './scrambles/types';
import InspectionTimer from './inspection/InspectionTimer';
import { STIF } from '../../lib/stif';
import ScramblingView from './scrambles/ScramblingView';
import SolveTimer from './SolveTimer';
import { parseReconstruction } from '../../lib/recordings/parseReconstruction';
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
    if (now - inspectionStart > 17_000) {
      console.log('DNF Detected');
      // TODO Ensure DNFs are handled correctly.
      const attempt = assembleAttempt();
      persistAttempt(attempt);
      setTimerState(TimerState.SCRAMBLING);
    } else {
      nextTimerState();
    }
  }

  function handleSolveComplete() {
    const attempt = assembleAttempt();
    persistAttempt(attempt);
    nextTimerState();
  }

  function assembleAttempt() {
    const now = new Date().getTime();
    const attempt = new AttemptBuilder()
      .setEvent(event)
      .setInspectionStart(inspectionStart)
      .setTimerStart(timerStart)
      .setTimerStop(now);
    wipSolutions
      .map(wip => {
        const recording = wip.messages?.build();
        if (recording) {
          const reconstruction = parseReconstruction(
            recording,
            wip.scramble.algorithm,
            timerStart,
          );
          reconstruction.forEach(phase => wip.builder.addSolutionPhase(phase));
        }
        if (wip.messageSubscription) {
          wip.messageSubscription.remove();
        }
        return wip.builder.build();
      })
      .forEach(solution => attempt.addSolution(solution));
    return attempt.build();
  }

  function persistAttempt(attempt: STIF.Attempt) {
    createAttempt(attempt);
    setLastAttempt(new Attempt(attempt));
    wipSolutions.map((wip, idx) => {
      const recording = wip.messages?.build();
      if (recording) {
        createRecording(attempt.solutions[idx].id, recording);
      }
    });
  }

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
