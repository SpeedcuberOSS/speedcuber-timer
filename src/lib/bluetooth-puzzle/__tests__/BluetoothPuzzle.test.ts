// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, MoveListener } from '../BluetoothPuzzle';
import { PUZZLE_3x3x3, Puzzle } from '../../stif';

import { ConnectionStatus } from '../BluetoothDevice';
import { MockBluetoothDevice } from './BluetoothDevice.test';

class MockBluetoothPuzzle extends BluetoothPuzzle {
  constructor() {
    super(new MockBluetoothDevice());
  }
  brand(): string {
    return 'Mock Brand';
  }
  puzzle(): Puzzle {
    return PUZZLE_3x3x3;
  }
  addMoveListener(callback: MoveListener): void {
    this._device.monitor(callback, '0000', '0000');
  }

  device(): MockBluetoothDevice {
    return this._device as MockBluetoothDevice;
  }
}

describe('BluetoothPuzzle', () => {
  it('provides a brand', () => {
    const puzzle = new MockBluetoothPuzzle();
    expect(puzzle.brand()).toBe('Mock Brand');
  });
  it('provides a puzzle', () => {
    const puzzle = new MockBluetoothPuzzle();
    expect(puzzle.puzzle()).toBe(PUZZLE_3x3x3);
  });
  it('provides an id', () => {
    const puzzle = new MockBluetoothPuzzle();
    expect(puzzle.id()).toBe('mock-id');
  });
  it('provides a name', () => {
    const puzzle = new MockBluetoothPuzzle();
    expect(puzzle.name()).toBe('mock-name');
  });
  it('provides a connection status', () => {
    const puzzle = new MockBluetoothPuzzle();
    expect(puzzle.connectionStatus()).toBe(ConnectionStatus.DISCONNECTED);
  });
  it('supports connecting', async () => {
    const puzzle = new MockBluetoothPuzzle();
    await puzzle.connect();
    expect(puzzle.connectionStatus()).toEqual(ConnectionStatus.CONNECTED);
  });
  it('allows adding connection status listeners', async () => {
    const puzzle = new MockBluetoothPuzzle();
    const statuses: ConnectionStatus[] = [];
    const listener = (s: ConnectionStatus) => statuses.push(s);

    puzzle.addConnectionStatusListener(listener);
    await puzzle.connect();

    expect(statuses).toEqual([
      ConnectionStatus.CONNECTING,
      ConnectionStatus.CONNECTED,
    ]);
  });
  it('allows adding a move listener', async () => {
    const puzzle = new MockBluetoothPuzzle();
    const moveListener = (move: string) => {};

    await puzzle.connect();
    puzzle.addMoveListener(moveListener);

    expect(puzzle.device().monitors).toEqual([moveListener]);
  });
});
