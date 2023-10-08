// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Milliseconds, STIF, UUID, UnixTimestamp } from "../lib/stif";

export type Status = 'stopped' | 'booting' | 'migrating' | 'running' | 'crashed';

export interface AttemptSummary {
  id: UUID;
  timestamp: UnixTimestamp; // STIF.Attempt.inspectionStart
  result: Milliseconds | 'DNF' | 'DNS';
}

export interface AttemptLibrary {
  boot: () => Promise<void>;
  status: () => Status;
  crashReason: () => string | undefined;
  put: (attempt: STIF.Attempt) => Promise<void>;
  details: (event: STIF.CompetitiveEvent, attempt_id: UUID) => Promise<STIF.Attempt>;
}

export interface IterableArrayLike<T> extends ArrayLike<T> {
  [Symbol.iterator](): IterableIterator<T>;
}