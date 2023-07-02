// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../stif';
import { analyzeSolution } from 'solution-analyzer';

type SolutionMethod = 'CFOP' | 'ZZ' | 'Roux';

export default function reconstructionFor(
  scramble: STIF.Algorithm,
  moves: STIF.TimestampedMove[],
) {
  return {
    using: (method: SolutionMethod) =>
      __reconstructionFor(scramble, moves, method),
  };
}

function __reconstructionFor(
  scramble: STIF.Algorithm,
  moves: STIF.TimestampedMove[],
  method: SolutionMethod,
) {
  const breakdown = analyzeSolution(
    scramble.join(' '),
    moves.map(v => v.m).join(' '),
    method,
  );
  return breakdown.steps.map((step, i, steps) => {
    let start = steps
      .filter((_, j) => j < i)
      .reduce((a, b) => a + b.moves.length, 0);
    return {
      label: step.label ?? 'unknown',
      moves: moves.slice(start, start + step.moves.length),
    };
  });
}
