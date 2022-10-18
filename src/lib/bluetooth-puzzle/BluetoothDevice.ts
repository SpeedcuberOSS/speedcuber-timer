// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { timeout } from './timeout';

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
}
export type ConnectionStatusListener = (status: ConnectionStatus) => void;
export type MonitorCallback = (error: any, value: any) => any;
export const DEFAULT_TIMEOUT_MILLIS = 3000;

export abstract class BluetoothDevice {
  protected _connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  protected _connectionStatusListeners: ConnectionStatusListener[] = [];
  protected abstract _connectToDevice(): Promise<any>;
  protected abstract _addMonitor(
    callback: MonitorCallback,
    serviceUUID: string,
    characteristicUUID: string,
  ): void;
  abstract id(): string;
  abstract name(): string;
  monitor(
    callback: MonitorCallback,
    serviceUUID: string,
    characteristicUUID: string,
  ): void {
    if (this.connectionStatus() !== ConnectionStatus.CONNECTED) {
      throw new Error('Cannot monitor a disconnected device');
    }
    this._addMonitor(callback, serviceUUID, characteristicUUID);
  }
  connectionStatus(): ConnectionStatus {
    return this._connectionStatus;
  }
  addConnectionStatusListener(listener: ConnectionStatusListener) {
    this._connectionStatusListeners.push(listener);
  }
  async connect(timeoutMillis: number = DEFAULT_TIMEOUT_MILLIS): Promise<any> {
    let result = null;
    this.__setConnectionStatus(ConnectionStatus.CONNECTING);
    try {
      result = await timeout(
        this._connectToDevice(),
        timeoutMillis,
        new Error(`Timeout of ${timeoutMillis}ms exceeded`),
      );
      this.__setConnectionStatus(ConnectionStatus.CONNECTED);
    } catch (e) {
      if (
        e instanceof Error &&
        e.message !== `Timeout of ${timeoutMillis}ms exceeded`
      ) {
        console.error(e);
      }
      this.__setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
    return Promise.resolve(result);
  }
  private __setConnectionStatus(status: ConnectionStatus) {
    this._connectionStatus = status;
    this._connectionStatusListeners.forEach(listener => listener(status));
  }
}
