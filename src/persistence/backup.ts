// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ExternalDirectoryPath,
  DocumentDirectoryPath,
  appendFile,
  mkdir,
} from 'react-native-fs';
import { STIF } from '../lib/stif';
import { IterableArrayLike } from './types';
import { Platform } from 'react-native';

export const BACKUP_FOLDER = `${Platform.select({
  android: ExternalDirectoryPath,
  ios: DocumentDirectoryPath,
})}/backups`;
export function backupPaths() {
  return {
    attempts: `${BACKUP_FOLDER}/${new Date().getTime()}.attempts.stif`,
    recordings: `${BACKUP_FOLDER}/${new Date().getTime()}.solverecordings.stif`,
  };
}

/**
 * Saves the given attempts to the given path in JSONL format.
 *
 * https://jsonlines.org/
 */
export async function backupAttempts(
  attempts: IterableArrayLike<STIF.Attempt>,
) {
  const path = backupPaths().attempts;
  await mkdir(BACKUP_FOLDER, {
    NSURLIsExcludedFromBackupKey: false,
  });
  for (const attempt of attempts) {
    await appendFile(path, JSON.stringify(attempt) + '\n');
  }
}
