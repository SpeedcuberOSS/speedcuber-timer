// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { List, Text, useTheme } from 'react-native-paper';
import React, { memo } from 'react';

import Icons from '../../icons/iconHelper';
import formatElapsedTime from '../../utils/formatElapsedTime';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
  } else if (moves.length > 0) {
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
    <List.Accordion title={label} description={Moves}>
      <List.Item
        title={t('analytics.duration')}
        description={formatElapsedTime(new Date(duration))}
        left={props => (
          <List.Icon {...props} icon={Icons.MaterialCommunityIcons('clock')} />
        )}
      />
      <List.Item
        title={t('analytics.recognition')}
        description={formatElapsedTime(new Date(recognition))}
        left={props => (
          <List.Icon {...props} icon={Icons.Ionicons('hourglass')} />
        )}
      />
      <List.Item
        title={t('analytics.execution')}
        description={formatElapsedTime(new Date(duration - recognition))}
        left={props => (
          <List.Icon {...props} icon={Icons.MaterialIcons('directions-run')} />
        )}
      />
      <List.Item
        title={t('analytics.tps')}
        description={tps.toFixed(3)}
        left={props => (
          <List.Icon {...props} icon={Icons.Ionicons('speedometer')} />
        )}
      />
    </List.Accordion>
  );
}

export default memo(ReconstructionStep);
