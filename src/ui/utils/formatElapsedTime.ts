// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../lib/stif/wrappers';
import { Milliseconds } from '../../lib/stif';

const MILLIS = 1;
const SECONDS = 1_000 * MILLIS;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;

/**
 * Pads a number with leading zeros to the specified number of places.
 */
function zpad(num: number, places: number = 2): string {
  const str = `${num}`;
  const zeros = '0'.repeat(places - str.length);
  return `${zeros}${str}`;
}

export default function formatElapsedTime(elapsed: Milliseconds): string {
  let [hours, rhours] = [Math.floor(elapsed / HOURS), elapsed % HOURS];
  let [mins, rmins] = [Math.floor(rhours / MINUTES), rhours % MINUTES];
  let [secs, millis] = [Math.floor(rmins / SECONDS), rmins % SECONDS];

  const hourstr = hours > 0 ? `${hours}:` : '';
  const minstr = hours > 0 ? `${zpad(mins)}:` : mins > 0 ? `${mins}:` : '';
  const secstr = hours > 0 || mins > 0 ? `${zpad(secs)}.` : `${secs}.`;
  const millistr = zpad(millis, 3);

  return `${hourstr}${minstr}${secstr}${millistr}`;
}

export function getAttemptTimeString(attempt: Attempt): string {
  let result = attempt.result();
  if (typeof result === 'string') {
    return result;
  } else {
    let formattedTime = formatElapsedTime(result);
    let plus2String =
      attempt.penaltyCount('+2') > 0
        ? ` (+${attempt.penaltyCount('+2') * 2})`
        : '';
    return `${formattedTime}${plus2String}`;
  }
}
