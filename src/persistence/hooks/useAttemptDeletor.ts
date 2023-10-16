// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useQuery, useRealm } from '../realmdb';

import { RealmAttempt } from '../realmdb/schema';
import { UUID } from '../../lib/stif';

export function useAttemptDeletor() {
  const realm = useRealm();
  const query = useQuery(RealmAttempt);
  return (attempt_id: UUID) => {
    const toDelete = query.filtered(`id = '${attempt_id}'`);
    realm.write(() => {
      // Cascade delete all Realm Objects included in the Attempt
      
      // Realm supports automatic cascade deletions, but only for
      // "Embedded Objects" which cannot be directly queried.
      // https://www.mongodb.com/docs/realm/sdk/react-native/model-data/relationships-and-embedded-objects/#embedded-objects

      // Since we need to support queries for sub-objects of Attempt, we
      // have to run the cascade deletion manually.
      for(let attempt of toDelete) {
        realm.delete(attempt.infractions);
        realm.delete(attempt.event);
        for(let solution of attempt.solutions) {
          for (let phase of solution.reconstruction) {
            realm.delete(phase.moves);
            realm.delete(phase);
          }
          realm.delete(solution.reconstruction);
        }
        realm.delete(attempt.solutions);
        realm.delete(attempt);
      }
    });
  };
}
