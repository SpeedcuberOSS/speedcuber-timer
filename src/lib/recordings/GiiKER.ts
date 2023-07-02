// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// The contents of this file are largely copied from
// https://github.com/cubing/cubing.js/blob/main/src/cubing/bluetooth/smart-puzzle/giiker.ts
// Which is licensed under the MPL-2.0 (See https://github.com/cubing/cubing.js/issues/208)

import { Buffer } from 'buffer';

export function parseMessage(message: string) {
  const buffer = Buffer.from(message, 'base64').buffer;
  const val = decodeState(new Uint8Array(buffer));
  console.debug(val);
  console.debug(val);

  // if (this.isRepeatedInitialValue(val)) {
  //   console.debug("Skipping repeated initial value.");
  //   return;
  // }

  const giikerState = [];
  for (let i = 0; i < MESSAGE_LENGTH; i++) {
    giikerState.push(Math.floor(val[i] / 16));
    giikerState.push(val[i] % 16);
  }
  console.debug(giikerState);
  const str = giikerStateStr(giikerState);
  console.debug(str);
  return giikerMoveToAlgMove(giikerState[32], giikerState[33]);
}

const MESSAGE_LENGTH = 20;

function giikerMoveToAlgMove(face: number, amount: number): string {
  let direction: string = '';
  switch (amount) {
    case 3: {
      direction = "'";
      break;
    }
    case 9: {
      console.debug('Encountered 9', face, amount);
      direction = '2';
      break;
    }
  }

  const family = ['?', 'B', 'D', 'L', 'U', 'R', 'F'][face];

  return `${family}${direction}`;
}

export { giikerMoveToAlgMove as giikerMoveToAlgMoveForTesting };

function giikerStateStr(giikerState: number[]): string {
  let str = '';
  str += giikerState.slice(0, 8).join('.');
  str += '\n';
  str += giikerState.slice(8, 16).join('.');
  str += '\n';
  str += giikerState.slice(16, 28).join('.');
  str += '\n';
  str += giikerState.slice(28, 32).join('.');
  str += '\n';
  str += giikerState.slice(32, 40).join('.');
  return str;
}

// TODO
// const Reid333Orbits = {
//   "EDGES":   {"numPieces": 12, "orientations": 2},
//   "CORNERS": {"numPieces": 8,  "orientations": 3},
//   "CENTERS": {"numPieces": 6,  "orientations": 4}
// };

const Reid333SolvedCenters = {
  pieces: [0, 1, 2, 3, 4, 5],
  orientation: [0, 0, 0, 0, 0, 0],
};

const epGiiKERtoReid333: number[] = [4, 8, 0, 9, 5, 1, 3, 7, 6, 10, 2, 11];
const epReid333toGiiKER: number[] = [2, 5, 10, 6, 0, 4, 8, 7, 1, 3, 9, 11];

const preEO: number[] = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
const postEO: number[] = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];

const cpGiiKERtoReid333: number[] = [4, 0, 3, 5, 7, 1, 2, 6];
const cpReid333toGiiKER: number[] = [1, 5, 6, 2, 0, 3, 7, 4];

const preCO: number[] = [1, 2, 1, 2, 2, 1, 2, 1];
const postCO: number[] = [2, 1, 2, 1, 1, 2, 1, 2];

const coFlip: number[] = [-1, 1, -1, 1, 1, -1, 1, -1];

function getNibble(val: Uint8Array, i: number): number {
  if (i % 2 === 1) {
    return val[(i / 2) | 0] % 16;
  }
  return 0 | (val[(i / 2) | 0] / 16);
}

function probablyEncrypted(data: Uint8Array): boolean {
  return data[18] === 0xa7;
}

const lookup = [
  176, 81, 104, 224, 86, 137, 237, 119, 38, 26, 193, 161, 210, 126, 150, 81, 93,
  13, 236, 249, 89, 235, 88, 24, 113, 81, 214, 131, 130, 199, 2, 169, 39, 165,
  171, 41,
];

function decryptState(data: Uint8Array): Uint8Array {
  const offset1 = getNibble(data, 38);
  const offset2 = getNibble(data, 39);
  const output = new Uint8Array(MESSAGE_LENGTH);
  for (let i = 0; i < MESSAGE_LENGTH; i++) {
    output[i] = data[i] + lookup[offset1 + i] + lookup[offset2 + i];
  }
  return output;
}

// TODO: Support caching which decoding strategy worked last time.
function decodeState(data: Uint8Array): Uint8Array {
  if (!probablyEncrypted(data)) {
    return data;
  }
  return decryptState(data);
  // TODO: Check that the decrypted state is a valid staet.
}
