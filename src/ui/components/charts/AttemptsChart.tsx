// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View, processColor } from 'react-native';

import { Attempt } from '../../../lib/stif/wrappers';
import { AttemptAnalytics } from '../../../lib/analytics/AttemptAnalytics';
import { CombinedChart } from 'react-native-charts-wrapper';
import ZeroAttemptsPlaceholder from '../attempts/ZeroAttemptsPlaceholder';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface AttemptsChartProps {
  attempts?: Attempt[];
  averages?: number[];
}

const AVERAGE_COLORS = ['red', 'limegreen', 'yellow', 'orange'];
const MAX_POINTS_PER_SERIES = 250; // Hand selected to balance performance limitations with detailed charting.

function prepareAverage(x: number, attempts: Attempt[]) {
  let averages = new AttemptAnalytics(attempts).sliding.AoX(x);
  const spacing = Math.ceil(averages.length / MAX_POINTS_PER_SERIES);
  let sparseAverages = averages
    .filter((value, idx) => idx % spacing == 0)
    .map(d => d / 1000)
    .map((d, idx) => ({
      x: idx * spacing + x - 1,
      y: d,
    }))
    .filter(point => point.y !== Infinity);
  return sparseAverages;
}

export default function AttemptsChartDelegator({
  attempts = [],
  averages = [5, 12],
}: AttemptsChartProps) {
  if (attempts.length === 0) {
    return <ZeroAttemptsPlaceholder />;
  } else {
    return <AttemptsChart attempts={attempts} averages={averages} />;
  }
}

export function AttemptsChart({
  attempts = [],
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
            dataSets:
              attempts.length <= MAX_POINTS_PER_SERIES
                ? [
                    {
                      label: t('analytics.duration'),
                      values: attempts
                        .map(attempt => attempt.duration() / 1000)
                        .reverse()
                        .map((d, idx) => ({
                          x: idx,
                          y: d,
                        }))
                        .filter(point => point.y !== Infinity),
                      config: {
                        scatterShape: 'CIRCLE',
                        scatterShapeSize: 5,
                        scatterShapeHoleRadius: 2,
                        color: pointColor,
                        valueTextColor: textColor,
                      },
                    },
                  ]
                : [],
          },
          lineData: {
            dataSets: [
              {
                label: t('analytics.best'),
                values: new AttemptAnalytics(attempts).sliding
                  .best()
                  .map(([x, y]) => ({
                    x: x,
                    y: y / 1000,
                  }))
                  .filter(point => point.y !== Infinity),
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
        chartDescription={{ text: '' }}
      />
    </View>
  );
}
