// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useRealm, useQuery } from '../realmdb';
import { STIF } from '../../lib/stif';
import { RealmAttempt } from '../realmdb/schema';

export function useAttemptRestoration() {
  const realm = useRealm();
  const query = useQuery(RealmAttempt);
  return (attempts: STIF.Attempt[]) => {
    realm.write(() => {
      realm.delete(query)
      for(const attempt of attempts) {
        realm.create('Attempt', attempt);
      }
    });
  };
}
