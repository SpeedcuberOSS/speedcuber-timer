// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import CenteredBetweenSidebars, {
  LayoutAllEvent,
} from '../../layouts/CenteredBetweenSidebars';
import { Pressable, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Attempt } from '../../../lib/stif/wrappers';
import AttemptTime from '../attempts/AttemptTime';
import { STIF } from '../../../lib/stif';
import Scrambles from './Scrambles';
import { getScrambler } from '../../../lib/scrambles/mandy';

interface GeneratedScramble {
  puzzle: STIF.Puzzle;
  algorithm: STIF.Algorithm;
  smartPuzzle?: STIF.SmartPuzzle;
}

interface ScramblingViewProps {
  previousAttempt: STIF.Attempt;
  onPress?: (scrambles: GeneratedScramble[]) => void;
}

export default function ScramblingView({
  previousAttempt,
  onPress = () => {},
}: ScramblingViewProps) {
  const event = previousAttempt.event;
  const [scrambles, setScrambles] = useState<GeneratedScramble[]>([]);
  useEffect(() => {
    const scrambles = event.puzzles.map(
      puzzle =>
        ({
          puzzle,
          algorithm: getScrambler(puzzle).generateScramble(),
        } as GeneratedScramble),
    );
    setScrambles(scrambles);
    onPress(scrambles);
  }, [previousAttempt.id]);
  const [layouts, setLayouts] = useState<LayoutAllEvent>();
  return (
    <Pressable style={styles.landing} onPress={() => onPress([])}>
      <CenteredBetweenSidebars
        direction="vertical"
        contentWeight={2}
        contentStyle={{
          justifyContent: 'center',
          borderColor: 'blue',
          borderWidth: 2,
        }}
        sidebarWeight={3}
        sidebarStyle={{
          marginVertical: 10,
          marginHorizontal: 20,
          borderColor: 'yellow',
          borderWidth: 2,
        }}
        onLayoutAll={setLayouts}
        containerStyle={{ alignItems: 'center' }}>
        <Scrambles
          scrambles={scrambles}
          layoutHeightLimit={layouts?.leading.height}
        />
        <AttemptTime attempt={new Attempt(previousAttempt)} />
        <View />
      </CenteredBetweenSidebars>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  landing: {
    // flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scramble: {
    fontSize: 16,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 2,
  },
});
