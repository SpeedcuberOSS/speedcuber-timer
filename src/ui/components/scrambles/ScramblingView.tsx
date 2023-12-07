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
import { GeneratedScramble } from './types';
import { STIF } from '../../../lib/stif';
import Scrambles from './Scrambles';
import { getScrambler } from '../../../lib/scrambles/mandy';

interface ScramblingViewProps {
  previousAttempt: STIF.Attempt;
  onPress?: (scrambles: GeneratedScramble[]) => void;
}

export default function ScramblingView({
  previousAttempt,
  onPress = () => {},
}: ScramblingViewProps) {
  const scrambles = useScrambles(previousAttempt.event, previousAttempt.id);
  const [layouts, setLayouts] = useState<LayoutAllEvent>();
  return (
    <Pressable style={styles.landing} onPress={() => onPress(scrambles)}>
      <CenteredBetweenSidebars
        direction="vertical"
        contentWeight={2}
        contentStyle={{ justifyContent: 'center' }}
        sidebarWeight={3}
        sidebarStyle={{ marginHorizontal: 20 }}
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

/**
 * Generates scrambles for the given `event` every time the `key` changes.
 */
function useScrambles(event: STIF.CompetitiveEvent, key: string) {
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
  }, [key]);
  return scrambles;
}

const styles = StyleSheet.create({
  landing: {
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
