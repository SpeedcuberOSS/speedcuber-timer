// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DataSource } from 'typeorm';
import { AttemptSchema, SolveRecordingSchema } from './entities';
import { createGlobalState } from 'react-hooks-global-state';

export { AttemptSchema, rowToAttempt, attemptToRow } from './entities';
export type { AttemptRow } from './entities';
export {
  SolveRecordingSchema,
  rowToSolveRecording,
  solveRecordingToRow,
} from './entities';
export type { SolveRecordingRow } from './entities';

/**
 * Global version counters used to trigger reactive re-renders of hooks
 * that query the database. Increment the appropriate counter after any
 * write operation to cause all dependent hooks to re-fetch.
 */
const { useGlobalState, setGlobalState } = createGlobalState({
  attemptsVersion: 0,
});

export { useGlobalState as useDbVersion };

export function bumpAttemptsVersion(): void {
  setGlobalState('attemptsVersion', (v: number) => v + 1);
}

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'speedcubertimer.db',
  location: 'default',
  driver: require('react-native-sqlite-storage'),
  entities: [AttemptSchema, SolveRecordingSchema],
  // synchronize automatically creates/updates tables to match entities.
  // For schema migrations in future versions, set this to false and use
  // TypeORM migrations: https://typeorm.io/migrations
  synchronize: true,
  logging: false,
});
