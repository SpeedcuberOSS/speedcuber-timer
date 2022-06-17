// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Attempt } from '../../stif/types/Attempt';

interface AttemptLibrary {
  add(attempt: Partial<Attempt>): boolean;
  remove(attempt_id: string): boolean;
  update(attempt_id: string, attempt: Partial<Attempt>): boolean;
}

export { type AttemptLibrary };
