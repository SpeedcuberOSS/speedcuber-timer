// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import reconstructionFor, { SolutionMethod } from '../reconstructions';
import { STIF } from '../stif';
import {
  compressDoubleTurns,
  parseTimestampedMoves,
} from './parseTimestampedMoves';

export function parseReconstruction(
  recording: STIF.SolveRecording,
  scramble: STIF.Algorithm,
  startTime: number = 0,
  method: SolutionMethod = 'CFOP',
) {
  const moves = parseTimestampedMoves(recording, startTime);
  const rawReconstruction = reconstructionFor(scramble, moves).using(method);
  const reconstruction = rawReconstruction.map(phase => {
    return {
      label: phase.label,
      moves: compressDoubleTurns(phase.moves),
    };
  });
  return reconstruction;
}
