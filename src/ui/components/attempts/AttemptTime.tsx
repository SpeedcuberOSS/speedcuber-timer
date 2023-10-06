// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../../lib/stif/wrappers';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import Time from '../Time';

interface AttemptTimeProps {
  attempt?: Attempt;
}

export default function AttemptTime({ attempt }: AttemptTimeProps) {
  const result = attempt?.result() ?? 0;
  const resultIsNumber = typeof result === 'number';
  const penaltyText = attempt?.penaltyDuration() ? ` +${attempt.penaltyDuration()/2000}` : '';
  return (
    <View style={styles.container}>
      {resultIsNumber ? (
        <Time elapsed={new Date(result)} />
      ) : (
        <Text>{result + penaltyText}</Text>
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
