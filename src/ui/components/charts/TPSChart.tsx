// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View, processColor } from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';
import { STIF } from '../../../lib/stif';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface TPSChartProps {
  solveReplay: STIF.TimestampedMove[];
  duration: number;
  atTimestamp?: number;
  showXAxis?: boolean;
}

export default function TPSChart({
  solveReplay,
  duration,
  atTimestamp,
  showXAxis = false,
}: TPSChartProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const tps = windowedTPS(solveReplay, duration);
  const maxTPS = Math.max(...tps.map(t => t.tps));
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                label: t('analytics.tps'),
                values: [
                  { x: 0, y: 0 },
                  ...tps.map((tps, i) => ({ y: tps.tps, x: tps.t })),
                ],
                config: {
                  drawValues: false,
                  drawCircles: false,
                  mode: 'HORIZONTAL_BEZIER',
                  color: processColor(theme.colors.primary),
                  drawFilled: true,
                  fillAlpha: 100,
                  fillGradient: {
                    colors: [
                      processColor(theme.colors.background),
                      processColor(theme.colors.primary),
                    ],
                    positions: [0, 1],
                    angle: 90,
                    orientation: 'BOTTOM_TOP',
                  },
                },
              },
              {
                label: t('analytics.tps'),
                values:
                  atTimestamp !== undefined
                    ? [
                        { x: atTimestamp / 1000, y: 0 },
                        { x: atTimestamp / 1000, y: maxTPS },
                      ]
                    : [],
                config: {
                  drawValues: false,
                  drawCircles: false,
                  mode: 'LINEAR',
                  color: processColor(theme.colors.secondary),
                },
              },
            ],
          }}
          chartBackgroundColor={processColor(theme.colors.background)}
          marker={{
            enabled: true,
          }}
          legend={{
            enabled: false,
            form: 'CIRCLE',
            textColor: processColor(theme.colors.onBackground),
            fontFamily: 'Rubik',
          }}
          xAxis={{
            enabled: showXAxis,
            textColor: processColor(theme.colors.onBackground),
            position: 'BOTTOM',
            fontFamily: 'Rubik',
            axisMinimum: 0,
          }}
          yAxis={{
            left: {
              textColor: processColor(theme.colors.onBackground),
              fontFamily: 'Rubik',
              axisMinimum: 0,
              spaceBottom: 0,
            },
            right: {
              enabled: false,
            },
          }}
          chartDescription={{ text: '' }}
        />
      </View>
    </View>
  );
}

function windowedTPS(
  solveReplay: STIF.TimestampedMove[],
  duration: number,
  numSteps = 30,
  windowMillis = 1000,
) {
  const STEP_SIZE = duration / numSteps;
  const tps = [];
  for (let i = windowMillis; i < duration; i += STEP_SIZE) {
    const moves = solveReplay.filter(
      move => i - windowMillis <= move.t && move.t < i,
    );
    tps.push({ t: i / 1000, tps: moves.length / (windowMillis / 1000) });
  }
  return tps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
