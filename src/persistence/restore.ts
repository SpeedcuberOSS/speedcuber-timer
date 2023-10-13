// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BACKUP_FOLDER, _ensureFolderExists } from './backup';
import { read, readDir, stat } from 'react-native-fs';

import { BackupEntry } from './types';
import { JsonLinesReader } from '../lib/jsonl';
import { STIF } from '../lib/stif';

export type BackupType = 'attempts' | 'solverecordings';

/**
 * Provides a list of backups in reverse date order (i.e. newest first)
 */
export async function list(type: BackupType): Promise<BackupEntry[]> {
  await _ensureFolderExists();
  const entries = await readDir(BACKUP_FOLDER);
  const backups = entries.filter(entry => _isBackup(entry.name, type));
  const list = backups.map(b => ({
    date: new Date(parseInt(b.name.split('.')[0])),
    path: b.path,
  }));
  return list.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Reads STIF.Attempt records in JSONL format from the given path.
 */
export async function attempts(path: string) {
  const attempts: STIF.Attempt[] = [];
  const reader = new JsonLinesReader<STIF.Attempt>();
  reader.onData(data => attempts.push(data));
  const stats = await stat(path);
  const BYTES_PER_WINDOW = 1024;
  let head = 0;
  while (head < stats.size) {
    const piece = await read(path, BYTES_PER_WINDOW, head);
    reader.write(piece);
    head += BYTES_PER_WINDOW;
  }
  return attempts;
}

export function _isBackup(filename: string, type: BackupType) {
  const pattern = String.raw`\d+.${type}.stif$`;
  return (filename.match(pattern) ?? []).length > 0;
}