// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// import { fs } from '../__mocks__';
import { fs } from '../__mocks__';
import * as library from '../library';
import * as runner from '../migrations/runner';

beforeEach(() => {
  jest.restoreAllMocks();
  library.TESTS_ONLY_setStatus('stopped');
  library.TESTS_ONLY_setCrashReason(undefined);
});

describe('boot', () => {
  it('sets the status to booting upon invocation', () => {
    expect(library.status()).toEqual('stopped');
    library.boot();
    expect(library.status()).toEqual('booting');
  });
  it('sets the status to running after booting', async () => {
    await library.boot();
    expect(library.crashReason()).toBeUndefined();
    expect(library.status()).toEqual('running');
  });
  it('sets the status to crashed if it cannot read the library version', async () => {
    fs.exists.mockImplementationOnce(filepath => {
      throw new Error('boot bananas');
    });
    await library.boot();
    expect(fs.exists).toHaveBeenCalledWith(
      'DocumentDirectoryPath/library/version',
    );
    expect(library.crashReason()).toEqual(
      'Unable to check existing library version: Error: boot bananas',
    );
    expect(library.status()).toEqual('crashed');
  });
  describe('migrations', () => {
    it('sets the status to crashed if a migration fails', async () => {
      fs.writeFile.mockImplementationOnce(filepath => {
        throw new Error('boot cookies');
      });
      await library.boot();
      expect(library.crashReason()).toEqual(
        'Unable to migrate library: Error: Migration 0 to 1 rolled back due to failure: Error: boot cookies',
      );
      expect(library.status()).toEqual('crashed');
    });
    it('skips migration if the library version is the same as the current version', async () => {
      fs.exists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('1');
      const migrationSpy = jest.spyOn(runner, 'runMigrations');
      await library.boot();
      expect(migrationSpy).not.toHaveBeenCalled();
      expect(library.crashReason()).toBeUndefined();
      expect(library.status()).toEqual('running');
    });
  });
});
