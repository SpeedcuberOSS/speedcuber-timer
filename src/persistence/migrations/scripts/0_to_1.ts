// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DocumentDirectoryPath, copyFile, exists, unlink, writeFile, mkdir } from "react-native-fs";
import { Migration } from "../types";

const LIBRARY_FOLDER = `${DocumentDirectoryPath}/library`
const VERSION_FILE = `${LIBRARY_FOLDER}/version`;
const BACKUP_DIR = `${LIBRARY_FOLDER}/backups/migrations/0`;
const BACKUP_VERSION_FILE = `${BACKUP_DIR}/version`;

async function createVersionFile() {
  if (await exists(VERSION_FILE)) {
    await mkdir(BACKUP_DIR, { NSURLIsExcludedFromBackupKey: true });
    await copyFile(VERSION_FILE, BACKUP_VERSION_FILE);
  }
  await mkdir(LIBRARY_FOLDER, { NSURLIsExcludedFromBackupKey: true });
  await writeFile(VERSION_FILE, "1");
}

async function migrate() {
  console.debug("[0_to_1.ts] Running migration 0 to 1")
  await createVersionFile();
};

async function restoreOriginalVersionFile() {
  if (await exists(BACKUP_VERSION_FILE)) {
    await copyFile(BACKUP_VERSION_FILE, VERSION_FILE);
    await unlink(BACKUP_VERSION_FILE);
  } else {
    await writeFile(VERSION_FILE, "0");
  }
}

async function rollback() {
  console.debug("[0_to_1.ts] Rolling back migration 0 to 1")
  await restoreOriginalVersionFile();
}

const migration: Migration = {
  fromVersion: 0,
  toVersion: 1,
  migrate,
  rollback,
};

export default migration;