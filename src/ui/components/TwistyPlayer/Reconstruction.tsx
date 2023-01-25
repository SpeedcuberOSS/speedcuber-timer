// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FlatList, StyleSheet, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';

import { Algorithm } from '../../../lib/stif';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { SolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';
import { analyzeSolution } from 'solution-analyzer';

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
   * The current timestamp in the solve replay.
   */
  atTimestamp: number;
}

interface ReconstructionStep {
  label: string;
  moves: { t: number; m: string }[];
  duration?: number;
  tps?: number;
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
      <Text variant="labelMedium" style={styles.label}>
        {label}
      </Text>
      {Moves}
    </View>
  );
}

const MemoizedReconstructionStep = memo(ReconstructionStep);

export default function Reconstruction({
  scrambleAlg,
  solveReplay,
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
    let steps: ReconstructionStep[] = [];
    let wipMoveCount = 0;
    for (const step of breakdown.steps) {
      steps.push({
        label: step.label,
        moves: solveReplay.slice(
          wipMoveCount,
          wipMoveCount + step.moves.length,
        ),
        // duration: step.duration,
        // tps: step.tps,
      });
      wipMoveCount += step.moves.length;
    }
    setSteps(steps);
  }, [scrambleAlg, solveReplay]);

  return (
    <View>
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
  reconstruction: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  label: {
    fontWeight: 'bold',
  },
});
