// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Platform } from 'react-native';
import {
  DocumentDirectoryPath,
  ExternalDirectoryPath,
  exists,
  readFile,
} from 'react-native-fs';
import { STIF } from '../lib/stif';
import { runMigrations } from './migrations/runner';

export const LIBRARY_FOLDER = Platform.select({
  android: ExternalDirectoryPath,
  ios: DocumentDirectoryPath,
});

const LIBRARY_VERSION: number = 1;

type Status = 'stopped' | 'booting' | 'migrating' | 'running' | 'crashed';
let __status: Status = 'stopped';
let __crashReason: string | undefined = undefined;

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
  }
}

export function pathsForAttempt(attempt: STIF.Attempt) {
  const eventPaths = pathsForEvent(attempt.event);
  return {
    resultsFile: eventPaths.resultsFile,
    detailsFile: `${eventPaths.detailsFolder}/${attempt.id}.json`,
    recordingFile: `${eventPaths.recordingsFolder}/${attempt.id}.json`,
  }
}
