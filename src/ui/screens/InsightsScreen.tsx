// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import BigList from 'react-native-big-list';
import { getLibrary } from '../../lib/attempts';
import AttemptCard from '../components/AttemptCard';
import { Attempt } from '../../lib/stif';

let library = getLibrary();

export default function InsightsScreen() {
  return (
    <SafeAreaView>
      <BigList
        data={library.getAll()}
        renderItem={({ item, index }) => (
          <AttemptCard key={item.id} attempt={item} />
        )}
        itemHeight={100}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
