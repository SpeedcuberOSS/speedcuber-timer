import { BluetoothPuzzle, MoveListener } from './BluetoothPuzzle';
import { PUZZLE_2x2x2, PUZZLE_3x3x3, Puzzle } from '../stif';

// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Buffer } from 'buffer';

export class RubiksConnected extends BluetoothPuzzle {
  moveListeners: Map<string, MoveListener> = new Map();
  brand(): string {
    return 'Rubiks Connected';
  }
  puzzle(): Puzzle {
    return PUZZLE_3x3x3;
  }
  addMoveListener(callback: MoveListener, id?: string): void {
    const monitorFunction = (error: any, value: any) => {
      if (error) {
        console.error(`Error while listening to moves: ${error}`);
        return;
      }
      const hexValues = base64ValueToHexArray(value);
      const rawMmessage = parseHexValuesIntoRawMessage(hexValues);
      validateMessage(rawMmessage);
      const message = parseRawMessage(rawMmessage);
      if (message) {
        callback(JSON.stringify(message));
      }
    };
    if (id) {
      if (!this.moveListeners.has(id)) {
        this.moveListeners.set(id, callback);
        this.__monitorTurns(monitorFunction);
      }
    } else {
      this.__monitorTurns(monitorFunction);
    }
  }
  private __monitorTurns(callback: (error: any, value: any) => any) {
    const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    this._device.monitor(callback, serviceUUID, characteristicUUID);
  }
}

export class GoCube extends RubiksConnected {
  brand(): string {
    return 'GoCube';
  }
  puzzle(): Puzzle {
    return PUZZLE_3x3x3;
  }
}

export class GoCube2x2x2 extends RubiksConnected {
  brand(): string {
    return 'GoCube 2x2';
  }
  puzzle(): Puzzle {
    return PUZZLE_2x2x2;
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

export function parseMessage(message: string) {
  const hexValues = base64ValueToHexArray(message);
  const rawMmessage = parseHexValuesIntoRawMessage(hexValues);
  validateMessage(rawMmessage);
  return parseRawMessage(rawMmessage);
}

function parseHexValuesIntoRawMessage(hexValues: string[]): RawGoCubeMessage {
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

function validateMessage(msg: RawGoCubeMessage): void {
  validatePrefix(msg.prefix);
  validateSuffix(msg.suffix);
  validateChecksum(msg);
}

function validatePrefix(prefix: string): void {
  console.assert(prefix === '2A', 'Prefix should be 0x2A');
}

function validateSuffix(suffix: string[]): void {
  console.assert(
    suffix[0] === '0D' && suffix[1] === '0A',
    'Suffix should be 0x0D,0x0A (CR,LF)',
  );
}

function validateChecksum(msg: RawGoCubeMessage) {
  const checksummedParts = [msg.prefix, msg.length, msg.type, ...msg.message];
  const checksum = checksummedParts
    .reduce((a, b) => (parseInt(a, 16) + parseInt(b, 16)).toString(16))
    .toUpperCase();
  console.assert(msg.checksum === checksum, 'Checksum should match');
}

enum GoCubeMessageType {
  Rotation = '01',
  State = '02',
  Orientation = '03',
  Battery = '05',
  OfflineStats = '07',
  CubeType = '08',
}

export function parseRawMessage(msg: RawGoCubeMessage) {
  switch (msg.type) {
    case GoCubeMessageType.Rotation:
      return parseRotationMessage(msg);
    // case GoCubeMessageType.State:
    //   return parseGoCubeStateMessage(msg);
    // case GoCubeMessageType.Orientation:
    //   return parseGoCubeOrientationMessage(msg);
    // case GoCubeMessageType.Battery:
    //   return parseGoCubeBatteryMessage(msg);
    // case GoCubeMessageType.OfflineStats:
    //   return parseGoCubeOfflineStatsMessage(msg);
    // case GoCubeMessageType.CubeType:
    //   return parseGoCubeCubeTypeMessage(msg);
    default:
      (function noop() {
        // Do nothing until other message types are implemented
        // console.warn(`Unsupported message type: ${msg.type}`);
      })();
  }
}

type FaceColor = 'White' | 'Yellow' | 'Blue' | 'Green' | 'Red' | 'Orange';
type Direction = 'clockwise' | 'counterclockwise';
type Angle = 0 | 90 | 180 | 270;
interface GoCubeRotationMessage {
  face: FaceColor;
  direction: Direction;
  angle: Angle;
}

function parseRotationMessage(msg: RawGoCubeMessage): GoCubeRotationMessage {
  const faceRotationInt = parseInt(msg.message[0], 16);
  const angleInt = parseInt(msg.message[1], 16);
  return {
    face: parseFaceColor(faceRotationInt),
    direction: parseDirection(faceRotationInt),
    angle: parseAngle(angleInt),
  };
}

function parseDirection(faceRotationInt: number): Direction {
  return faceRotationInt % 2 === 0 ? 'clockwise' : 'counterclockwise';
}
function parseFaceColor(faceRotationInt: number): FaceColor {
  const faceInt = Math.floor(faceRotationInt / 2);
  switch (faceInt) {
    case 0:
      return 'Blue';
    case 1:
      return 'Green';
    case 2:
      return 'White';
    case 3:
      return 'Yellow';
    case 4:
      return 'Red';
    case 5:
      return 'Orange';
    default:
      throw new Error(`Invalid face number: ${faceRotationInt}`);
  }
}

function parseAngle(angleInt: number): Angle {
  if ([0, 3, 6, 9].indexOf(angleInt) === -1) {
    throw new Error(`Invalid angle number: ${angleInt}`);
  }
  return (angleInt * 30) as Angle;
}
