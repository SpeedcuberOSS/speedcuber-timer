// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View, processColor } from 'react-native';

import { Attempt } from '../../../lib/stif';
import { AttemptAnalytics } from '../../../lib/analytics/AttemptAnalytics';
import { CombinedChart } from 'react-native-charts-wrapper';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface AttemptsChartProps {
  attempts: Attempt[];
  averages?: number[];
}

const AVERAGE_COLORS = ['red', 'limegreen', 'yellow', 'orange'];

function prepareAverage(x: number, attempts: Attempt[]) {
  let averages = new AttemptAnalytics(attempts).sliding
    .AoX(x)
    .map(d => d / 1000)
    .map((d, idx) => {
      return {
        x: idx + x - 1,
        y: d,
      };
    });
  return averages;
}

export default function AttemptsChart({
  attempts,
  averages = [5, 12],
}: AttemptsChartProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const pointColor = processColor(theme.colors.primary.replace('1)', '0.75)'));
  const textColor = processColor(theme.colors.onBackground);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <CombinedChart
        style={{ flex: 1 }}
        data={{
          scatterData: {
            dataSets: [
              {
                label: t('charts.duration'),
                values: attempts
                  .map(attempt => attempt.duration / 1000)
                  .reverse(),
                config: {
                  scatterShape: 'CIRCLE',
                  scatterShapeSize: 5,
                  scatterShapeHoleRadius: 2,
                  color: pointColor,
                  valueTextColor: textColor,
                },
              },
            ],
          },
          lineData: {
            dataSets: [
              {
                label: t('charts.best'),
                values: new AttemptAnalytics(attempts).sliding
                  .best()
                  .map(([x, y]) => {
                    return { x: x, y: y / 1000 };
                  }),
                config: {
                  color: processColor('yellow'),
                  circleColor: processColor('yellow'),
                  circleRadius: 3,
                  drawCircleHole: false,
                  drawValues: false,
                  dashedLine: {
                    lineLength: 5,
                    spaceLength: 5,
                  },
                },
              },
              ...averages.map((a, idx) => {
                return {
                  label: `Ao${a}`,
                  values: prepareAverage(a, attempts),
                  config: {
                    color: processColor(
                      AVERAGE_COLORS[idx % AVERAGE_COLORS.length],
                    ),
                    lineWidth: 2,
                    drawCircles: false,
                    drawValues: false,
                  },
                };
              }),
            ],
          },
        }}
        legend={{
          form: 'CIRCLE',
          textColor: textColor,
          fontFamily: 'Rubik',
        }}
        xAxis={{
          textColor: textColor,
          position: 'BOTTOM',
          fontFamily: 'Rubik',
        }}
        yAxis={{
          left: {
            textColor: textColor,
            fontFamily: 'Rubik',
          },
          right: {
            enabled: false,
          },
        }}
        drawOrder={['SCATTER', 'LINE']}
      />
    </View>
  );
}
