// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  DocumentDirectoryPath,
  ExternalDirectoryPath,
  appendFile,
  mkdir,
  unlink,
} from '@dr.pogodin/react-native-fs';

import { IterableArrayLike } from './types';
import { Platform } from 'react-native';
import { STIF } from '../lib/stif';

export const BACKUP_FOLDER = `${Platform.select({
  android: ExternalDirectoryPath,
  ios: DocumentDirectoryPath,
})}/backups`;

export function paths() {
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
export async function attempts(
  attempts: IterableArrayLike<STIF.Attempt>,
) {
  const path = paths().attempts;
  await _ensureFolderExists();
  for (const attempt of attempts) {
    await appendFile(path, JSON.stringify(attempt) + '\n');
  }
}

export async function removeAt(path: string) {
  await _ensureFolderExists();
  await unlink(path);
}

export async function _ensureFolderExists() {
  await mkdir(BACKUP_FOLDER, {
    NSURLIsExcludedFromBackupKey: false,
  });
}