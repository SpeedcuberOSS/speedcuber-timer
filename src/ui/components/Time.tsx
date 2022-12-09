// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import React from 'react';
import { Text } from 'react-native-paper';
import formatElapsedTime from '../utils/formatElapsedTime';

interface TimeProps {
  elapsed: Date;
}

export default function Time({ elapsed }: TimeProps) {
  let timeParts = formatElapsedTime(elapsed).split(':');
  let largeParts = timeParts.slice(0, -1);
  let smallParts = timeParts.slice(-1)[0].split('.');
  return (
    <View style={styles.container}>
      {largeParts.map((part, i) => (
        <Text key={i} style={styles.monospaceMedium}>
          {`${part}:`}
        </Text>
      ))}
      <Text style={styles.monospaceMedium}>{smallParts[0]}</Text>
      <Text style={styles.monospaceSmall}>{`.${smallParts[1]}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  monospaceLarge: {
    fontFamily: 'Rubik-Regular',
    fontSize: 70,
    fontVariant: ['tabular-nums'],
  },
  monospaceMedium: {
    fontFamily: 'Rubik-Regular',
    fontSize: 60,
    fontVariant: ['tabular-nums'],
  },
  monospaceSmall: {
    fontFamily: 'Rubik-Regular',
    fontSize: 50,
    fontVariant: ['tabular-nums'],
    paddingBottom: 2,
  },
});