// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { sliding } from '../sliding';

const durations = require('../__fixtures__/durations.json').map((d: number | null) => d || Infinity);
const Ao5 = require('../__fixtures__/Ao5.json');
const Ao12 = require('../__fixtures__/Ao12.json');
const Ao50 = require('../__fixtures__/Ao50.json');
const Ao100 = require('../__fixtures__/Ao100.json');
const Ao1000 = require('../__fixtures__/Ao1000.json');

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
  it('returns an array of length two when given x+1 numbers', () => {
    expect(sliding([1, 2, 3, 4, 5, 6]).AoX(5)).toEqual([3, 4]);
  });
  it('computes the sliding average of x with random separations between numbers', () => {
    expect(sliding([1, 5, 3, 2, 4, 6]).AoX(5)).toEqual([3, 4]);
  });
  it('handles removing best and inserting best', () => {
    expect(sliding([1, 3, 5, 7, 9, 0]).AoX(5)).toEqual([5, 5]);
  })
  it('handles removing best and inserting counting', () => {
    expect(sliding([1, 3, 5, 7, 9, 6]).AoX(5)).toEqual([5, 6]);
  })
  it('handles removing best and inserting worst', () => {
    expect(sliding([1, 3, 5, 7, 9, 10]).AoX(5)).toEqual([5, 7]);
  })
  it('handles removing counting and inserting best', () => {
    expect(sliding([3, 1, 5, 7, 9, 0]).AoX(5)).toEqual([5, 4]);
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
  // TODO handle cases likely to overflow...

  it('Ao5', () => {
    const x = 5
    expect(sliding(durations).AoX(x)).toEqual(Ao5);
  });

  it('Ao12', () => {
    const x = 12
    expect(sliding(durations).AoX(x)).toEqual(Ao12);
  });

  it('Ao50', () => {
    const x = 50
    expect(sliding(durations).AoX(x)).toEqual(Ao50);  // Rounding errors
  });

  it('Ao100', () => {
    const x = 100
    expect(sliding(durations).AoX(x)).toEqual(Ao100);    // Rounding errors
  });

  it('Ao1000', () => {
    const x = 1000
    expect(sliding(durations).AoX(x)).toEqual(Ao1000);
  });
});
