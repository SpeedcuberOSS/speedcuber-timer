// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_3x3x3 } from '../../../lib/stif/builtins';

import { Button } from 'react-native-paper';
import Icons from '../../icons/iconHelper';
import { STIF } from '../../../lib/stif';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export interface ScrambleHeaderProps {
  puzzle?: STIF.Puzzle;
  smartPuzzle?: STIF.SmartPuzzle;
  positioning?: [idx: number, total: number];
  onRequestSmartPuzzleLink?: () => void;
}

export default function ScrambleHeader({
  puzzle,
  smartPuzzle,
  positioning,
  onRequestSmartPuzzleLink = () => {},
}: ScrambleHeaderProps) {
  const { t } = useTranslation();
  const positioningText = positioning
    ? `#${positioning[0]}/${positioning[1]}`
    : '';
  const canLinkSmartPuzzle =
    puzzle && [PUZZLE_2x2x2, PUZZLE_3x3x3].includes(puzzle);
  const smartPuzzleIcon = smartPuzzle
    ? Icons.MaterialCommunityIcons('bluetooth-connect')
    : Icons.MaterialCommunityIcons('bluetooth');
  const smartPuzzleText = smartPuzzle
    ? smartPuzzle.name
    : t('bluetooth.no_active_puzzle');
  return (
    <View
      style={{
        marginHorizontal: 8,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
      }}>
      {canLinkSmartPuzzle && (
        <Button
          mode="text"
          style={{ width: positioning ? '50%' : '100%' }}
          icon={smartPuzzleIcon}
          onPress={onRequestSmartPuzzleLink}>
          {smartPuzzleText}
        </Button>
      )}
      {positioning && (
        <Button
          mode="text"
          style={{ width: canLinkSmartPuzzle ? '50%' : '100%' }}
          labelStyle={{ fontVariant: ['tabular-nums'] }}
          disabled
          icon={Icons.STIF(`event-${puzzle}`)}>
          {positioningText}
        </Button>
      )}
    </View>
  );
}
