// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { AttemptLibrary } from './interfaces/library';
import { Attempt } from '../stif/types/Attempt';

class InMemoryAttemptLibrary implements AttemptLibrary {
  private _library: Map<string, Attempt> = new Map();
  add(attempt: Attempt): boolean {
    if (attempt.id && !this._library.has(attempt.id)) {
      this._library.set(attempt.id, attempt);
      return true;
    }
    return false;
  }
  remove(attempt_id: string): boolean {
    if (!this._library.has(attempt_id)) {
      return false;
    }
    this._library.delete(attempt_id);
    return true;
  }
  get(attempt_id: string): Attempt | undefined {
    return this._library.get(attempt_id);
  }
  getAll(): Array<Attempt> {
    return Array.from(this._library.values());
  }
  update(attempt_id: string, attempt: Attempt): boolean {
    if (!this._library.has(attempt_id)) {
      return false;
    }
    this._library.set(attempt_id, attempt);
    return true;
  }
  count(): number {
    return this._library.size;
  }
}

export { InMemoryAttemptLibrary };
