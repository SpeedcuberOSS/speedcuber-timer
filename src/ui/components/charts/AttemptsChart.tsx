// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View, processColor } from 'react-native';

import { Attempt } from '../../../lib/stif';
import React from 'react';
import { ScatterChart } from 'react-native-charts-wrapper';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function AttemptsChart({ attempts }: { attempts: Attempt[] }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const pointColor = processColor(theme.colors.primary);
  const textColor = processColor(theme.colors.onBackground);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScatterChart
        style={{ flex: 1 }}
        data={{
          dataSets: [
            {
              label: t('charts.duration'),
              values: attempts
                .map(attempt => attempt.duration / 1000)
                .reverse(),
              config: {
                scatterShape: 'CIRCLE',
                scatterShapeSize: 4,
                scatterShapeHoleRadius: 1,
                color: pointColor,
                valueTextColor: textColor,
              },
            },
          ],
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
      />
    </View>
  );
}
