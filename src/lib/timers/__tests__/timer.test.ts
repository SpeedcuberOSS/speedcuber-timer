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
  describe('upon initialization', () => {
    it('has 0 elapsed time', () => {
      expect(new Timer().elapsedMilliseconds()).toBe(0);
    });

    it('is not started', () => {
      expect(new Timer().isStarted()).toBe(false);
    });

    it('is not stopped', () => {
      expect(new Timer().isStopped()).toBe(false);
    });

    it('is not running', () => {
      expect(new Timer().isRunning()).toBe(false);
    });
  });
  describe('upon starting', () => {
    it('is started', () => {
      const timer = new Timer();
      timer.start();
      expect(timer.isStarted()).toBe(true);
    });

    it('is not stopped', () => {
      const timer = new Timer();
      timer.start();
      expect(timer.isStopped()).toBe(false);
    });

    it('is running', () => {
      const timer = new Timer();
      timer.start();
      expect(timer.isRunning()).toBe(true);
    });

    it('has elapsed time', async () => {
      const timer = new Timer();
      timer.start();
      await sleep(2);
      expect(timer.elapsedMilliseconds()).toBeGreaterThan(0);
    });
    it('reports more elapsed millis over time', async () => {
      const timer = new Timer();
      timer.start();
      await sleep(2);
      let firstElapsedTime = timer.elapsedMilliseconds();
      await sleep(2);
      let secondElapsedTime = timer.elapsedMilliseconds();
      expect(secondElapsedTime).toBeGreaterThan(firstElapsedTime);
    });
    it('throws an exception if the timer is already started', () => {
      const timer = new Timer();
      timer.start();
      expect(() => timer.start()).toThrow();
    });
    // TODO what should happen when starting a stopped timer?
  });

  describe('upon stopping', () => {
    it('is started', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      expect(timer.isStarted()).toBe(true);
    });
    it('is stopped', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      expect(timer.isStopped()).toBe(true);
    });
    it('is not running', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      expect(timer.isRunning()).toBe(false);
    });
    it('has elapsed time', async () => {
      const timer = new Timer();
      timer.start();
      await sleep(2);
      timer.stop();
      expect(timer.elapsedMilliseconds()).toBeGreaterThan(0);
    });
    it('reports the same elapsed millis over time', async () => {
      const timer = new Timer();
      timer.start();
      await sleep(2);
      timer.stop();
      let firstElapsedTime = timer.elapsedMilliseconds();
      await sleep(2);
      let secondElapsedTime = timer.elapsedMilliseconds();
      expect(secondElapsedTime).toBe(firstElapsedTime);
    });
    it('throws an exception if the timer is not started', () => {
      const timer = new Timer();
      expect(() => timer.stop()).toThrow();
    });
    it('throws an exception if the timer is already stopped', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      expect(() => timer.stop()).toThrow();
    });
  });
  describe('upon resetting', () => {
    it('is not started', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      timer.reset();
      expect(timer.isStarted()).toBe(false);
    });
    it('is not stopped', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      timer.reset();
      expect(timer.isStopped()).toBe(false);
    });
    it('is not running', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      timer.reset();
      expect(timer.isRunning()).toBe(false);
    });
    it('has 0 elapsed time', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      timer.reset();
      expect(timer.elapsedMilliseconds()).toBe(0);
    });
    it('does not throw an exception if the timer is not started', () => {
      const timer = new Timer();
      expect(() => timer.reset()).not.toThrow();
    });
    it('does not throw an exception if the timer is already stopped', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      expect(() => timer.reset()).not.toThrow();
    });
    it('does not throw an exception if the timer is running', () => {
      const timer = new Timer();
      timer.start();
      expect(() => timer.reset()).not.toThrow();
    });
    it('does not throw an exception if the timer is already reset', () => {
      const timer = new Timer();
      timer.start();
      timer.stop();
      timer.reset();
      expect(() => timer.reset()).not.toThrow();
    });
  });
});
