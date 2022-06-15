// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Timer } from '..';

async function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Timer', () => {
  it('initializes with 0 elapsed time', () => {
    expect(new Timer().elapsedMilliseconds()).toBe(0);
  });

  it('is not running when initialized', () => {
    expect(new Timer().isRunning()).toBe(false);
  });

  it('is running if it is started', () => {
    const timer = new Timer();
    timer.start();
    expect(timer.isRunning()).toBe(true);
  });

  it('is not running if it is stopped', async () => {
    const timer = new Timer();
    timer.start();
    await sleep(2);
    timer.stop();
    expect(timer.isRunning()).toBe(false);
  });

  it('has > 0 elapsed time after starting', async () => {
    const timer = new Timer();
    timer.start();
    await sleep(2);
    expect(timer.elapsedMilliseconds()).toBeGreaterThan(0);
  });

  test('after starting, successive calls to elapsed time yield larger values', async () => {
    const timer = new Timer();
    timer.start();
    await sleep(2);
    let firstElapsedTime = timer.elapsedMilliseconds();
    await sleep(2);
    let secondElapsedTime = timer.elapsedMilliseconds();
    expect(secondElapsedTime).toBeGreaterThan(firstElapsedTime);
  });

  test('stopping a started timer stops the timer.', async () => {
    const timer = new Timer();
    timer.start();
    await sleep(2);
    timer.stop();
    let firstElapsedTime = timer.elapsedMilliseconds();
    await sleep(2);
    let secondElapsedTime = timer.elapsedMilliseconds();
    expect(secondElapsedTime).toBe(firstElapsedTime);
  });

  it('does nothing when stopping a stopped timer', async () => {
    const timer = new Timer();
    timer.stop();
    let firstElapsedTime = timer.elapsedMilliseconds();
    await sleep(2);
    let secondElapsedTime = timer.elapsedMilliseconds();
    expect(secondElapsedTime).toBe(firstElapsedTime);
  });

  it('throws an exception when starting a started timer', () => {
    const timer = new Timer();
    timer.start();
    expect(() => timer.start()).toThrow();
  });

  test('resetting a running timer clears elapsed time', async () => {
    const timer = new Timer();
    timer.start();
    await sleep(2);
    expect(timer.elapsedMilliseconds()).toBeGreaterThan(0);
    timer.reset();
    expect(timer.elapsedMilliseconds()).toBe(0);
  });

  // TODO what should happen when starting a stopped timer?
});
