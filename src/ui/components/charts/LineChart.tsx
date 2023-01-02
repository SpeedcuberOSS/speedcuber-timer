// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

import { Attempt } from '../../../lib/stif';
import React from 'react';
import { VictoryThemeDefinition } from 'victory-core';
import { getCurrentTheme } from '../../themes';
import { useTheme } from 'react-native-paper';

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

export default function LineChart({ attempts }: { attempts: Attempt[] }) {
  const theme = useTheme();
  return (
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
  );
}
