// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import * as library from '../library';
import { fs } from '../__mocks__';
import { ATTEMPT_3x3x3_BASIC } from '../../lib/stif/demo';
import { Attempt } from '../../lib/stif/wrappers';

describe('put', () => {
  beforeEach(() => {
    library.TESTS_ONLY_setStatus('running');
    library.TESTS_ONLY_reset_summaries();
    jest.resetAllMocks();
  });
  it('persists a new attempt', async () => {
    await library.put(ATTEMPT_3x3x3_BASIC);
    expect(fs.writeFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
      JSON.stringify(ATTEMPT_3x3x3_BASIC),
    );
  });
  it('ensures the parent directory exists', async () => {
    await library.put(ATTEMPT_3x3x3_BASIC);
    expect(fs.mkdir).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details`,
      { NSURLIsExcludedFromBackupKey: true }, // Omit from iCloud backups
    );
  });
  it('creates a backup before overwriting an existing attempt', async () => {
    fs.exists.mockResolvedValue(true);
    await library.put(ATTEMPT_3x3x3_BASIC);
    expect(fs.copyFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
      expect.stringMatching(
        new RegExp(
          `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}\\.json\\.\\d+`,
        ),
      ),
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
      JSON.stringify(ATTEMPT_3x3x3_BASIC),
    );
  });
  it('is a no-op if the attempt is the same as the existing attempt', async () => {
    // I tested the performance of comparing by contents vs comparing by
    // hash. At this point, because the files are so small its generally
    // faster to read the contents instead of hashing twice.
    //
    // If the files get significantly larger, we can revisit this.
    fs.exists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue(JSON.stringify(ATTEMPT_3x3x3_BASIC));
    await library.put(ATTEMPT_3x3x3_BASIC);
    expect(fs.writeFile).not.toHaveBeenCalled();
    expect(fs.copyFile).not.toHaveBeenCalled();
    expect(fs.appendFile).not.toHaveBeenCalled();
  });
  it('appends to the results file if the attempt is newer than any other attempt', async () => {
    const attempt = new Attempt(ATTEMPT_3x3x3_BASIC);
    await library.put(attempt.stif());
    expect(fs.appendFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/results.csv`,
      `${attempt.id()},${attempt.inspectionStart()},${attempt.result()}\n`,
    );
  });
  it('replaces the results file if the attempt is older than any other attempt', async () => {
    const attemptLater = new Attempt(ATTEMPT_3x3x3_BASIC);
    const attemptEarlier = new Attempt({
      ...ATTEMPT_3x3x3_BASIC,
      id: 'db7f6ca6-5f40-4711-87e0-f42b5c4cdd98',
      inspectionStart: ATTEMPT_3x3x3_BASIC.inspectionStart - 3000,
    });

    await library.put(attemptLater.stif());
    expect(fs.appendFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/results.csv`,
      `${attemptLater.id()},${attemptLater.inspectionStart()},${attemptLater.result()}\n`,
    )
    
    await library.put(attemptEarlier.stif());
    expect(fs.writeFile).toHaveBeenLastCalledWith(
      `DocumentDirectoryPath/library/333/results.csv`,
      `${attemptEarlier.id()},${attemptEarlier.inspectionStart()},${attemptEarlier.result()}\n` +
      `${attemptLater.id()},${attemptLater.inspectionStart()},${attemptLater.result()}\n`
    );
  });
  it('replaces the results file if the attempt updates an existing attempt', async () => {
    const attemptEarlier = new Attempt(ATTEMPT_3x3x3_BASIC);
    const attemptLater = new Attempt({
      ...ATTEMPT_3x3x3_BASIC,
      inspectionStart: ATTEMPT_3x3x3_BASIC.inspectionStart + 3000,
    });

    await library.put(attemptEarlier.stif());
    expect(fs.appendFile).toHaveBeenCalledWith(
      `DocumentDirectoryPath/library/333/results.csv`,
      `${attemptEarlier.id()},${attemptEarlier.inspectionStart()},${attemptEarlier.result()}\n`,
    );
    
    // The test can't create the earlier attempt's file, so we have to
    // mock its existence/contents.
    fs.exists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue(JSON.stringify(attemptEarlier.stif()));
    await library.put(attemptLater.stif());
    expect(fs.writeFile).toHaveBeenLastCalledWith(
      `DocumentDirectoryPath/library/333/results.csv`,
      `${attemptLater.id()},${attemptLater.inspectionStart()},${attemptLater.result()}\n`
    );
  })
});

describe('throws an error', () => {
  test('if the library is not running', async () => {
    library.TESTS_ONLY_setStatus('stopped');
    await expect(library.put(ATTEMPT_3x3x3_BASIC)).rejects.toThrowError(
      '`put` failed: Library is not yet running',
    );
  });
});
