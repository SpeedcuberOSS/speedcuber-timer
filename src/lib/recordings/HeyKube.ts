// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// The contents of this file are largely copied from
// https://github.com/cubing/cubing.js/blob/main/src/cubing/bluetooth/smart-puzzle/Heykube.ts
// Which is licensed under the MPL-2.0 (See https://github.com/cubing/cubing.js/issues/208)

import { Buffer } from 'buffer';

const MOVES = [
  'U',
  "U'",
  'B',
  "B'",
  'F',
  "F'",
  null,
  null,
  'L',
  "L'",
  'D',
  "D'",
  'R',
  "R'",
  // null,
  // null,
];

function flipBitOrder(v: number, numBits: number): number {
  let result = 0;
  for (let i = 0; i < numBits; i++) {
    const shiftLeft = numBits - 1 - 2 * i;
    const unShiftedBit = v & (0b1 << i);
    // console.log(
    //   unShiftedBit,
    //   shiftLeft,
    //   shiftLeft < 0 ? unShiftedBit >> -shiftLeft : unShiftedBit << shiftLeft,
    // );
    result +=
      shiftLeft < 0 ? unShiftedBit >> -shiftLeft : unShiftedBit << shiftLeft;
  }
  return result;
}

export function parseMessage(message: string): string {
  let dv = new DataView(Buffer.from(message, 'base64').buffer);
  const b2 = new Uint8Array(dv.byteLength);
  for (let i = 0; i < dv.byteLength; i++) {
    b2[i] = flipBitOrder(dv.getUint8(i), 8);
  }
  const move = MOVES[b2[20] & 0b00001111]!;
  return move;
}
