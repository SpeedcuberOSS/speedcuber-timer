// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Attempt } from '../../lib/stif';
import AttemptList from '../components/attempts/AttemptList';
import React from 'react';
import { TimerTabScreenProps } from '../navigation/types';
import { getLibrary } from '../../lib/attempts';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

type Props = TimerTabScreenProps<'Attempts'>;

let library = getLibrary();

export default function AttemptsScreen({ route, navigation }: Props) {
  const [event] = useCompetitiveEvent();
  const data = library.getAll();
  const attempts = data
    .filter(a => a.event === event)
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, 100);
  return (
    <View style={styles.container}>
      <AttemptList
        attempts={attempts}
        onReplay={(attempt: Attempt) => navigation.push('Player', { attempt })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
