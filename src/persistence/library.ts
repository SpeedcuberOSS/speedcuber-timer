// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  DocumentDirectoryPath,
  appendFile,
  copyFile,
  exists,
  mkdir,
  readFile,
  writeFile,
} from 'react-native-fs';
import { STIF, UUID } from '../lib/stif';
import { runMigrations } from './migrations/runner';
import { AttemptSummary, Status } from './types';
import { Attempt } from '../lib/stif/wrappers';

export const LIBRARY_FOLDER = `${DocumentDirectoryPath}/library`;

const LIBRARY_VERSION: number = 1;

let __status: Status = 'stopped';
let __crashReason: string | undefined = undefined;

let __summaries: Map<string, AttemptSummary[]> = new Map();

export function TESTS_ONLY_reset_summaries() {
  __summaries = new Map();
}

export async function boot() {
  __status = 'booting';
  __crashReason = undefined;
  let installedVersion: number | undefined;
  try {
    installedVersion = await libraryVersion();
  } catch (error) {
    __status = 'crashed';
    __crashReason = `Unable to check existing library version: ${error}`;
  }
  if (__isMigrationNeeded(installedVersion, LIBRARY_VERSION)) {
    __status = 'migrating';
    try {
      await runMigrations(installedVersion, LIBRARY_VERSION);
    } catch (error) {
      __status = 'crashed';
      __crashReason = `Unable to migrate library: ${error}`;
      console.error(__crashReason);
    }
  }
  const didBootSuccessfully = status() !== 'crashed';
  if (didBootSuccessfully) {
    __status = 'running';
  }
}

function __isMigrationNeeded(
  installedVersion: number | undefined,
  currentVersion: number,
): installedVersion is number {
  return installedVersion !== undefined && installedVersion !== currentVersion;
}

export function status(): Status {
  return __status;
}

export function TESTS_ONLY_setStatus(status: Status) {
  __status = status;
}

export function crashReason(): string | undefined {
  return __crashReason;
}

export function TESTS_ONLY_setCrashReason(reason: string | undefined) {
  __crashReason = reason;
}

export async function libraryVersion() {
  const versionFile = `${LIBRARY_FOLDER}/version`;
  if (await exists(versionFile)) {
    const versionOnDisk = await readFile(versionFile);
    const parsedVersion = parseInt(versionOnDisk);
    if (isNaN(parsedVersion)) {
      throw new Error(
        `'${versionOnDisk}' is not a valid library version number`,
      );
    } else {
      return parsedVersion;
    }
  } else {
    return 0;
  }
}

export function pathsForEvent(event: STIF.CompetitiveEvent) {
  const baseFolder = `${LIBRARY_FOLDER}/${event.id}`;
  return {
    baseFolder: baseFolder,
    resultsFile: `${baseFolder}/results.csv`,
    detailsFolder: `${baseFolder}/details`,
    recordingsFolder: `${baseFolder}/recordings`,
  };
}

export function pathsForAttempt(attempt: STIF.Attempt) {
  return pathsForAttemptID(attempt.event, attempt.id);
}

function pathsForAttemptID(event: STIF.CompetitiveEvent, attempt_id: UUID) {
  const eventPaths = pathsForEvent(event);
  return {
    resultsFile: eventPaths.resultsFile,
    detailsFile: `${eventPaths.detailsFolder}/${attempt_id}.json`,
    recordingFile: `${eventPaths.recordingsFolder}/${attempt_id}.json`,
  };
}

export async function details(
  event: STIF.CompetitiveEvent,
  id: UUID,
): Promise<STIF.Attempt> {
  if (status() !== 'running') {
    throw new Error('`details` failed: Library is not yet running');
  }
  const paths = pathsForAttemptID(event, id);
  if (!(await exists(paths.detailsFile))) {
    throw new Error('`details` failed: Attempt does not exist');
  } else {
    const attemptString = await readFile(paths.detailsFile);
    return JSON.parse(attemptString) as STIF.Attempt;
  }
}

export async function put(attempt: STIF.Attempt) {
  if (status() !== 'running') {
    throw new Error('`put` failed: Library is not yet running');
  }
  const eventPaths = pathsForEvent(attempt.event);
  const attemptPaths = pathsForAttempt(attempt);
  const attemptString = JSON.stringify(attempt);
  await mkdir(eventPaths.detailsFolder, { NSURLIsExcludedFromBackupKey: true });
  const checks = await persistDetails(attemptPaths.detailsFile, attemptString);
  await persistSummary(eventPaths.resultsFile, attempt, checks);
}

async function persistDetails(detailsFile: string, details: string) {
  const checks = await backupIfContentsDiffer(detailsFile, details);
  if (!checks.contentsMatched) await writeFile(detailsFile, details);
  return checks;
}

async function backupIfContentsDiffer(file: string, contents: string) {
  const checks = { existed: false, contentsMatched: false };
  if (await exists(file)) {
    checks.existed = true;
    const existing = await readFile(file);
    if (existing === contents) {
      checks.contentsMatched = true;
      return checks;
    }
    const backupFile = `${file}.${Date.now()}`;
    copyFile(file, backupFile);
  }
  return checks;
}

async function persistSummary(resultsFile: string, attempt: STIF.Attempt, checks: { existed: boolean, contentsMatched: boolean }) {
  const summary: AttemptSummary = {
    id: attempt.id,
    timestamp: attempt.inspectionStart,
    result: new Attempt(attempt).result(),
  };
  if (!checks.contentsMatched) {
    const summaries = __summaries.get(attempt.event.id) || [];
    const insertIdx = binarySearch(summary, summaries, s => s.timestamp);
    summaries.splice(insertIdx, checks.existed ? 1 : 0, summary);
    __summaries.set(attempt.event.id, summaries);
    if (insertIdx < summaries.length - (checks.existed ? 0 : 1)) {
      const resultsLines = summaries.map(resultLine);
      await writeFile(resultsFile, resultsLines.join(''));
    } else {
      await appendFile(resultsFile, resultLine(summary));
    }
  }
}

function resultLine(summary: AttemptSummary) {
  return `${summary.id},${summary.timestamp},${summary.result}\n`;
}

function binarySearch<Item>(
  item: Item,
  collection: Item[],
  key: (item: Item) => number,
) {
  let low = 0;
  let high = collection.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = collection[mid];
    if (key(guess) === key(item)) {
      return mid;
    }
    if (key(guess) > key(item)) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return 0;
}
