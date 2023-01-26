// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Algorithm } from '../../../lib/stif';
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
    Moves = (
      <Text>
        {moves.map((v, i) => (
          <Text
            key={i}
            style={{
              color:
                elapsed >= v.t
                  ? theme.colors.primary
                  : theme.colors.onBackground,
            }}>
            {`${v.m} `}
          </Text>
        ))}
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
      {steps.map((step, i) => {
        return <ReconstructionStep key={i} {...step} elapsed={atTimestamp} />;
      })}
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
