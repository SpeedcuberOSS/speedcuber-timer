// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { read, readDir, stat } from 'react-native-fs';
import { STIF } from '../lib/stif';
import { JsonLinesReader } from '../lib/jsonl';
import { BACKUP_FOLDER } from './backup';

export interface BackupEntry {
  date: Date;
  path: string;
}

export type BackupType = 'attempts' | 'solverecordings';

export function isBackup(filename: string, type: BackupType) {
  const pattern = String.raw`\d+.${type}.stif$`;
  return (filename.match(pattern) ?? []).length > 0;
}

/**
 * Provides a list of backups in reverse date order (i.e. newest first)
 */
export async function listBackups(type: BackupType): Promise<BackupEntry[]> {
  const entries = await readDir(BACKUP_FOLDER);
  const backups = entries.filter(entry => isBackup(entry.name, type));
  const list = backups.map(b => ({
    date: new Date(parseInt(b.name.split('.')[0])),
    path: b.path,
  }));
  return list.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Reads STIF.Attempt records in JSONL format from the given path.
 */
export async function loadAttemptsBackup(path: string) {
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
