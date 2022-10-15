// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import BigList from 'react-native-big-list';
import { getLibrary } from '../../lib/attempts';
import AttemptCard from '../components/AttemptCard';
import { getCurrentTheme } from '../themes';
import { Attempt } from '../../lib/stif';
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import { VictoryThemeDefinition } from 'victory-core';

let library = getLibrary();
let chartTheme: VictoryThemeDefinition = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    style: {
      ...VictoryTheme.material.axis?.style,
      tickLabels: {
        ...VictoryTheme.material.axis?.style?.tickLabels,
        // @ts-ignore
        fill: getCurrentTheme().colors.onBackground,
      },
    },
  },
};

export default function InsightsScreen() {
  const theme = getCurrentTheme();
  let data = library.getAll();
  data = data
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, Math.min(200, data.length));
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  console.debug(`showing ${data.length} attempts`);
  return (
    <SafeAreaView style={styles.container}>
      <VictoryChart
        theme={chartTheme}
        domainPadding={20}
        containerComponent={<VictoryZoomContainer />}
        height={Dimensions.get('window').height * (3 / 8)}
        domain={{
          x: [0, data.length],
          y: [0, Math.max(...data.map(a => a.duration / 1000))],
        }}>
        <VictoryScatter
          style={{
            data: { fill: theme.colors.primary },
          }}
          size={1}
          data={data.map((attempt, index) => ({
            x: data.length - index,
            y: attempt.duration / 1000,
          }))}
        />
      </VictoryChart>
      <BigList data={data} renderItem={renderAttempt} itemHeight={125} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
