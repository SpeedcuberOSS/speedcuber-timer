// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, MoveListener } from './BluetoothPuzzle';
import { PUZZLE_3x3x3, Puzzle } from '../stif';

export class RubiksConnected extends BluetoothPuzzle {
  brand(): string {
    return 'Rubiks Connected';
  }
  puzzle(): Puzzle {
    return PUZZLE_3x3x3;
  }
  addMoveListener(callback: MoveListener): void {
    const monitorFunction = (error: any, value: any) => {
      if (error) {
        console.error(`Error while listening to moves: ${error}`);
        return;
      }
      const move = value.toString();
      callback(move);
    };
    this.__monitorTurns(monitorFunction);
  }
  private __monitorTurns(callback: (error: any, value: any) => any) {
    const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    this._device.monitor(callback, serviceUUID, characteristicUUID);
  }
}
