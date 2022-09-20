// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
const NOT_STARTED: number = -1;
const NOT_STOPPED: number = -1;

class Timer {
  private _startTime: number = NOT_STARTED;
  private _stopTime: number = NOT_STOPPED;

  constructor() {
    this.reset();
  }

  public start(): void {
    if (this._startTime === NOT_STARTED) {
      this._startTime = new Date().getTime();
    } else {
      throw new Error('Timer already started');
    }
  }

  public stop(): void {
    if (!this.isStarted()) {
      throw new Error('Timer not started');
    } else if (this.isStopped()) {
      throw new Error('Timer already stopped');
    } else {
      this._stopTime = new Date().getTime();
    }
  }

  public reset(): void {
    this._startTime = NOT_STARTED;
    this._stopTime = NOT_STOPPED;
  }

  public isStarted(): boolean {
    return this._startTime !== NOT_STARTED;
  }

  public isStopped(): boolean {
    return this._stopTime !== NOT_STOPPED;
  }

  public isRunning(): boolean {
    return this.isStarted() && !this.isStopped();
  }

  public elapsedMilliseconds(): number {
    if (this._startTime === NOT_STARTED) {
      return 0;
    } else if (this._stopTime === NOT_STOPPED) {
      return new Date().getTime() - this._startTime;
    } else {
      return this._stopTime - this._startTime;
    }
  }
}

export { Timer };
