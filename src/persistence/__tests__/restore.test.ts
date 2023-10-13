// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { _isBackup } from '../restore';

describe('isBackup', () => {
  it('matches `attempts` backups', () => {
    expect(_isBackup('1696733305826.attempts.stif', 'attempts')).toBe(true);
  });
  it('rejects invalid `attempts` backups', () => {
    expect(_isBackup('bogus.attempts.stif', 'attempts')).toBe(false);
  });
  it('matches `solverecordings` backups', () => {
    expect(_isBackup('1696733305826.solverecordings.stif', 'solverecordings')).toBe(true);
  });
  it('rejects invalid `solverecordings` backups', () => {
    expect(_isBackup('bogus.solverecordings.stif', 'solverecordings')).toBe(false);
  });
});
