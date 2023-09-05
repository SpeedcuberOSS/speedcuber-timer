// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as library from '../library';
import { fs } from '../__mocks__';

describe('Library Version', () => {
  it('returns the 0 if the version file does not exist', async () => {
    const version = await library.libraryVersion();
    expect(version).toEqual(0);
  });
  it('returns the version number if the version file exists', async () => {
    fs.exists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue('1');
    const version = await library.libraryVersion();
    expect(version).toEqual(1);
    expect(fs.exists).toHaveBeenCalledWith(
      'DocumentDirectoryPath/library/version',
    );
    expect(fs.readFile).toHaveBeenCalledWith(
      'DocumentDirectoryPath/library/version',
    );
  });
  it('throws an error if the version file is not a number', async () => {
    fs.exists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue('cookies');
    await expect(library.libraryVersion()).rejects.toThrow(
      "'cookies' is not a valid library version number",
    );
  });
});
