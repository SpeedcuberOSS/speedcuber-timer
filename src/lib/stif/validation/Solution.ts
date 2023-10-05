// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from "../STIF";
import { STIFError } from "../exceptions";
import { err } from "./_utils";

export function validateSolution(wip: Partial<STIF.Solution>): STIF.Solution {
  if (phasesOverlap(wip)) {
    throw new STIFError('Solution phases cannot be overlapping');
  }
  let solution: STIF.Solution = {
    puzzle: wip.puzzle ?? err('puzzle'),
    scramble: wip.scramble ?? err('scramble'),
    reconstruction: wip.reconstruction ?? [],
  };
  return solution;
}

function phasesOverlap(wip: Partial<STIF.Solution>): boolean {
  if (wip.reconstruction === undefined) {
    return false;
  }
  let phases = wip.reconstruction
    .filter(value => value.moves.length > 1)
    .map(phase => ({
      start: phase.moves.sort((a, b) => a.t - b.t)[0].t,
      end: phase.moves.sort((a, b) => b.t - a.t)[0].t,
    }))
    .sort((a, b) => a.start - b.start);
  for (let i = 0; i < phases.length - 1; i++) {
    let phase = phases[i];
    let nextPhase = phases[i + 1];
    if (phase.end > nextPhase.start) {
      return true;
    }
  }
  return false;
}