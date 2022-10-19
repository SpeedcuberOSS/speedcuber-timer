// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BluetoothDevice,
  ConnectionStatus,
  MonitorCallback,
} from './BluetoothDevice';

export class DemoBluetoothDevice extends BluetoothDevice {
  statuses: ConnectionStatus[] = [];
  monitors: Function[] = [];
  mockConnectFunction: () => Promise<any> = () => Promise.resolve();

  constructor() {
    super();
    this.addConnectionStatusListener(s => this.statuses.push(s));
  }
  protected async _connectToDevice(): Promise<any> {
    let result = await this.mockConnectFunction();
    console.debug(`mockConnectionFunction resolved with ${result}`);
    return Promise.resolve(result);
  }
  protected _addMonitor(
    callback: MonitorCallback,
    serviceUUID: string,
    characteristicUUID: string,
  ): void {
    this.monitors.push(callback);
  }
  id(): string {
    return 'mock-id';
  }
  name(): string {
    return 'mock-name';
  }

  delayConnection(delayMillis: number) {
    console.debug(`DemoBluetoothDevice will connect after ${delayMillis}ms`);
    this.mockConnectFunction = () => {
      console.debug(`DemoBluetoothDevice attempting connection`);
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve('connected');
          console.debug('DemoBluetoothDevice connected.');
        }, delayMillis);
      });
    };
  }
}
