// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import BigList from 'react-native-big-list';
import { getLibrary } from '../../lib/attempts';
import AttemptCard from '../components/AttemptCard';
import { Attempt } from '../../lib/stif';

let library = getLibrary();

export default function InsightsScreen() {
  const data = library.getAll();
  data.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  console.debug(`showing ${data.length} attempts`);
  return (
    <SafeAreaView style={styles.container}>
      <BigList data={data} renderItem={renderAttempt} itemHeight={125} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
