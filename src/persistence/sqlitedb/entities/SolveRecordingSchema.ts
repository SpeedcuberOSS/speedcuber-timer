// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { EntitySchema } from 'typeorm';
import { STIF, UUID } from '../../../lib/stif';

export interface SolveRecordingRow {
  id: number;
  solutionId: string;
  smartPuzzleJson: string;
  streamJson: string;
}

export const SolveRecordingSchema = new EntitySchema<SolveRecordingRow>({
  name: 'SolveRecording',
  tableName: 'solve_recordings',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    solutionId: {
      type: 'varchar',
    },
    smartPuzzleJson: {
      type: 'text',
    },
    streamJson: {
      type: 'text',
    },
  },
  indices: [{ columns: ['solutionId'] }],
});

export function rowToSolveRecording(
  row: SolveRecordingRow,
): { solutionId: UUID } & STIF.SolveRecording {
  return {
    solutionId: row.solutionId,
    smartPuzzle: JSON.parse(row.smartPuzzleJson),
    stream: JSON.parse(row.streamJson),
  };
}

export function solveRecordingToRow(
  solutionId: UUID,
  recording: STIF.SolveRecording,
): Omit<SolveRecordingRow, 'id'> {
  return {
    solutionId,
    smartPuzzleJson: JSON.stringify(recording.smartPuzzle),
    streamJson: JSON.stringify(recording.stream),
  };
}
