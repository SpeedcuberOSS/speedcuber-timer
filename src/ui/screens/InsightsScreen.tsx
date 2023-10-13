// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../lib/stif/wrappers';
import { AttemptAnalytics } from '../../lib/analytics/AttemptAnalytics';
import AttemptsChart from '../components/charts/AttemptsChart';
import { DataTable } from 'react-native-paper';
import SplitScreen from '../layouts/SplitScreen';
import { StyleSheet } from 'react-native';
import { TimerTabScreenProps } from '../navigation/types';
import { useAttempts } from '../../persistence/hooks';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

type Props = TimerTabScreenProps<'Insights'>;

export default function InsightsScreen(props: Props) {
  const [event] = useCompetitiveEvent();
  const stifs = useAttempts({ event, sortDirection: 'descending' });
  const attempts: Attempt[] = [...stifs].map(a => new Attempt(a));
  const averages = [5, 12, 50, 100, 1000];
  return (
    <SplitScreen style={styles.container}>
      <AttemptsChart attempts={attempts} />
      <AveragesTable averages={averages} attempts={attempts} />
    </SplitScreen>
  );
}

interface InsightsScreenProps {
  averages: number[];
  attempts: Attempt[];
}

export function AveragesTable({ averages, attempts }: InsightsScreenProps) {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Current</DataTable.Title>
        <DataTable.Title>Record</DataTable.Title>
      </DataTable.Header>
      {averages.map(count => (
        <DataTable.Row key={count}>
          <DataTable.Cell>{`Ao${count}`}</DataTable.Cell>
          <DataTable.Cell>
            {new AttemptAnalytics(attempts.slice(-count)).AoX(count) / 1000}
          </DataTable.Cell>
          <DataTable.Cell>
            {Math.min(...new AttemptAnalytics(attempts).sliding.AoX(count)) /
              1000}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
});
