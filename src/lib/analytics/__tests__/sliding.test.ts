// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { sliding } from '../sliding';

describe('sliding', () => {
  it('returns an empty array when given no numbers', () => {
    expect(sliding([]).AoX(5)).toEqual([]);
  });
  it('returns an empty array when given fewer than x numbers', () => {
    expect(sliding([1, 2, 3]).AoX(5)).toEqual([]);
  });
  it('returns an array of length one when given x numbers', () => {
    expect(sliding([1, 2, 3, 4, 5]).AoX(5)).toEqual([3]);
  });

  it('handles removing best and inserting best', () => {
    expect(sliding([1, 3, 5, 7, 9, 0]).AoX(5)).toEqual([5, 5]);
  });
  it('handles removing best and inserting counting', () => {
    expect(sliding([1, 3, 5, 7, 9, 6]).AoX(5)).toEqual([5, 6]);
  });
  it('handles removing best and inserting worst', () => {
    expect(sliding([1, 3, 5, 7, 9, 10]).AoX(5)).toEqual([5, 7]);
  });

  it('handles removing counting and inserting best', () => {
    expect(sliding([3, 1, 5, 7, 9, 0]).AoX(5)).toEqual([5, 4 + 1 / 3]);
  });
  it('handles removing counting and inserting counting', () => {
    expect(sliding([3, 1, 5, 7, 9, 6]).AoX(5)).toEqual([5, 6]);
  });
  it('handles removing counting and inserting worst', () => {
    expect(sliding([3, 1, 5, 7, 9, 10]).AoX(5)).toEqual([5, 7]);
  });

  it('handles removing worst and inserting best', () => {
    expect(sliding([9, 7, 5, 3, 1, 0]).AoX(5)).toEqual([5, 3]);
  });
  it('handles removing worst and inserting counting', () => {
    expect(sliding([9, 7, 5, 3, 1, 4]).AoX(5)).toEqual([5, 4]);
  });
  it('handles removing worst and inserting worst', () => {
    expect(sliding([9, 7, 5, 3, 1, 10]).AoX(5)).toEqual([5, 5]);
  });

  it('handles infinities spilling into counting territory', () => {
    expect(sliding([Infinity, 1, 2, 3, Infinity, 4]).AoX(5)).toEqual([
      Infinity,
      3,
    ]);
  });
  // TODO handle cases likely to overflow...
});

describe('sliding (performance tests)', () => {
  const durations = require('../__fixtures__/durations.json').map(
    (d: number | null) => d || Infinity,
  );
  const Ao5 = require('../__fixtures__/Ao5.json');
  const Ao12 = require('../__fixtures__/Ao12.json');
  const Ao50 = require('../__fixtures__/Ao50.json');
  const Ao100 = require('../__fixtures__/Ao100.json');
  const Ao1000 = require('../__fixtures__/Ao1000.json');

  test('Ao5', () => {
    const x = 5;
    const rounded_result = sliding(durations)
      .AoX(x)
      .map((n: number) => Math.round(n));
    expect(rounded_result).toEqual(Ao5);
  });

  test('Ao12', () => {
    const x = 12;
    const rounded_result = sliding(durations)
      .AoX(x)
      .map((n: number) => Math.round(n));
    expect(rounded_result).toEqual(Ao12);
  });

  test('Ao50', () => {
    const x = 50;
    const rounded_result = sliding(durations)
      .AoX(x)
      .map((n: number) => Math.round(n));
    expect(rounded_result).toEqual(Ao50);
  });

  test('Ao100', () => {
    const x = 100;
    const rounded_result = sliding(durations)
      .AoX(x)
      .map((n: number) => Math.round(n));
    expect(rounded_result).toEqual(Ao100);
  });

  test('Ao1000', () => {
    const x = 1000;
    const rounded_result = sliding(durations)
      .AoX(x)
      .map((n: number) => Math.round(n));
    expect(rounded_result).toEqual(Ao1000);
  });
});
