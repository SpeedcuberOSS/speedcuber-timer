// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Buffer } from 'buffer';

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
export const parseMessage = (message: string) => {
  let parsedMove = '';
  let parsedMessage = parseParticulaMessage(message);
  if (!parsedMessage?.hasOwnProperty('x')) {
    parsedMove = convertParticulaRotationMessageToAlgMove(parsedMessage);
  }
  return parsedMove;
};
function convertParticulaRotationMessageToAlgMove(message: any) {
  const { face, direction } = message;
  let moveStr = '';
  moveStr += face === 'White' ? 'U' : '';
  moveStr += face === 'Yellow' ? 'D' : '';
  moveStr += face === 'Red' ? 'R' : '';
  moveStr += face === 'Orange' ? 'L' : '';
  moveStr += face === 'Green' ? 'F' : '';
  moveStr += face === 'Blue' ? 'B' : '';
  moveStr += direction === 'clockwise' ? '' : "'";
  return moveStr;
}
export function parseParticulaMessage(message: string) {
  const hexValues = base64ValueToHexArray(message);
  const rawMessage = parseHexValuesIntoRawMessage(hexValues);
  try {
    validateMessage(rawMessage);
    return parseRawMessage(rawMessage);
  } catch (e) {
    throw new Error(
      `Couldn't parse message because '${e}': ${message} -> ${JSON.stringify(
        rawMessage,
      )}`,
    );
  }
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
  if (prefix !== '2A') {
    throw new Error(`Invalid prefix: ${prefix}`);
  }
}

function validateSuffix(suffix: string[]): void {
  if (suffix.length !== 2 || suffix[0] !== '0D' || suffix[1] !== '0A') {
    throw new Error(
      `Invalid suffix: ${JSON.stringify(suffix)}. Should be 0x0D,0x0A (CR,LF)`,
    );
  }
}

function validateChecksum(msg: RawGoCubeMessage): void {
  const checksummedParts = [msg.prefix, msg.length, msg.type, ...msg.message];
  const summedParts = checksummedParts
    .reduce((a, b) => (parseInt(a, 16) + parseInt(b, 16)).toString(16))
    .toUpperCase();
  const checksumValue = (parseInt(summedParts, 16) % parseInt('100', 16))
    .toString(16)
    .toUpperCase();
  const checksum =
    checksumValue.length === 1 ? `0${checksumValue}` : checksumValue;
  if (checksum !== msg.checksum) {
    throw new Error(`Invalid checksum: ${checksum}. Should be ${msg.checksum}`);
  }
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
    //   return parseStateMessage(msg);
    case GoCubeMessageType.Orientation:
      return parseOrientationMessage(msg);
    // case GoCubeMessageType.Battery:
    //   return parseBatteryMessage(msg);
    // case GoCubeMessageType.OfflineStats:
    //   return parseOfflineStatsMessage(msg);
    // case GoCubeMessageType.CubeType:
    //   return parseCubeTypeMessage(msg);
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

interface GoCubeOrientationMessage {
  x: number;
  y: number;
  z: number;
  w: number;
}

function parseOrientationMessage(
  message: RawGoCubeMessage,
): GoCubeOrientationMessage {
  const DELIMETER = '23';
  const parts: string[][] = [[]];
  message.message.forEach(m => {
    if (m === DELIMETER) {
      parts.push([]);
    } else {
      parts[parts.length - 1].push(m);
    }
  });
  const [x, y, z, w] = parts.map(p =>
    parseInt(Buffer.from(p.join(''), 'hex').toString()),
  );
  return { x, y, z, w };
}
