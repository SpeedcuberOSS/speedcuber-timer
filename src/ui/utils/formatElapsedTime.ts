// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt, Penalty } from '../../lib/stif';

export default function formatElapsedTime(elapsed: Date): string {
  let timeStr = (
    elapsed.getSeconds() +
    elapsed.getMilliseconds() / 1000
  ).toFixed(3);
  if (elapsed.getMinutes() > 0 || elapsed.getUTCHours() > 0) {
    if (elapsed.getSeconds() < 10) {
      timeStr = `0${timeStr}`;
    }
    timeStr = `${elapsed.getMinutes()}:${timeStr}`;
  }
  if (elapsed.getUTCHours() > 0) {
    if (elapsed.getMinutes() < 10) {
      timeStr = `0${timeStr}`;
    }
    timeStr = `${elapsed.getHours()}:${timeStr}`;
  }
  return timeStr;
}

export function getAttemptTimeString(attempt: Attempt): string {
  let duration = attempt.duration;
  let timeString = '';
  if (attempt.infractions.some(i => i.penalty === Penalty.DID_NOT_FINISH)) {
    timeString = 'DNF';
  } else if (
    attempt.infractions.some(i => i.penalty === Penalty.DID_NOT_START)
  ) {
    timeString = 'DNS';
  } else if (attempt.infractions.some(i => i.penalty === Penalty.PLUS_2)) {
    timeString = formatElapsedTime(new Date(duration + 2000));
    timeString += ' (+2)';
  }
  return timeString;
}
