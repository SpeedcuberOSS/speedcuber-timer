// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// import { AsyncStorageAttemptLibrary } from './AsyncStorageAttemptLibrary';
// import { InMemoryAttemptLibrary } from './InMemoryAttemptLibrary';
import { DemoAttemptLibrary } from './DemoAttemptLibrary';
import { AttemptLibrary } from './interfaces/library';

// let LIBRARY = new InMemoryAttemptLibrary();
let LIBRARY = new DemoAttemptLibrary();

export function getLibrary(): AttemptLibrary {
  return LIBRARY;
}
