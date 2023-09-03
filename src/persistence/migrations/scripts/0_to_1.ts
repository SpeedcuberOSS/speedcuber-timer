// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DocumentDirectoryPath, ExternalDirectoryPath, copyFile, exists, unlink, writeFile } from "react-native-fs";
import { Migration } from "../types";
import { Platform } from "react-native";

const LIBRARY_FOLDER = Platform.select({
  ios: DocumentDirectoryPath,
  android: ExternalDirectoryPath,
});

async function createVersionFile() {
  const versionFile = `${LIBRARY_FOLDER}/version`;
  if (await exists(versionFile)) {
    await copyFile(versionFile, `${versionFile}.0`);
  }
  await writeFile(versionFile, "1");
}

async function migrate() {
  console.debug("[0_to_1.ts] Running migration 0 to 1")
  await createVersionFile();
};

async function restoreOriginalVersionFile() {
  const versionFile = `${LIBRARY_FOLDER}/version`;
  if (await exists(`${versionFile}.0`)) {
    await copyFile(`${versionFile}.0`, versionFile);
    await unlink(`${versionFile}.0`);
  } else {
    await writeFile(versionFile, "0");
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