// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Inspection } from '../../../lib/constants';
import { Text } from 'react-native-paper';
import { getCurrentTheme } from '../../themes';
import { useTranslation } from 'react-i18next';
import { Milliseconds } from '../../../lib/stif';

interface InspectionTimeProps {
  elapsed: Milliseconds;
  ready?: boolean;
  inspectionDuration?: Milliseconds;
  stackmatDelay?: Milliseconds;
  overtimeUntilDnf?: Milliseconds;
}

function formatTimeToShow(
  remaining: Milliseconds,
  overtimeUntilDnf: Milliseconds,
): string {
  if (remaining >= 0) {
    return Math.ceil(remaining / 1000).toString();
  } else if (Math.abs(remaining) <= overtimeUntilDnf) {
    return '+2';
  } else {
    return 'DNF';
  }
}

export default function InspectionTime({
  elapsed,
  ready = false,
  inspectionDuration = Inspection.DEFAULT_DURATION_MILLIS,
  stackmatDelay = Inspection.DEFAULT_STACKMAT_DELAY_MILLIS,
  overtimeUntilDnf = Inspection.DEFAULT_OVERTIME_UNTIL_DNF_MILLIS,
}: InspectionTimeProps) {
  const { t } = useTranslation();
  let textStyle: any[] = [styles.timer];

  const remaining: Milliseconds = inspectionDuration - elapsed;
  const isAlmostDone = remaining <= stackmatDelay * 6;

  if (isAlmostDone) {
    textStyle.push(styles.almostDone);
  }
  if (ready) {
    textStyle.push(styles.ready);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.inspection}>{`${t(
        'inspection',
      ).toLocaleUpperCase()}:`}</Text>
      <Text style={textStyle}>
        {formatTimeToShow(remaining, overtimeUntilDnf)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inspection: {
    fontSize: 16,
    paddingBottom: 10,
  },
  timer: {
    fontSize: 80,
    fontVariant: ['tabular-nums'],
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
