// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Attempt } from '../../lib/stif/wrappers';
import AttemptList from '../components/attempts/AttemptList';
import { TimerTabScreenProps } from '../navigation/types';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';

type Props = TimerTabScreenProps<'Attempts'>;

export default function AttemptsScreen({ route, navigation }: Props) {
  const [event] = useCompetitiveEvent();
  const data: Attempt[] = [];
  const attempts = data
    .filter(a => a.event().id === event.id)
    .sort((a, b) => b.inspectionStart() - a.inspectionStart());
  return (
    <View style={styles.container}>
      <AttemptList
        attempts={attempts}
        onPress={(attempt: Attempt) =>
          navigation.push('Details', {
            attempt: attempt.stif()
          })
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
