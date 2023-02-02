// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FlatList, StyleSheet, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
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

interface ReconstructionStep {
  /**
   * The name of the step
   */
  label: string;
  /**
   * The timestamped moves in the step
   */
  moves: { t: number; m: string }[];
  /**
   * The duration of the step
   */
  duration: number;
  /**
   * The average TPS of the step
   *
   * = duration / moves.length
   */
  tps: number;
}

interface ReconstructionStepProps extends ReconstructionStep {
  elapsed: number;
}

function ReconstructionStep({
  label,
  moves,
  duration,
  tps,
  elapsed,
}: ReconstructionStepProps) {
  const theme = useTheme();
  let Moves = null;
  if (elapsed < moves[0]?.t) {
    Moves = (
      <Text style={{ color: theme.colors.onBackground }}>
        {moves.map(v => v.m).join(' ')}
      </Text>
    );
  } else if (elapsed > moves[moves.length - 1]?.t) {
    Moves = (
      <Text style={{ color: theme.colors.primary }}>
        {moves.map(v => v.m).join(' ')}
      </Text>
    );
  } else {
    let solvedMoves = moves
      .filter(v => v.t <= elapsed)
      .map(v => v.m)
      .join(' ');
    let unsolvedMoves = moves
      .filter(v => v.t > elapsed)
      .map(v => v.m)
      .join(' ');
    Moves = (
      <Text>
        <Text style={{ color: theme.colors.primary }}>{solvedMoves}</Text>
        <Text>{solvedMoves ? ' ' : ''}</Text>
        <Text style={{ color: theme.colors.onBackground }}>
          {unsolvedMoves}
        </Text>
      </Text>
    );
  }
  return (
    <View style={styles.reconstruction}>
      <View style={styles.heading}>
        <Text variant="labelMedium" style={styles.label}>
          {`${label}:`}
        </Text>
        <Text variant="labelMedium" style={styles.annotations}>
          {`${formatElapsedTime(new Date(duration))} s | ${tps.toFixed(2)} TPS`}
        </Text>
      </View>
      {Moves}
    </View>
  );
}

const MemoizedReconstructionStep = memo(ReconstructionStep);

export default function Reconstruction({
  scrambleAlg,
  solveReplay,
  duration,
  atTimestamp,
}: ReconstructionProps) {
  const [steps, setSteps] = useState<ReconstructionStep[]>([]);
  useEffect(() => {
    console.debug('Reconstruction: useEffect: analyzeSolution()');
    const breakdown = analyzeSolution(
      scrambleAlg.moves.join(' '),
      solveReplay.map(v => v.m).join(' '),
      'CFOP',
    );
    let steps: ReconstructionStep[] = [
      {
        label: 'pickup',
        moves: [],
        duration: solveReplay[0]?.t ?? 0,
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
        tps: moves.length / (stepDuration / 1000),
      });
      wipMoveCount += step.moves.length;
      wipDuration = endTime;
    }
    steps.push({
      label: 'put down',
      moves: [],
      duration: duration - wipDuration,
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
            <MemoizedReconstructionStep
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
  reconstruction: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  annotations: {
    fontWeight: 'normal',
    fontVariant: ['tabular-nums'],
  },
});
