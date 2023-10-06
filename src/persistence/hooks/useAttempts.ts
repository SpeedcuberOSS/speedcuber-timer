// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useState } from 'react';
import { useQuery } from '../realmdb';
import { RealmAttempt } from '../realmdb/schema';
import { STIF } from '../../lib/stif';

interface useAttemptsParams {
  event: STIF.CompetitiveEvent;
  sortDirection?: 'ascending' | 'descending';
}
interface IterableArrayLike<T> extends ArrayLike<T> {
  [Symbol.iterator](): IterableIterator<T>;
}
const sortDirections = {
  ascending: false,
  descending: true,
};
export function useAttempts({
  event,
  sortDirection = 'ascending',
}: useAttemptsParams): IterableArrayLike<STIF.Attempt> {
  const [attempts, setAttempts] = useState<IterableArrayLike<STIF.Attempt>>([]);
  const dataset = useQuery<RealmAttempt>(RealmAttempt);
  useEffect(() => {
    const importantAttempts = dataset.filtered(`event.id = "${event.id}"`);
    const sorted = importantAttempts.sorted(
      'inspectionStart',
      sortDirections[sortDirection],
    );
    setAttempts(sorted);
  }, [event, dataset]);
  return attempts;
}
