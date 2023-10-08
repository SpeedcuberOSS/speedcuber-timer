// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useState } from 'react';
import { useQuery } from '../realmdb';
import { RealmAttempt } from '../realmdb/schema';
import { STIF } from '../../lib/stif';
import { IterableArrayLike } from '../types';

interface useAttemptsParams {
  event?: STIF.CompetitiveEvent;
  sortDirection?: 'ascending' | 'descending';
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
    if (event !== undefined) {
      const importantAttempts = dataset.filtered(`event.id = "${event.id}"`);
      const sorted = importantAttempts.sorted(
        'inspectionStart',
        sortDirections[sortDirection],
      );
      setAttempts(sorted);
    } else {
      setAttempts(dataset);
    }
  }, [event, dataset]);
  return attempts;
}
