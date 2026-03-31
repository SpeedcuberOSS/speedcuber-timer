// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { LayoutChangeEvent, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Attempt } from '../../../lib/stif/wrappers';
import { AttemptAnalytics } from '../../../lib/analytics/AttemptAnalytics';
import { GridComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import ZeroAttemptsPlaceholder from '../attempts/ZeroAttemptsPlaceholder';
import * as echarts from 'echarts/core';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

echarts.use([SVGRenderer, ScatterChart, LineChart, GridComponent, LegendComponent]);

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
  const chartRef = useRef<any>(null);
  const chartInstance = useRef<any>(null);
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  const primaryColor = theme.colors.primary.replace('1)', '0.75)');
  const textColor = theme.colors.onBackground;

  const scatterData = useMemo(
    () =>
      attempts.length <= MAX_POINTS_PER_SERIES
        ? attempts
            .map(attempt => attempt.duration() / 1000)
            .reverse()
            .map((d, idx) => [idx, d] as [number, number])
            .filter(([, y]) => y !== Infinity)
        : [],
    [attempts],
  );

  const bestData = useMemo(
    () =>
      new AttemptAnalytics(attempts).sliding
        .best()
        .map(([x, y]) => [x, y / 1000] as [number, number])
        .filter(([, y]) => y !== Infinity),
    [attempts],
  );

  const averageData = useMemo(
    () =>
      averages.map(a => ({
        label: `Ao${a}`,
        data: prepareAverage(a, attempts).map(
          ({ x, y }) => [x, y] as [number, number],
        ),
      })),
    [attempts, averages],
  );

  // Initialize chart when the container dimensions are available.
  useEffect(() => {
    if (!chartRef.current || width === 0 || height === 0) return;

    chartInstance.current = echarts.init(chartRef.current, null, {
      renderer: 'svg',
      width,
      height,
    });

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [width, height]);

  // Update chart options whenever data or theme changes.
  useEffect(() => {
    if (!chartInstance.current) return;

    chartInstance.current.setOption({
      legend: {
        data: [
          t('analytics.duration'),
          t('analytics.best'),
          ...averages.map(a => `Ao${a}`),
        ],
        textStyle: { color: textColor, fontFamily: 'Rubik' },
        icon: 'circle',
      },
      xAxis: {
        type: 'value',
        position: 'bottom',
        axisLabel: { color: textColor, fontFamily: 'Rubik' },
        axisLine: { lineStyle: { color: textColor } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: textColor, fontFamily: 'Rubik' },
        axisLine: { lineStyle: { color: textColor } },
      },
      series: [
        {
          name: t('analytics.duration'),
          type: 'scatter',
          data: scatterData,
          symbolSize: 5,
          itemStyle: { color: primaryColor },
        },
        {
          name: t('analytics.best'),
          type: 'line',
          data: bestData,
          lineStyle: { color: 'yellow', type: 'dashed' },
          symbol: 'circle',
          symbolSize: 3,
          showSymbol: true,
          itemStyle: { color: 'yellow' },
        },
        ...averageData.map(({ label, data }, idx) => ({
          name: label,
          type: 'line' as const,
          data,
          lineStyle: {
            color: AVERAGE_COLORS[idx % AVERAGE_COLORS.length],
            width: 2,
          },
          showSymbol: false,
          itemStyle: { color: AVERAGE_COLORS[idx % AVERAGE_COLORS.length] },
        })),
      ],
    });
  }, [
    width,
    height,
    scatterData,
    bestData,
    averageData,
    averages,
    primaryColor,
    textColor,
    t,
  ]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    setDimensions({ width: w, height: h });
  };

  return (
    <View style={{ flex: 1, padding: 10 }} onLayout={handleLayout}>
      <SvgChart ref={chartRef} style={{ flex: 1 }} />
    </View>
  );
}
