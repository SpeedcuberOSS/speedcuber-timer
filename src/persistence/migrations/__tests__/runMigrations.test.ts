// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { _runMigrations } from '../runner';
import { Migration } from '../types';

describe('Migration validation', () => {
  it('throws when missing a requested migration', async () => {
    const TEST_MIGRATIONS: Migration[] = [];
    await expect(_runMigrations(TEST_MIGRATIONS, 5, 6)).rejects.toThrow(
      'Missing migration from library version 5 to 6',
    );
  });
  it('throws when missing a requested migration from a sequence', async () => {
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {},
        rollback: async () => {},
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 2)).rejects.toThrow(
      'Missing migration from library version 1 to 2',
    );
  });
  it('throws if multiple migrations are found for the same version', async () => {
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {},
        rollback: async () => {},
      },
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {},
        rollback: async () => {},
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 1)).rejects.toThrow(
      'Multiple migrations found from library version 0 to 1',
    );
  });
});

describe('Running migrations', () => {
  it('throws if a migration fails', async () => {
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {
          throw new Error('Unable to complete migration');
        },
        rollback: async () => {},
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 1)).rejects.toThrow(
      'Migration 0 to 1 rolled back due to failure: Error: Unable to complete migration',
    );
  });
  it('rolls back a migration if it fails', async () => {
    let rollback_run = false;
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {
          throw new Error('Unable to complete migration');
        },
        rollback: async () => {
          rollback_run = true;
        },
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 1)).rejects.toThrow();
    expect(rollback_run).toEqual(true);
  });
  it('only rolls back the failing migration, not earlier successful migrations', async () => {
    let rollback_0to1_run = false;
    let rollback_1to2_run = false;
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {},
        rollback: async () => {
          rollback_0to1_run = true;
        },
      },
      {
        fromVersion: 1,
        toVersion: 2,
        migrate: async () => {
          throw new Error('Unable to complete migration');
        },
        rollback: async () => {
          rollback_1to2_run = true;
        },
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 2)).rejects.toThrow();
    expect(rollback_0to1_run).toEqual(false);
    expect(rollback_1to2_run).toEqual(true);
  });
  it('does not attempt later migrations if an earlier migration fails', async () => {
    let rollback_0to1_run = false;
    let migration_1to2_run = false;
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {
          throw new Error('Unable to complete migration');
        },
        rollback: async () => {
          rollback_0to1_run = true;
        },
      },
      {
        fromVersion: 1,
        toVersion: 2,
        migrate: async () => {
          migration_1to2_run = true;
        },
        rollback: async () => {},
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 2)).rejects.toThrow();
    expect(rollback_0to1_run).toEqual(true);
    expect(migration_1to2_run).toEqual(false);
  });
});

describe('Rolling back migrations', () => {
  it('throws a critical failure if a rollback fails', async () => {
    const TEST_MIGRATIONS: Migration[] = [
      {
        fromVersion: 0,
        toVersion: 1,
        migrate: async () => {
          throw new Error('Unable to complete migration');
        },
        rollback: async () => {
          throw new Error('Unable to complete rollback');
        },
      },
    ];
    await expect(_runMigrations(TEST_MIGRATIONS, 0, 1)).rejects.toThrow(
      'CRITICAL FAILURE: Unable to rollback migration 0 to 1:\n' +
        '[Rollback] Error: Unable to complete rollback\n' +
        '[Migration] Error: Unable to complete migration',
    );
  });
});
