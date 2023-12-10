// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import Time, { styles as TimeStyles } from '../Time';

import { Attempt } from '../../../lib/stif/wrappers';
import { Text } from 'react-native-paper';

interface AttemptTimeProps {
  attempt?: Attempt;
}

export default function AttemptTime({ attempt }: AttemptTimeProps) {
  const result = attempt?.result() ?? 0;
  const resultIsNumber = typeof result === 'number';
  const penaltyText = attempt?.penaltyDuration()
    ? ` +${attempt.penaltyDuration() / 1000}`
    : '';
  return (
    <View style={styles.container}>
      {resultIsNumber ? (
        <Time elapsed={new Date(result)} afterText={penaltyText} />
      ) : (
        <Text style={TimeStyles.monospaceLarge}>{result}</Text>
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
