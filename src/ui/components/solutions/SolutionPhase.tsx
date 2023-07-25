// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Chip, List, Text, useTheme } from 'react-native-paper';
import { memo } from 'react';

import Icons from '../../icons/iconHelper';
import { StyleSheet } from 'react-native';
import formatElapsedTime from '../../utils/formatElapsedTime';
import { useTranslation } from 'react-i18next';
import { SolutionPhase as SolutionPhaseWrapper } from '../../../lib/stif/wrappers';
import { Milliseconds } from '../../../lib/stif';

interface SolutionPhaseProps {
  /**
   * The solution phase to render.
   */
  phase: SolutionPhaseWrapper;
  /**
   * The amount of time that has elapsed (e.g. in the Solution replay)
   */
  elapsed?: Milliseconds;
}

function SolutionPhase({ phase, elapsed = 0 }: SolutionPhaseProps) {
  const moves = phase.moves();
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
    <List.Accordion
      title={phase.label()}
      right={props => (
        <Chip {...props} compact textStyle={styles.chip}>
          {`${_time(phase.duration())} ${t('units.seconds')}`}
        </Chip>
      )}
      description={Moves}>
      <List.Item
        title={t('analytics.recognition')}
        left={props => (
          <List.Icon {...props} icon={Icons.Ionicons('hourglass')} />
        )}
        right={props => (
          <Chip {...props} compact mode="outlined" textStyle={styles.chip}>
            {`${_time(phase.recognition())} ${t('units.seconds')}`}
          </Chip>
        )}
      />
      <List.Item
        title={t('analytics.execution')}
        left={props => (
          <List.Icon {...props} icon={Icons.MaterialIcons('directions-run')} />
        )}
        right={props => (
          <Chip {...props} compact mode="outlined" textStyle={styles.chip}>
            {`${_time(phase.duration() - phase.recognition())} ${t('units.seconds')}`}
          </Chip>
        )}
      />
      <List.Item
        title={t('analytics.tps')}
        left={props => (
          <List.Icon {...props} icon={Icons.Ionicons('speedometer')} />
        )}
        right={props => (
          <Chip {...props} compact mode="outlined" textStyle={styles.chip}>
            {phase.tps()?.toFixed(3)}
          </Chip>
        )}
      />
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  chip: {
    fontVariant: ['tabular-nums'],
  },
});

function _time(duration: number): string {
  return formatElapsedTime(new Date(duration));
}
export default memo(SolutionPhase);
