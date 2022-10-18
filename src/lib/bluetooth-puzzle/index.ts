// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_3x3x3, Puzzle } from '../stif';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'failed';

interface BluetoothDevice {
  id: string;
  connectionStatus: ConnectionStatus;
  name: string;
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
  monitor: (
    callback: (error: any, value: any) => any,
    serviceUUID: string,
    characteristicUUID: string,
  ) => any;
}

interface BluetoothPuzzle extends BluetoothDevice {
  brand: string;
  puzzle: Puzzle;
  monitorTurns: (callback: (error: any, value: any) => any) => any;
}

abstract class AbstractBluetoothPuzzle implements BluetoothPuzzle {
  id: string;
  brand: string;
  puzzle: Puzzle;
  connectionStatus: ConnectionStatus;
  name: string;

  private device: BluetoothDevice;

  constructor(device: BluetoothDevice, brand: string, puzzle: Puzzle) {
    this.id = device.id;
    this.brand = brand;
    this.puzzle = puzzle;
    this.connectionStatus = device.connectionStatus;
    this.name = device.name;
    this.device = device;
  }
  connect(): Promise<void> {
    return this.device.connect();
  }
  disconnect(): Promise<void> {
    return this.device.disconnect();
  }
  monitor(
    callback: (error: any, value: any) => any,
    serviceUUID: string,
    characteristicUUID: string,
  ): void {
    this.device.monitor(callback, serviceUUID, characteristicUUID);
  }
  abstract monitorTurns(callback: (error: any, value: any) => any): any;
}

class RubiksConnected extends AbstractBluetoothPuzzle {
  constructor(device: BluetoothDevice) {
    super(device, 'Rubiks Connected', PUZZLE_3x3x3);
  }
  monitorTurns(callback: (error: any, value: any) => any) {
    const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    super.monitor(callback, serviceUUID, characteristicUUID);
  }
}

export {
  type BluetoothPuzzle,
  type ConnectionStatus,
  type BluetoothDevice,
  RubiksConnected,
};
