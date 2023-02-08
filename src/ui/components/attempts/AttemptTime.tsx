// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt, Penalty } from '../../../lib/stif';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import Time from '../Time';

interface AttemptTimeProps {
  attempt: Attempt;
}

export default function AttemptTime({ attempt }: AttemptTimeProps) {
  let infractionsWith = (penalty: Penalty) =>
    attempt.infractions.filter(i => i.penalty === penalty);
  let incurred = (penalty: Penalty) => infractionsWith(penalty).length > 0;

  let duration = attempt.duration;
  let plus2Count = infractionsWith(Penalty.PLUS_2).length;
  if (plus2Count > 0) {
    duration += plus2Count * 2000;
  }
  return (
    <View style={styles.container}>
      {incurred(Penalty.DID_NOT_START) && (
        <Text style={styles.penalty}>DNS</Text>
      )}
      {incurred(Penalty.DID_NOT_FINISH) && (
        <Text style={styles.penalty}>DNF</Text>
      )}
      {!incurred(Penalty.DID_NOT_START) &&
        !incurred(Penalty.DID_NOT_FINISH) && (
          <Time elapsed={new Date(duration)} />
        )}
      {incurred(Penalty.PLUS_2) && (
        <Text style={styles.plus2}>{` (+${plus2Count * 2})`}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  penalty: {
    fontFamily: 'Rubik-Regular',
    fontSize: 60,
  },
  plus2: {
    fontFamily: 'Rubik-Regular',
    fontSize: 30,
  },
});
