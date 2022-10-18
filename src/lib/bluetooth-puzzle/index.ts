// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_3x3x3, Puzzle } from '../stif';

type ConnectionStatus = 'pending' | 'connecting' | 'connected' | 'failed';

interface BluetoothDevice {
  connectionStatus: ConnectionStatus;
  name: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  monitor: (uuid: string, callback: (error: any, value: any) => void) => void;
}

interface BluetoothPuzzle extends BluetoothDevice {
  brand: string;
  puzzle: Puzzle;
}

abstract class AbstractBluetoothPuzzle implements BluetoothPuzzle {
  brand: string;
  puzzle: Puzzle;
  connectionStatus: ConnectionStatus;
  name: string;

  private device: BluetoothDevice;

  constructor(device: BluetoothDevice, brand: string, puzzle: Puzzle) {
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
  monitor(uuid: string, callback: (error: any, value: any) => void): void {
    this.device.monitor(uuid, callback);
  }
}

class RubiksConnected extends AbstractBluetoothPuzzle {
  constructor(device: BluetoothDevice) {
    super(device, 'Rubiks Connected', PUZZLE_3x3x3);
  }
}

export { type BluetoothPuzzle, type ConnectionStatus, RubiksConnected };
