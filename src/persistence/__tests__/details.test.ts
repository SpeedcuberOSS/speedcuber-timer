// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { EVENT_3x3x3 } from '../../lib/stif/builtins';
import { ATTEMPT_3x3x3_BASIC } from '../../lib/stif/demo';
import * as library from '../library';
import { fs } from '../__mocks__';

describe('returns the attempt details', () => {
  beforeEach(() => {
    library.TESTS_ONLY_setStatus('running');
    jest.resetAllMocks();
  });
  test('if the attempt exists', async () => {
    fs.exists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue(JSON.stringify(ATTEMPT_3x3x3_BASIC));
    const attempt = await library.details(EVENT_3x3x3, ATTEMPT_3x3x3_BASIC.id);
    expect(attempt).toEqual(ATTEMPT_3x3x3_BASIC);
    expect(fs.exists).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
    );
    expect(fs.readFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
    );
  });
});

describe('throws an error', () => {
  test('if the library is not running', async () => {
    library.TESTS_ONLY_setStatus('stopped');

    await expect(
      library.details(EVENT_3x3x3, ATTEMPT_3x3x3_BASIC.id),
    ).rejects.toThrowError('`details` failed: Library is not yet running');
  });
  test('if the attempt does not exist', async () => {
    library.TESTS_ONLY_setStatus('running');
    fs.exists.mockResolvedValue(false);
    
    await expect(
      library.details(EVENT_3x3x3, ATTEMPT_3x3x3_BASIC.id),
    ).rejects.toThrowError('`details` failed: Attempt does not exist');
    expect(fs.exists).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
    );
  });
});
