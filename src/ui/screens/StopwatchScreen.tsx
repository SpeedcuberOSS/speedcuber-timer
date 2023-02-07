// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet } from 'react-native';

import PracticeView from '../components/PracticeView';
import React from 'react';
import { TimerTabScreenProps } from '../navigation/types';

type Props = TimerTabScreenProps<'Stopwatch'>;

export default function StopwatchScreen(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <PracticeView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  landing: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
  },
  scramble: {
    fontSize: 20,
    textAlign: 'center',
    padding: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 2,
  },
});
