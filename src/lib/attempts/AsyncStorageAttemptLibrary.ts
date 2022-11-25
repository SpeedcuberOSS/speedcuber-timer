// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { logError, mergeLibraries, parseAttemptMap } from './_helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistentAttemptLibrary } from './PersistentAttemptLibrary';

const LIBRARY_KEY = '@attempts';

class AsyncStorageAttemptLibrary extends PersistentAttemptLibrary {
  protected async persistChanges() {
    const storedJSONstr = await AsyncStorage.getItem(LIBRARY_KEY);
    const storedLibrary = parseAttemptMap(storedJSONstr);
    this._library = mergeLibraries(storedLibrary, this._library);
    const updatedLibraryString = JSON.stringify(Array.from(this._library));
    AsyncStorage.setItem(LIBRARY_KEY, updatedLibraryString)
      .then(_result =>
        console.log(
          `Successfully stored the updated library with ${this._library.size} attempts`,
        ),
      )
      .catch(
        logError('Could not persist updated Attempt Library to AsyncStorage'),
      );
  }
}

export { AsyncStorageAttemptLibrary };
