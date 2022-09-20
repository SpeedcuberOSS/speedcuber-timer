// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useState } from 'react';

import InspectionTime from './InspectionTime';
import { useTimer } from '../hooks';
import {
  Infraction,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
} from '../../lib/stif';
import { Inspection } from '../../lib/constants';
import { Pressable, StyleSheet } from 'react-native';

interface InspectionTimerProps {
  onInspectionComplete?: (infractions: Infraction[]) => void;
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

const InspectionTimer = ({
  onInspectionComplete = () => {},
  inspectionDurationMillis = Inspection.DEFAULT_DURATION_MILLIS,
  stackmatDelayMillis = Inspection.DEFAULT_STACKMAT_DELAY_MILLIS,
  overtimeUntilDnfMillis = Inspection.DEFAULT_OVERTIME_UNTIL_DNF_MILLIS,
}: InspectionTimerProps) => {
  const { timer, elapsed } = useTimer();
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

  endInspectionIfAtDnf();

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
