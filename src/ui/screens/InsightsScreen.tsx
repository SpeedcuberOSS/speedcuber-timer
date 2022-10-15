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
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';

let library = getLibrary();

export default function InsightsScreen() {
  const theme = getCurrentTheme();
  let data = library.getAll();
  data = data
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, Math.min(1000, data.length));
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  console.debug(`showing ${data.length} attempts`);
  return (
    <SafeAreaView style={styles.container}>
      <Chart
        style={{ height: 200, width: Dimensions.get('window').width }}
        data={data.map((attempt, index) => ({
          x: data.length - index,
          y: attempt.duration / 1000,
        }))}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 0, max: data.length }}
        yDomain={{
          min: 0,
          max: Math.max(...data.map(attempt => attempt.duration / 1000)) * 1.1,
        }}>
        <VerticalAxis
          tickCount={11}
          theme={{
            axis: {
              stroke: { color: theme.colors.onBackground },
            },
            grid: {
              stroke: { color: theme.colors.backdrop },
            },
            ticks: {
              stroke: { color: theme.colors.onBackground },
            },
            labels: {
              formatter: v => v.toFixed(0),
              label: {
                color: theme.colors.onBackground,
              },
            },
          }}
        />
        <HorizontalAxis
          tickCount={5}
          theme={{
            axis: {
              stroke: { color: theme.colors.onBackground },
            },
            grid: {
              stroke: { color: theme.colors.backdrop },
            },
            ticks: {
              stroke: { color: theme.colors.onBackground },
            },
            labels: {
              formatter: v => v.toFixed(0),
              label: {
                color: theme.colors.onBackground,
              },
            },
          }}
        />
        <Area
          theme={{
            gradient: {
              from: { color: theme.colors.primary, opacity: 0 },
              to: { color: theme.colors.primary, opacity: 0 },
            },
          }}
        />
        <Line
          theme={{
            scatter: {
              default: {
                width: 1,
                height: 1,
                // rx: 2,
                color: theme.colors.primary,
              },
            },
            stroke: { color: theme.colors.primary, width: 0 },
          }}
        />
      </Chart>
      <BigList data={data} renderItem={renderAttempt} itemHeight={125} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
