// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { migrations } from '.';
import { Migration } from './types';

export async function runMigrations(fromVersion: number, toVersion: number) {
  const _migrations = await migrations();
  await _runMigrations(_migrations, fromVersion, toVersion);
}

export async function _runMigrations(
  migrations: Migration[],
  fromVersion: number,
  toVersion: number,
) {
  for (let version = fromVersion; version < toVersion; version++) {
    const migrationCandidates = migrations.filter(
      m => m.fromVersion === version && m.toVersion === version + 1,
    );
    if (migrationCandidates.length === 0) {
      throw new Error(
        `Missing migration from library version ${version} to ${version + 1}`,
      );
    } else if (migrationCandidates.length > 1) {
      throw new Error(
        `Multiple migrations found from library version ${version} to ${
          version + 1
        }`,
      );
    } else {
      await __runMigration(migrationCandidates[0]);
    }
  }
}

async function __runMigration(migration: Migration) {
  try {
    console.debug(
      `Running migration ${migration.fromVersion} to ${migration.toVersion}`,
    );
    await migration.migrate();
  } catch (migrationError) {
    try {
      await migration.rollback();
    } catch (rollbackError) {
      throw new Error(
        `CRITICAL FAILURE: Unable to rollback migration ${migration.fromVersion} to ${migration.toVersion}:\n` +
          `[Rollback] ${rollbackError}\n` +
          `[Migration] ${migrationError}`,
      );
    }
    throw new Error(
      `Migration ${migration.fromVersion} to ${migration.toVersion} rolled back due to failure: ${migrationError}`,
    );
  }
}
