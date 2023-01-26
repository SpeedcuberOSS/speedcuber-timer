// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AlgorithmBuilder, Attempt } from '../../../lib/stif';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import PlayerControls from './PlayerControls';
import TwistyPlayer from './TwistyPlayer';
import { analyzeSolution } from 'solution-analyzer';
import { getSolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';

interface AttemptPlayerProps {
  attempt: Attempt;
}

export default function AttemptPlayer({ attempt }: AttemptPlayerProps) {
  const theme = useTheme();
  const twistyPlayerRef = useRef({});
  const [elapsed, setElapsed] = useState(0);

  const scrambleAlg = attempt.solutions[0].scramble.algorithm;
  const solveReplay = getSolveReplay(attempt);
  const solutionMoves = solveReplay.filter(v => v.t < elapsed).map(v => v.m);
  const unsolvedMoves = solveReplay.filter(v => v.t > elapsed).map(v => v.m);

  const breakdown = analyzeSolution(
    scrambleAlg.moves.join(' '),
    solveReplay.map(v => v.m).join(' '),
    'CFOP',
  );

  interface ReconstructionStep {
    label: string;
    moves: {
      solved: string[];
      unsolved: string[];
    };
    duration?: number;
    tps?: number;
  }
  let steps: ReconstructionStep[] = [];
  let wipMovesSolvedCount = 0;
  for (const step of breakdown.steps) {
    const newMovesSolvedCount = Math.min(
      step.moves.length,
      solutionMoves.length - wipMovesSolvedCount,
    );
    const newMovesSolved = step.moves.slice(0, newMovesSolvedCount);
    const newMovesUnsolved = step.moves.slice(newMovesSolvedCount);
    steps.push({
      label: step.label,
      moves: {
        solved: newMovesSolved,
        unsolved: newMovesUnsolved,
      },
      // duration: step.duration,
      // tps: step.tps,
    });
    wipMovesSolvedCount += newMovesSolvedCount;
  }

  useEffect(() => {
    const twistyAlg = new AlgorithmBuilder()
      .setMoves([...scrambleAlg.moves, ...solutionMoves])
      .build();
    // @ts-ignore
    twistyPlayerRef.current.setAlgorithm(twistyAlg);
  }, [elapsed]);

  return (
    <View style={{ flex: 1 }}>
      <TwistyPlayer
        ref={twistyPlayerRef}
        // @ts-ignore
        puzzle={attempt.event.puzzle}
        algorithm={scrambleAlg}
        backgroundColor={theme.colors.background}
      />
      <Text>{}</Text>
      {steps.map((step, i) => (
        <View key={i} style={styles.reconstruction}>
          <Text
            variant="labelMedium"
            style={{
              fontWeight: 'bold',
              color:
                step.moves.unsolved.length === 0
                  ? theme.colors.primary
                  : theme.colors.onBackground,
            }}>
            {step.label}
          </Text>
          <Text style={styles.reconstruction}>
            <Text style={{ color: theme.colors.primary }}>
              {step.moves.solved.join(' ')}
            </Text>
            <Text style={{ color: theme.colors.onBackground }}>
              {step.moves.solved.length > 0 ? ' ' : ''}
            </Text>
            <Text style={{ color: theme.colors.onBackground }}>
              {step.moves.unsolved.join(' ')}
            </Text>
          </Text>
        </View>
      ))}

      <PlayerControls duration={attempt.duration} onSeek={setElapsed} />
    </View>
  );
}

const styles = StyleSheet.create({
  reconstruction: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
