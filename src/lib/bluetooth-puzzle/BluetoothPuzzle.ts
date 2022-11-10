// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BluetoothDevice,
  ConnectionStatus,
  ConnectionStatusListener,
  DEFAULT_TIMEOUT_MILLIS,
} from './BluetoothDevice';

import { Puzzle } from '../stif';

export type MoveListener = (move: string) => void;

export abstract class BluetoothPuzzle {
  protected _device: BluetoothDevice;
  abstract brand(): string;
  abstract puzzle(): Puzzle;
  abstract addMoveListener(callback: MoveListener, id?: string): void;

  private connectionListeners: Map<string, ConnectionStatusListener> =
    new Map();

  constructor(device: BluetoothDevice) {
    this._device = device;
  }
  id(): string {
    return this._device.id();
  }
  name(): string {
    return this._device.name();
  }
  connectionStatus(): ConnectionStatus {
    return this._device.connectionStatus();
  }
  addConnectionStatusListener(listener: ConnectionStatusListener, id?: string) {
    if (id) {
      if (!this.connectionListeners.has(id)) {
        this.connectionListeners.set(id, listener);
        this._device.addConnectionStatusListener(listener);
      }
    } else {
      this._device.addConnectionStatusListener(listener);
    }
  }
  async connect(timeoutMillis: number = DEFAULT_TIMEOUT_MILLIS): Promise<any> {
    return this._device.connect(timeoutMillis);
  }
}
