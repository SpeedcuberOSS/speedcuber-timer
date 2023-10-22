// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import formatElapsedTime from '../formatElapsedTime';

const MILLIS = 1;
const SECONDS = 1_000 * MILLIS;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;

describe('format_elapsed_time', () => {
  it.each([
    [0 * SECONDS, '0.000'],
    [1 * MILLIS, '0.001'],
    [1 * SECONDS, '1.000'],
    [12 * SECONDS, '12.000'],
    [1 * SECONDS + 50 * MILLIS, '1.050'],
    [1 * MINUTES + 5 * SECONDS, '1:05.000'],
    [1 * MINUTES + 23 * SECONDS, '1:23.000'],
    [1 * MINUTES + 1 * SECONDS + 500 * MILLIS, '1:01.500'],
    [36 * MINUTES + 0 * SECONDS + 43 * MILLIS, '36:00.043'],
    [1 * HOURS + 12 * MINUTES + 1 * SECONDS + 500 * MILLIS, '1:12:01.500'],
    [1 * HOURS + 7 * SECONDS + 500 * MILLIS, '1:00:07.500'],
    [12 * HOURS + 7 * SECONDS + 500 * MILLIS, '12:00:07.500'],
    [96 * HOURS + 59 * MINUTES + 59 * SECONDS + 999 * MILLIS, '96:59:59.999'],
    // Negative numbers ???
  ])('formats %p as %p', (value, expected) => {
    expect(formatElapsedTime(value)).toBe(expected);
  });
});
