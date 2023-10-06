// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import AttemptList from '../components/attempts/AttemptList';
import { TimerTabScreenProps } from '../navigation/types';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useAttempts } from '../../persistence/hooks';
import { STIF } from '../../lib/stif';

type Props = TimerTabScreenProps<'Attempts'>;

export default function AttemptsScreen({ route, navigation }: Props) {
  const [event] = useCompetitiveEvent();
  const attempts = useAttempts({ event, sortDirection: 'descending' });
  return (
    <View style={styles.container}>
      <AttemptList
        attempts={attempts}
        onPress={(attempt: STIF.Attempt) =>
          navigation.push('Details', { attempt })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
