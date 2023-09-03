// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { fs } from '../../../__mocks__';
import migration from '../0_to_1';

describe('Migration 0 to 1', () => {
  it('declares versions correctly', () => {
    expect(migration.fromVersion).toEqual(0);
    expect(migration.toVersion).toEqual(1);
  })
  describe('migration', () => {
    it('creates a version file if it does not exist', async () => {
      await migration.migrate();
      expect(fs.writeFile).toHaveBeenCalledWith(
        'DocumentDirectoryPath/version',
        '1',
      );
    });
    it('backs up the version file if it exists', async () => {
      fs.exists.mockResolvedValue(true);
      await migration.migrate();
      expect(fs.copyFile).toHaveBeenCalledWith(
        'DocumentDirectoryPath/version',
        'DocumentDirectoryPath/version.0',
      );
    });
  });
  describe('rollback', () => {
    it('restores the original version file if it exists', async () => {
      fs.exists.mockResolvedValue(true);
      await migration.rollback();
      expect(fs.copyFile).toHaveBeenCalledWith(
        'DocumentDirectoryPath/version.0',
        'DocumentDirectoryPath/version',
      );
      expect(fs.unlink).toHaveBeenCalledWith('DocumentDirectoryPath/version.0');
    });
    it('creates a version file if it does not exist', async () => {
      fs.exists.mockResolvedValue(false);
      await migration.rollback();
      expect(fs.writeFile).toHaveBeenCalledWith(
        'DocumentDirectoryPath/version',
        '0',
      );
    });
  });
});
