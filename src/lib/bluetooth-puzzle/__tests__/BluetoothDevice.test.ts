// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ConnectionStatus } from '../BluetoothDevice';
import { DemoBluetoothDevice } from '../DemoBluetoothDevice';
import { Timer } from '../../timers';

describe('BluetoothDevice', () => {
  it('provides an id', () => {
    const device = new DemoBluetoothDevice();
    expect(device.id()).toBe('mock-id');
  });
  it('provides a name', () => {
    const device = new DemoBluetoothDevice();
    expect(device.name()).toBe('mock-name');
  });
  describe('monitor', () => {
    it('rejects attempts to add a monitor to a disconnected device', () => {
      const device = new DemoBluetoothDevice();
      expect(() => {
        device.monitor(() => {}, 'service-uuid', 'characteristic-uuid');
      }).toThrowError('Cannot monitor a disconnected device');
    });
    it('allows adding a monitor to a connected device', async () => {
      const device = new DemoBluetoothDevice();
      const callback = () => {};

      await device.connect();
      device.monitor(callback, 'service-uuid', 'characteristic-uuid');

      expect(device.monitors).toEqual([callback]);
    });
  });
  describe('connectionStatus', () => {
    it('starts as disconnected', () => {
      const device = new DemoBluetoothDevice();
      expect(device.connectionStatus()).toEqual(ConnectionStatus.DISCONNECTED);
    });
    it('becomes connected after a successful connection', async () => {
      const device = new DemoBluetoothDevice();

      await device.connect();

      expect(device.statuses).toEqual([
        ConnectionStatus.CONNECTING,
        ConnectionStatus.CONNECTED,
      ]);
      expect(device.connectionStatus()).toEqual(ConnectionStatus.CONNECTED);
    });
    it('becomes disconnected after a failed connection', async () => {
      const device = new DemoBluetoothDevice();
      device.mockConnectFunction = () => Promise.reject();

      await device.connect();

      expect(device.statuses).toEqual([
        ConnectionStatus.CONNECTING,
        ConnectionStatus.DISCONNECTED,
      ]);
      expect(device.connectionStatus()).toEqual(ConnectionStatus.DISCONNECTED);
    });
    it('becomes disconnected if connection does not succeed before the timeout', async () => {
      const device = new DemoBluetoothDevice();
      device.delayConnection(5000);
      const timer = new Timer();

      timer.start();
      await device.connect(100);
      timer.stop();

      expect(timer.elapsedMilliseconds()).toBeLessThan(200);
      expect(device.statuses).toEqual([
        ConnectionStatus.CONNECTING,
        ConnectionStatus.DISCONNECTED,
      ]);
      expect(device.connectionStatus()).toEqual(ConnectionStatus.DISCONNECTED);
    });
  });
});
