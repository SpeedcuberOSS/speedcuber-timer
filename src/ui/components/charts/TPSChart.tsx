// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { LayoutChangeEvent, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { STIF } from '../../../lib/stif';
import * as echarts from 'echarts/core';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

echarts.use([SVGRenderer, LineChart, GridComponent]);

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
  const chartRef = useRef<any>(null);
  const chartInstance = useRef<any>(null);
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  const tps = useMemo(
    () => windowedTPS(solveReplay, duration),
    [solveReplay, duration],
  );
  const maxTPS = useMemo(
    () => (tps.length > 0 ? Math.max(...tps.map(pt => pt.tps)) : 1),
    [tps],
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
      backgroundColor: theme.colors.background,
      grid: {
        top: 10,
        bottom: showXAxis ? 40 : 10,
        left: 50,
        right: 10,
      },
      xAxis: {
        type: 'value',
        show: showXAxis,
        min: 0,
        axisLabel: {
          color: theme.colors.onBackground,
          fontFamily: 'Rubik',
        },
        axisLine: {
          lineStyle: { color: theme.colors.onBackground },
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        axisLabel: {
          color: theme.colors.onBackground,
          fontFamily: 'Rubik',
        },
        axisLine: {
          lineStyle: { color: theme.colors.onBackground },
        },
        splitLine: {
          lineStyle: { color: theme.colors.onBackground, opacity: 0.1 },
        },
      },
      series: [
        {
          name: t('analytics.tps'),
          type: 'line',
          smooth: true,
          data: [[0, 0], ...tps.map(pt => [pt.t, pt.tps])],
          lineStyle: { color: theme.colors.primary },
          itemStyle: { color: theme.colors.primary },
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: theme.colors.primary },
                { offset: 1, color: theme.colors.background },
              ],
              global: false,
            },
            opacity: 0.4,
          },
        },
        ...(atTimestamp !== undefined
          ? [
              {
                name: 'position',
                type: 'line' as const,
                data: [
                  [atTimestamp / 1000, 0],
                  [atTimestamp / 1000, maxTPS],
                ],
                lineStyle: { color: theme.colors.secondary },
                showSymbol: false,
              },
            ]
          : []),
      ],
    });
  }, [width, height, tps, maxTPS, atTimestamp, theme, showXAxis, t]);

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
