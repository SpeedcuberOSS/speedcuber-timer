// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../lib/stif/wrappers';
import AttemptsChart from '../components/charts/AttemptsChart';
import AveragesTable from '../components/charts/AveragesTable';
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
  return (
    <SplitScreen style={styles.container}>
      <AttemptsChart attempts={attempts} />
      <AveragesTable
        attempts={attempts}
        averages={[
          { type: 'mean', size: 3 },
          { type: 'trimmed', size: 5 },
          { type: 'trimmed', size: 12 },
          { type: 'trimmed', size: 50 },
          { type: 'trimmed', size: 100 },
          { type: 'trimmed', size: 1000 },
        ]}
        perPage={3}
      />
    </SplitScreen>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
});
