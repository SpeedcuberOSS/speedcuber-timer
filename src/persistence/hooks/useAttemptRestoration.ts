// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useDatabase } from '../sqlitedb/DatabaseProvider';
import { AttemptSchema, attemptToRow, bumpAttemptsVersion } from '../sqlitedb';
import { STIF } from '../../lib/stif';

export function useAttemptRestoration() {
  const db = useDatabase();
  return async (attempts: STIF.Attempt[]) => {
    const rows = attempts.map(attemptToRow);
    await db.transaction(async manager => {
      await manager.getRepository(AttemptSchema).clear();
      await manager.getRepository(AttemptSchema).save(rows);
    });
    bumpAttemptsVersion();
  };
}
