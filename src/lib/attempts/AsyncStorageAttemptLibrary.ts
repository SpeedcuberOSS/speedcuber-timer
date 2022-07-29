// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Attempt } from '../stif/types/Attempt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InMemoryAttemptLibrary } from './InMemoryAttemptLibrary';
import logError from '../../ui/utils/logError';

const LIBRARY_KEY = '@attempts';

class AsyncStorageAttemptLibrary extends InMemoryAttemptLibrary {
  constructor() {
    super();
    this.persistChanges();
  }
  add(attempt: Attempt): boolean {
    let success = super.add(attempt);
    if (success) this.persistChanges();
    return success;
  }
  remove(attempt_id: string): boolean {
    let success = super.remove(attempt_id);
    if (success) this.persistChanges();
    return success;
  }
  get(attempt_id: string): Attempt | undefined {
    return super.get(attempt_id);
  }
  getAll(): Array<Attempt> {
    return super.getAll();
  }
  update(attempt_id: string, attempt: Attempt): boolean {
    let success = super.update(attempt_id, attempt);
    if (success) this.persistChanges();
    return success;
  }
  private persistChanges() {
    function parseAttemptMap(libraryJSON: string | null): Map<string, Attempt> {
      let jsonString = libraryJSON ? libraryJSON : '[]';
      return new Map(JSON.parse(jsonString));
    }
    /**
     * Merges AttemptLibrary Maps.
     * @param libs The libs to merge, in order of increasing precedence.
     * @returns The merged library
     */
    function mergeLibraries(
      ...libs: Array<Map<string, Attempt>>
    ): Map<string, Attempt> {
      let newLib = new Map();
      libs.forEach(l => {
        Array.from(l.entries()).forEach(([id, attempt]) =>
          newLib.set(id, attempt),
        );
      });
      return newLib;
    }
    AsyncStorage.getItem(LIBRARY_KEY)
      .then(parseAttemptMap)
      .then(storedLibrary => mergeLibraries(storedLibrary, this._library))
      .then(mergedLibrary => (this._library = mergedLibrary))
      .then(mergedLibrary => {
        const updatedLibrary = Array.from(mergedLibrary);
        let updatedLibraryString = JSON.stringify(updatedLibrary);
        AsyncStorage.setItem(LIBRARY_KEY, updatedLibraryString)
          .then(_result =>
            console.log(
              `Successfully stored the updated library with ${updatedLibrary.length} attempts`,
            ),
          )
          .catch(
            logError(
              'Could not persist updated Attempt Library to AsyncStorage',
            ),
          );
      })
      .catch(logError('Could not load Attempt Library from AsyncStorage'));
  }
}

export { AsyncStorageAttemptLibrary };
