// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../stif/wrappers';

function parseAttemptMap(libraryJSON: string | null): Map<string, Attempt> {
  let jsonString = libraryJSON ? libraryJSON : '[]';
  return new Map(JSON.parse(jsonString));
}

/**
 * Merges AttemptLibrary Maps.
 *
 * If the same key is present in multiple maps, the value from the last
 * map will be used. All others will be discarded.
 *
 * @param libs The libs to merge, in order of increasing precedence.
 * @returns The merged library
 */
function mergeLibraries(...libs: Map<string, Attempt>[]): Map<string, Attempt> {
  let newLib = new Map();
  libs.forEach(l => {
    Array.from(l.entries()).forEach(([id, attempt]) => newLib.set(id, attempt));
  });
  return newLib;
}

function logError(message: string) {
  return (error: Error) => {
    console.error(`${message}: ${error}`);
    console.debug(`Stack trace: ${error.stack}`);
  };
}

export { parseAttemptMap, mergeLibraries, logError };
