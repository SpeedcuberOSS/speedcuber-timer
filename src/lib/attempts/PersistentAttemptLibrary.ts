// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Attempt } from '../stif/wrappers';
import { InMemoryAttemptLibrary } from './InMemoryAttemptLibrary';

abstract class PersistentAttemptLibrary extends InMemoryAttemptLibrary {
  protected abstract persistChanges(): Promise<void>;
  constructor() {
    super();
    this.persistChanges();
  }
  add(attempt: Attempt): boolean {
    let success = super.add(attempt);
    if (success) {
      this.persistChanges();
    }
    return success;
  }
  remove(attempt_id: string): boolean {
    let success = super.remove(attempt_id);
    if (success) {
      this.persistChanges();
    }
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
    if (success) {
      this.persistChanges();
    }
    return success;
  }
}

export { PersistentAttemptLibrary };
