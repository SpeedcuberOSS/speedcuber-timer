// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import format_elapsed_time from '../format_elapsed_time';

describe('format_elapsed_time', () => {
  it('formats a number of seconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setSeconds(1);
    expect(format_elapsed_time(elapsed)).toBe('1.000');

    elapsed.setSeconds(12);
    expect(format_elapsed_time(elapsed)).toBe('12.000');
  });
  it('formats a number of seconds and milliseconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setSeconds(1);
    elapsed.setMilliseconds(50);
    expect(format_elapsed_time(elapsed)).toBe('1.050');
  });
  it('formats a number of minutes and seconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setMinutes(1);
    elapsed.setSeconds(23);
    expect(format_elapsed_time(elapsed)).toBe('1:23.000');
  });
  it('pads the seconds with a leading zero if showing minutes and seconds < 10', () => {
    const elapsed = new Date(0);
    elapsed.setMinutes(1);
    elapsed.setSeconds(5);
    expect(format_elapsed_time(elapsed)).toBe('1:05.000');
  });
  it('formats a number of minutes, seconds and milliseconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setMinutes(1);
    elapsed.setSeconds(1);
    elapsed.setMilliseconds(500);
    expect(format_elapsed_time(elapsed)).toBe('1:01.500');
  });
  it('formats a number of hours, minutes, seconds and milliseconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setHours(1);
    elapsed.setMinutes(12);
    elapsed.setSeconds(1);
    elapsed.setMilliseconds(500);
    expect(format_elapsed_time(elapsed)).toBe('1:12:01.500');
  });
  it('formats a number of hours, seconds and milliseconds as a string', () => {
    const elapsed = new Date(0);
    elapsed.setHours(1);
    elapsed.setSeconds(1);
    elapsed.setMilliseconds(500);
    expect(format_elapsed_time(elapsed)).toBe('1:00:01.500');
  });
});
