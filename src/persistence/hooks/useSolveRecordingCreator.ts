// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useDatabase } from '../sqlitedb/DatabaseProvider';
import { SolveRecordingSchema, solveRecordingToRow } from '../sqlitedb';
import { STIF, UUID } from '../../lib/stif';

export function useSolveRecordingCreator() {
  const db = useDatabase();
  return async (solutionId: UUID, recording: STIF.SolveRecording) => {
    const repo = db.getRepository(SolveRecordingSchema);
    await repo.save(solveRecordingToRow(solutionId, recording));
  };
}
