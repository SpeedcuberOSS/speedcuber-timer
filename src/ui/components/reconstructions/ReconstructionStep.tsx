// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import formatElapsedTime from '../../utils/formatElapsedTime';

export interface Phase {
  /**
   * The name of the step
   */
  label: string;
  /**
   * The timestamped moves in the step
   */
  moves: { t: number; m: string }[];
  /**
   * The duration of the step in milliseconds
   */
  duration: number;
  /**
   * The number of milliseconds between the start of the step and
   * execution of the first move.
   */
  recognition: number;
  /**
   * The average TPS of the step
   *
   * = duration / moves.length
   */
  tps: number;
}

interface ReconstructionStepProps extends Phase {
  elapsed: number;
}

function ReconstructionStep({
  label,
  moves,
  duration,
  recognition,
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
          {`${formatElapsedTime(new Date(duration))} s | ${tps.toFixed(
            2,
          )} TPS | rec: ${formatElapsedTime(new Date(recognition))} s`}
        </Text>
      </View>
      {Moves}
    </View>
  );
}

const styles = StyleSheet.create({
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

export default memo(ReconstructionStep);
