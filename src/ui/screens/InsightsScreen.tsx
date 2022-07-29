// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { getLibrary } from '../../lib/attempts';
import AttemptCard from '../components/AttemptCard';

let library = getLibrary();

export default function InsightsScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {library.getAll().map(attempt => (
          <AttemptCard key={attempt.id} attempt={attempt} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
