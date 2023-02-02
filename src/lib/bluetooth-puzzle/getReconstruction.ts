// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Scramble } from '../stif';
import { SolveReplay } from './getSolveReplay';
import { analyzeSolution } from 'solution-analyzer';

type SolutionMethod = 'CFOP' | 'ZZ' | 'Roux';
interface Phase {
  /**
   * The name of the step
   */
  label: string;
  /**
   * The timestamped moves in the step
   */
  moves: { t: number; m: string }[];
  /**
   * The duration of the step in milliseconds
   */
  duration: number;
  /**
   * The number of milliseconds between the start of the step and
   * execution of the first move.
   */
  recognition: number;
  /**
   * The average TPS of the step
   *
   * = duration / moves.length
   */
  tps: number;
}

export type Reconstruction = Phase[];

export default function getReconstruction(
  scramble: Scramble,
  solveReplay: SolveReplay,
  method: SolutionMethod,
  duration: number,
): Reconstruction {
  const breakdown = analyzeSolution(
    scramble.algorithm.moves.join(' '),
    solveReplay.map(v => v.m).join(' '),
    method,
  );
  let phases: Phase[] = [getPickupPhase(solveReplay)];
  let wipMoveCount = 0;
  let wipDuration = phases[0].duration;
  for (const step of breakdown.steps) {
    const moves = solveReplay.slice(
      wipMoveCount,
      wipMoveCount + step.moves.length,
    );
    const startTime = wipDuration;
    const endTime = moves[moves.length - 1].t;
    const stepDuration = endTime - startTime;
    phases.push({
      label: step.label ?? 'unknown',
      moves: moves,
      duration: stepDuration,
      recognition: moves[0].t - startTime,
      tps: moves.length / (stepDuration / 1000),
    });
    wipMoveCount += step.moves.length;
    wipDuration = endTime;
  }
  phases.push(getPutDownPhase(wipDuration, duration));
  return phases;
}

function getPickupPhase(solveReplay: SolveReplay): Phase {
  return {
    label: 'pickup',
    moves: [],
    duration: solveReplay[0]?.t ?? 0,
    recognition: 0,
    tps: 0,
  };
}

function getPutDownPhase(wipDuration: number, solveDuration: number): Phase {
  return {
    label: 'put down',
    moves: [],
    duration: solveDuration - wipDuration,
    recognition: 0,
    tps: 0,
  };
}
