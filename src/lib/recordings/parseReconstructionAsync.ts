// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWorkletContext, runOnJS } from 'react-native-worklets-core';

import { SolutionMethod } from '../reconstructions';
import { STIF } from '../stif';
import { parseReconstruction } from './parseReconstruction';

const ReconstructionContext = createWorkletContext('ReconstructionContext');

export type ReconstructionPhase = ReturnType<
  typeof parseReconstruction
>[number];

/**
 * Parses the BLE event stream into a reconstruction asynchronously on a
 * dedicated background thread, keeping the UI responsive while the
 * CPU-intensive solution analysis runs.
 */
export function parseReconstructionAsync(
  recording: STIF.SolveRecording,
  scramble: STIF.Algorithm,
  startTime: number = 0,
  method: SolutionMethod = 'CFOP',
): Promise<ReconstructionPhase[]> {
  return new Promise<ReconstructionPhase[]>((resolve, reject) => {
    ReconstructionContext.runAsync(() => {
      'worklet';
      try {
        const result = parseReconstruction(
          recording,
          scramble,
          startTime,
          method,
        );
        runOnJS(resolve)(result);
      } catch (e) {
        runOnJS(reject)(e);
      }
    });
  });
}
