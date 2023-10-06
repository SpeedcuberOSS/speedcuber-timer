// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import {
  RealmAttempt,
  RealmCompetitiveEvent,
  RealmInfraction,
  RealmMessage,
  RealmSmartPuzzle,
  RealmSmartPuzzleUUIDs,
  RealmSolution,
  RealmSolutionPhase,
  RealmSolveRecording,
  RealmTimestampedMove,
} from './schema';

const realmConfig: Realm.Configuration = {
  schemaVersion: 1,
  schema: [
    RealmAttempt,
    RealmCompetitiveEvent,
    RealmInfraction,
    RealmMessage,
    RealmSmartPuzzle,
    RealmSmartPuzzleUUIDs,
    RealmSolution,
    RealmSolutionPhase,
    RealmSolveRecording,
    RealmTimestampedMove,
  ],
  // deleteRealmIfMigrationNeeded: true, // TODO - DO NOT COMMIT THIS
};

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);
