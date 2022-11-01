// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Buffer } from 'buffer';
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
      const messageHexValues = base64ValueToHexArray(value);
      const message = parseGoCubeMessage(messageHexValues);
      validateGoCubeMessage(message);
      callback(JSON.stringify(message));
    };
    this.__monitorTurns(monitorFunction);
  }
  private __monitorTurns(callback: (error: any, value: any) => any) {
    const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    this._device.monitor(callback, serviceUUID, characteristicUUID);
  }
}

function base64ValueToHexArray(value: string): string[] {
  const hexString = Buffer.from(value, 'base64').toString('hex');
  const hexDigits = hexString.match(/.{1,2}/g);
  return (hexDigits ? hexDigits : []).map(v => v.toUpperCase());
}

interface RawGoCubeMessage {
  prefix: string;
  length: string;
  type: string;
  message: string[];
  checksum: string;
  suffix: string[];
}

function parseGoCubeMessage(hexValues: string[]): RawGoCubeMessage {
  // https://github.com/oddpetersson/gocube-protocol/blob/main/README.md#common-message-format
  const MSG_LENGTH = parseInt(hexValues[1], 16);
  return {
    prefix: hexValues[0],
    length: hexValues[1],
    type: hexValues[2],
    message: hexValues.slice(3, 3 + (MSG_LENGTH - 4)),
    checksum: hexValues[MSG_LENGTH - 1],
    suffix: hexValues.slice(-2),
  };
}

function validateGoCubeMessage(msg: RawGoCubeMessage): void {
  validateGoCubeMessagePrefix(msg.prefix);
  validateGoCubeMessageSuffix(msg.suffix);
  validateGoCubeMessageChecksum(msg);
}

function validateGoCubeMessagePrefix(prefix: string): void {
  console.assert(prefix === '2A', 'Prefix should be 0x2A');
}

function validateGoCubeMessageSuffix(suffix: string[]): void {
  console.assert(
    suffix[0] === '0D' && suffix[1] === '0A',
    'Suffix should be 0x0D,0x0A (CR,LF)',
  );
}

function validateGoCubeMessageChecksum(msg: RawGoCubeMessage) {
  const checksummedParts = [msg.prefix, msg.length, msg.type, ...msg.message];
  const checksum = checksummedParts
    .reduce((a, b) => (parseInt(a, 16) + parseInt(b, 16)).toString(16))
    .toUpperCase();
  console.assert(msg.checksum === checksum, 'Checksum should match');
}

// The following code is modified from cubing.js
// https://github.com/cubing/cubing.js/blob/4b8891790c651de031d8a35dd7687f59db5e84e2/src/cubing/bluetooth/smart-puzzle/gocube.ts

// https://stackoverflow.com/a/40031979
// function buf2hex(buffer: ArrayBuffer): string {
//   // buffer is an ArrayBuffer
//   return (
//     Array.prototype.map.call(new Uint8Array(buffer), (x: number) =>
//       `00${x.toString(16).padStart(2, '0')}`.slice(-2),
//     ) as string[]
//   ).join(' ');
// }

// const moveMap: string[] = [
//   'B',
//   "B'",
//   'F',
//   "F'",
//   'U',
//   "U'",
//   'D',
//   "D'",
//   'R',
//   "R'",
//   'L',
//   "L'",
// ];

// function binaryToUsefulData(event: any): string {
//   const buffer: DataView = event.target.value;
//   this.recorded.push([event.timeStamp, buf2hex(buffer.buffer)]);
//   // TODO: read bytes from buffer instead of guessing meaning based on length.
//   if (buffer.byteLength < 16) {
//     return parseAlgMove(buffer, event);
//   } else {
//     return '';
//     // return parseCubeRotation(buffer, event);
//   }
// }

// function parseAlgMove(buffer: DataView, event: any): string {
//   for (let i = 3; i < buffer.byteLength - 4; i += 2) {
//     const move = moveMap[buffer.getUint8(i)];
//     this.alg = experimentalAppendMove(this.alg, move);
//     this.dispatchAlgLeaf({
//       latestAlgLeaf: moveMap[buffer.getUint8(i)],
//       timeStamp: event.timeStamp,
//       debug: {
//         stateStr: buf2hex(buffer.buffer),
//       },
//     });
//   }
// }

// function parseCubeRotation(buffer: DataView, event: any) {
//   const coords = bufferToString(buffer.buffer.slice(3, buffer.byteLength - 3))
//     .split('#')
//     .map(s => parseInt(s, 10) / 16384);
//   const quat = new Quaternion(coords[0], coords[1], coords[2], coords[3]);

//   this.lastRawQuat = quat.clone();

//   if (!this.homeQuatInverse) {
//     this.homeQuatInverse = quat.clone().invert();
//   }

//   const targetQuat = quat.clone().multiply(this.homeQuatInverse.clone());
//   targetQuat.y = -targetQuat.y; // GoCube axis fix.

//   this.lastTarget.slerp(targetQuat, 0.5);
//   this.currentQuat.rotateTowards(this.lastTarget, rotateTowardsRate);

//   this.dispatchOrientation({
//     quaternion: this.currentQuat,
//     timeStamp: event.timeStamp,
//   });
// }
