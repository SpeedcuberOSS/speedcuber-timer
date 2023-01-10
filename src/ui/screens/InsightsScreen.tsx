// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet } from 'react-native';

import AttemptList from '../components/AttemptList';
import AttemptsChart from '../components/charts/AttemptsChart';
import React from 'react';
import { getLibrary } from '../../lib/attempts';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

let library = getLibrary();

export default function InsightsScreen() {
  const [event] = useCompetitiveEvent();
  const data = library.getAll();
  const attempts = data
    .filter(a => a.event === event)
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, 100);
  return (
    <SafeAreaView style={styles.container}>
      <AttemptsChart attempts={attempts} />
      <AttemptList attempts={attempts} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
