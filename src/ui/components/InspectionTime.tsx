// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, Text, View } from 'react-native';

import { Inspection } from '../../lib/constants';
import React from 'react';
import { getCurrentTheme } from '../themes';

interface InspectionTimeProps {
  elapsedMillis: number;
  ready?: boolean;
  inspectionDurationMillis?: number;
  stackmatDelayMillis?: number;
  overtimeUntilDnfMillis?: number;
}

function formatTimeToShow(
  millisRemaining: number,
  overtimeUntilDnfMillis: number,
): string {
  if (millisRemaining >= 0) {
    return Math.ceil(millisRemaining / 1000).toString();
  } else if (Math.abs(millisRemaining) <= overtimeUntilDnfMillis) {
    return '+2';
  } else {
    return 'DNF';
  }
}

const InspectionTime = ({
  elapsedMillis,
  ready = false,
  inspectionDurationMillis = Inspection.DEFAULT_DURATION_MILLIS,
  stackmatDelayMillis = Inspection.DEFAULT_STACKMAT_DELAY_MILLIS,
  overtimeUntilDnfMillis = Inspection.DEFAULT_OVERTIME_UNTIL_DNF_MILLIS,
}: InspectionTimeProps) => {
  let textStyle: any[] = [styles.timer];

  const millisRemaining = inspectionDurationMillis - elapsedMillis;
  const isAlmostDone = millisRemaining <= stackmatDelayMillis * 6;

  if (isAlmostDone) {
    textStyle.push(styles.almostDone);
  }
  if (ready) {
    textStyle.push(styles.ready);
  }
  return (
    <View style={styles.container}>
      <Text style={textStyle}>
        {formatTimeToShow(millisRemaining, overtimeUntilDnfMillis)}
      </Text>
    </View>
  );
};

export default InspectionTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  timer: {
    fontSize: 80,
    fontFamily: 'Rubik-Regular',
    color: getCurrentTheme().colors.onPrimaryContainer,
  },
  almostDone: {
    fontSize: 80,
    color: getCurrentTheme().colors.error,
  },
  ready: {
    fontSize: 100,
    color: getCurrentTheme().colors.secondary,
  },
});
