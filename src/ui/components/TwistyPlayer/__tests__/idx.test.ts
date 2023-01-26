// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export function newMovesSolved(
  solvedMoveCount: number,
  priorMoveCount: number,
  moveCount: number,
) {
  let sliceIdx = 0;
  if (solvedMoveCount > priorMoveCount + moveCount) {
    sliceIdx = moveCount;
  } else if (priorMoveCount > solvedMoveCount) {
    sliceIdx = 0;
  } else {
    sliceIdx = solvedMoveCount - priorMoveCount;
  }
  return sliceIdx;
}

describe('newMovesSolved', () => {
  it.each([
    [[0, 0, 7], 0],
    [[0, 7, 5], 0],
    [[0, 12, 8], 0],

    [[22, 0, 7], 7],
    [[22, 7, 5], 5],
    [[22, 12, 8], 8],
    [[22, 20, 11], 2],
    [[22, 31, 7], 0],
    [[22, 38, 16], 0],
    [[22, 54, 7], 0],

    [[9, 0, 7], 7],
    [[9, 7, 5], 2],
    [[9, 12, 8], 0],
    [[9, 20, 11], 0],
    [[9, 31, 7], 0],
    [[9, 38, 16], 0],
    [[9, 54, 7], 0],
  ])('works: %p -> %p', (args, expected) => {
    const [solved, prior, moves] = args;
    expect(newMovesSolved(solved, prior, moves)).toBe(expected);
  });
});
