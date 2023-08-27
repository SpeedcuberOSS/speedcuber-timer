// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet, View } from 'react-native';

import { AttemptAnalytics } from '../../lib/analytics/AttemptAnalytics';
import AttemptsChart from '../components/charts/AttemptsChart';
import { DataTable } from 'react-native-paper';
import { TimerTabScreenProps } from '../navigation/types';
import { getLibrary } from '../../lib/attempts';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

type Props = TimerTabScreenProps<'Insights'>;

let library = getLibrary();

export default function InsightsScreen(props: Props) {
  const [event] = useCompetitiveEvent();
  const data = library.getAll();
  const attempts = data
    .filter(a => a.event() === event)
    .sort((a, b) => b.inspectionStart() - a.inspectionStart())
    .slice(0, 100);
  const averages = [5, 12, 50, 100, 1000];
  return (
    <SafeAreaView style={styles.container}>
      <AttemptsChart attempts={attempts} />
      <View style={{ padding: 20 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Current</DataTable.Title>
            <DataTable.Title>Record</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {averages.map(count => (
          <DataTable.Row key={count}>
            <DataTable.Cell>{`Ao${count}`}</DataTable.Cell>
            <DataTable.Cell>
              {new AttemptAnalytics(data.slice(-count)).AoX(count) / 1000}
            </DataTable.Cell>
            <DataTable.Cell>
              {Math.min(...new AttemptAnalytics(data).sliding.AoX(count)) /
                1000}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
