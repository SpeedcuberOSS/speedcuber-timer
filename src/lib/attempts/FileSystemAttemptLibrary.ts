// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  DocumentDirectoryPath,
  ExternalDirectoryPath,
  exists,
  readFile,
  writeFile,
} from 'react-native-fs';
import { logError, mergeLibraries, parseAttemptMap } from './_helpers';

import { PersistentAttemptLibrary } from './PersistentAttemptLibrary';
import { Platform } from 'react-native';

const FOLDER_PATH = Platform.select({
  ios: DocumentDirectoryPath,
  android: ExternalDirectoryPath,
});
const STORAGE_PATH = `${FOLDER_PATH}/attempts.json`;

class FileSystemAttemptLibrary extends PersistentAttemptLibrary {
  protected async loadLibraryFromStorage(): Promise<string> {
    let storedJSONstr = '[]';
    if (await exists(STORAGE_PATH)) {
      try {
        storedJSONstr = await readFile(STORAGE_PATH);
      } catch (error) {
        logError('Failed to read attempts from storage')(error as Error);
      }
    }
    return storedJSONstr;
  }
  protected async persistChanges() {
    const storedJSONstr = await this.loadLibraryFromStorage();
    const storedLibrary = parseAttemptMap(storedJSONstr);
    this._library = mergeLibraries(storedLibrary, this._library);
    const updatedLibraryString = JSON.stringify(Array.from(this._library));
    writeFile(STORAGE_PATH, updatedLibraryString)
      .then(_result =>
        console.log(
          `Successfully stored the updated library with ${this._library.size} attempts`,
        ),
      )
      .catch(
        logError(
          'Could not persist updated Attempt Library to the File System',
        ),
      );
  }
}

export { FileSystemAttemptLibrary };
