// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

import { Attempt } from '../../lib/stif';
import AttemptCard from '../components/AttemptCard';
import BigList from 'react-native-big-list';
import React from 'react';
import { VictoryThemeDefinition } from 'victory-core';
import { getCurrentTheme } from '../themes';
import { getLibrary } from '../../lib/attempts';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useTheme } from 'react-native-paper';

let library = getLibrary();
let chartTheme: VictoryThemeDefinition = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    style: {
      ...VictoryTheme.material.axis?.style,
      grid: {
        ...VictoryTheme.material.axis?.style?.grid,
        stroke: getCurrentTheme().colors.backdrop,
      },
      tickLabels: {
        ...VictoryTheme.material.axis?.style?.tickLabels,
        // @ts-ignore
        fill: getCurrentTheme().colors.onBackground,
      },
    },
  },
};

export default function InsightsScreen() {
  const theme = useTheme();
  const [event] = useCompetitiveEvent();
  const data = library.getAll();
  const attempts = data
    .filter(a => a.event === event)
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, Math.min(200, data.length));
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  console.debug(`showing ${attempts.length} attempts`);
  return (
    <SafeAreaView style={styles.container}>
      <VictoryChart
        theme={chartTheme}
        domainPadding={20}
        containerComponent={<VictoryZoomContainer />}
        height={Dimensions.get('window').height * (2.5 / 8)}
        domain={{
          x: [0, attempts.length],
          y: [0, Math.max(...attempts.map(a => a.duration / 1000))],
        }}>
        <VictoryScatter
          style={{
            data: { fill: theme.colors.primary },
          }}
          size={1}
          data={attempts.map((attempt, index) => ({
            x: attempts.length - index,
            y: attempt.duration / 1000,
          }))}
        />
      </VictoryChart>
      <BigList data={attempts} renderItem={renderAttempt} itemHeight={125} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
