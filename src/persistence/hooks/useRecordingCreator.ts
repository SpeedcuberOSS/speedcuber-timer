// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useRealm } from '../realmdb';
import { STIF, UUID } from '../../lib/stif';

export function useSolveRecordingCreator() {
  const realm = useRealm();
  return (solutionId: UUID, recording: STIF.SolveRecording) => {
    realm.write(() => {
      realm.create('SolveRecording', { solutionId: solutionId, ...recording });
    });
  };
}
