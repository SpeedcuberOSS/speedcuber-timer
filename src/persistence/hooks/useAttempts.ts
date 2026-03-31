// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useState } from 'react';
import { useDatabase } from '../sqlitedb/DatabaseProvider';
import { useDbVersion, AttemptSchema, rowToAttempt } from '../sqlitedb';
import type { AttemptRow } from '../sqlitedb';
import { STIF } from '../../lib/stif';
import { IterableArrayLike } from '../types';

interface useAttemptsParams {
  event?: STIF.CompetitiveEvent;
  sortDirection?: 'ascending' | 'descending';
}

export function useAttempts({
  event,
  sortDirection = 'ascending',
}: useAttemptsParams): IterableArrayLike<STIF.Attempt> {
  const db = useDatabase();
  const [attemptsVersion] = useDbVersion('attemptsVersion');
  const [attempts, setAttempts] = useState<IterableArrayLike<STIF.Attempt>>([]);

  const eventId = event?.id;

  useEffect(() => {
    const order = sortDirection === 'ascending' ? 'ASC' : 'DESC';
    const repo = db.getRepository<AttemptRow>(AttemptSchema);
    const query = repo.createQueryBuilder('attempt').orderBy(
      'attempt.inspectionStart',
      order,
    );
    if (eventId !== undefined) {
      query.where('attempt.eventId = :eventId', { eventId });
    }
    query
      .getMany()
      .then(rows => setAttempts(rows.map(rowToAttempt)))
      .catch(console.error);
  }, [db, eventId, sortDirection, attemptsVersion]);

  return attempts;
}
