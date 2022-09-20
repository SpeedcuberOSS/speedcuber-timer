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
  let infractionsWith = (penalty: Penalty) =>
    attempt.infractions.filter(i => i.penalty === penalty);
  let incurred = (penalty: Penalty) => infractionsWith(penalty).length > 0;

  if (incurred(Penalty.DID_NOT_START)) {
    return 'DNS';
  } else if (incurred(Penalty.DID_NOT_FINISH)) {
    return 'DNF';
  } else if (incurred(Penalty.PLUS_2)) {
    let plus2Count = infractionsWith(Penalty.PLUS_2).length;
    let penaltyDuration = duration + plus2Count * 2000;
    let formattedTime = formatElapsedTime(new Date(penaltyDuration));
    return `${formattedTime} (+${plus2Count * 2})`;
  } else {
    return '';
  }
}
