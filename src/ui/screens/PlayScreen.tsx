// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, ScrollView } from 'react-native';

import { EVENT_5x5x5_BLD } from '../../lib/stif/builtins';
import { RootDrawerScreenProps } from '../navigation/types';
import { STIF } from '../../lib/stif';
import { Text } from 'react-native-paper';
import { useQuery } from '../../persistence/realmdb';

type Props = RootDrawerScreenProps<'Play'>;

export default function PlayScreen(props: Props) {
  const query = useQuery<STIF.Solution>('Solution');
  const orphans = query.filtered(`puzzle = "${EVENT_5x5x5_BLD.puzzles[0]}"`);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text variant="titleLarge">Orphaned Solutions</Text>
      <ScrollView>
        <Text>{JSON.stringify(orphans)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
