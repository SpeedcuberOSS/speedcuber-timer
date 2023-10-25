// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Attempt } from '../../lib/stif/wrappers';
import { PracticeStackScreenProps } from '../navigation/types';
import { STIF } from '../../lib/stif';
import TPSChart from '../components/charts/TPSChart';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PracticeStackScreenProps<'TPSChart'>;

export default function TPSChartScreen({ route, navigation }: Props) {
  const {t} = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      title: t('statistics.tps'),
    });
  })
  
  const attempt = new Attempt(route.params.attempt);
  const moves = attempt.solutions().reduce((acc, solution) => {
    return acc.concat(solution.moves());
  }, [] as STIF.TimestampedMove[]);
  return (
    <View style={styles.container}>
      <TPSChart
        solveReplay={moves}
        duration={attempt.durationWithoutPenalties()}
        showXAxis={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});