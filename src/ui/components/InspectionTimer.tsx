// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
  Infraction,
} from '../../lib/stif';
import { Pressable, StyleSheet, Vibration } from 'react-native';
import React, { useState } from 'react';

import { Button } from 'react-native-paper';
import { Inspection } from '../../lib/constants';
import InspectionTime from './InspectionTime';
import { useTimer } from '../hooks';
import { useTranslation } from 'react-i18next';

interface InspectionTimerProps {
  onInspectionComplete?: (infractions: Infraction[]) => void;
  onCancel?: () => void;
  inspectionDurationMillis?: number;
  stackmatDelayMillis?: number;
  overtimeUntilDnfMillis?: number;
}

function getInfractions(
  elapsedMillis: number,
  inspectionDurationMillis: number,
  overtimeUntilDnfMillis: number,
) {
  let infractions: Infraction[] = [];
  if (elapsedMillis > inspectionDurationMillis + overtimeUntilDnfMillis) {
    infractions.push(INSPECTION_EXCEEDED_17_SECONDS);
  } else if (elapsedMillis > inspectionDurationMillis) {
    infractions.push(INSPECTION_EXCEEDED_15_SECONDS);
  }
  return infractions;
}

const FIRST_WARNING_MILLIS = 8000;
const SECOND_WARNING_MILLIS = 12000;

const InspectionTimer = ({
  onInspectionComplete = () => {},
  onCancel = () => {},
  inspectionDurationMillis = Inspection.DEFAULT_DURATION_MILLIS,
  stackmatDelayMillis = Inspection.DEFAULT_STACKMAT_DELAY_MILLIS,
  overtimeUntilDnfMillis = Inspection.DEFAULT_OVERTIME_UNTIL_DNF_MILLIS,
}: InspectionTimerProps) => {
  const { t } = useTranslation();
  const { timer, elapsed } = useTimer();
  const [warnings, setWarnings] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [startMillis, setStartMillis] = useState(Infinity);

  const elapsedMillis = elapsed.valueOf();

  function handlePressIn() {
    if (timer.isRunning()) {
      setStartMillis(new Date().valueOf());
    }
  }

  function handleLongPress() {
    if (timer.isRunning()) {
      setReady(true);
    }
  }

  function handlePressOut() {
    if (
      timer.isRunning() &&
      new Date().valueOf() - startMillis > stackmatDelayMillis
    ) {
      _end_inspection();
    }
  }

  function endInspectionIfAtDnf() {
    if (
      timer.isRunning() &&
      elapsedMillis > inspectionDurationMillis + overtimeUntilDnfMillis
    ) {
      _end_inspection();
    }
  }

  function _end_inspection() {
    setReady(false);
    timer.stop();
    let infractions: Infraction[] = getInfractions(
      elapsedMillis,
      inspectionDurationMillis,
      overtimeUntilDnfMillis,
    );
    setTimeout(() => {
      onInspectionComplete(infractions);
    }, 0);
  }

  function deliverTimeWarning() {
    for (const warning of [FIRST_WARNING_MILLIS, SECOND_WARNING_MILLIS]) {
      if (elapsedMillis > warning) {
        if (!warnings.includes(warning)) {
          setWarnings([...warnings, warning]);
          Vibration.vibrate();
        }
      }
    }
  }

  endInspectionIfAtDnf();
  deliverTimeWarning();

  return (
    <Pressable
      style={styles.container}
      delayLongPress={stackmatDelayMillis}
      onPressIn={handlePressIn}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}>
      <InspectionTime
        ready={ready}
        elapsedMillis={elapsed.valueOf()}
        inspectionDurationMillis={inspectionDurationMillis}
        stackmatDelayMillis={stackmatDelayMillis}
        overtimeUntilDnfMillis={overtimeUntilDnfMillis}
      />
      <Button onPress={onCancel} mode="contained-tonal">
        {t('common.cancel')}
      </Button>
    </Pressable>
  );
};

export default InspectionTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
