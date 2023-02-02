// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FlatList, StyleSheet, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import ReconstructionStep, { Phase } from './ReconstructionStep';
import { Text, useTheme } from 'react-native-paper';

import { Algorithm } from '../../../lib/stif';
import { SolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';
import { analyzeSolution } from 'solution-analyzer';
import formatElapsedTime from '../../utils/formatElapsedTime';

interface ReconstructionProps {
  /**
   * The starting scramble for solve.
   */
  scrambleAlg: Algorithm;
  /**
   * The solve replay for which a reconstruction is being displayed.
   */
  solveReplay: SolveReplay;
  /**
   * The duration of the attempt.
   */
  duration: number;
  /**
   * The current timestamp in the solve replay.
   */
  atTimestamp: number;
}

export default function Reconstruction({
  scrambleAlg,
  solveReplay,
  duration,
  atTimestamp,
}: ReconstructionProps) {
  const [steps, setSteps] = useState<Phase[]>([]);
  useEffect(() => {
    console.debug('Reconstruction: useEffect: analyzeSolution()');
    const breakdown = analyzeSolution(
      scrambleAlg.moves.join(' '),
      solveReplay.map(v => v.m).join(' '),
      'CFOP',
    );
    let steps: Phase[] = [
      {
        label: 'pickup',
        moves: [],
        duration: solveReplay[0]?.t ?? 0,
        recognition: 0,
        tps: 0,
      },
    ];
    let wipMoveCount = 0;
    let wipDuration = steps[0].duration;
    for (const step of breakdown.steps) {
      const moves = solveReplay.slice(
        wipMoveCount,
        wipMoveCount + step.moves.length,
      );
      const startTime = wipDuration;
      const endTime = moves[moves.length - 1].t;
      const stepDuration = endTime - startTime;
      steps.push({
        label: step.label ?? 'unknown',
        moves: moves,
        duration: stepDuration,
        recognition: moves[0].t - startTime,
        tps: moves.length / (stepDuration / 1000),
      });
      wipMoveCount += step.moves.length;
      wipDuration = endTime;
    }
    steps.push({
      label: 'put down',
      moves: [],
      duration: duration - wipDuration,
      recognition: 0,
      tps: 0,
    });
    setSteps(steps);
  }, [scrambleAlg, solveReplay]);

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        renderItem={({ item }) => {
          let timestamp = atTimestamp;
          if (atTimestamp < item.moves[0]?.t) {
            timestamp = 0;
          } else if (atTimestamp > item.moves[item.moves.length - 1]?.t) {
            timestamp = Infinity;
          }
          return (
            <ReconstructionStep
              key={item.label}
              {...item}
              elapsed={timestamp}
            />
          );
        }}
        keyExtractor={item => item.label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});
