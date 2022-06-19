// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from './Extension';

/**
 * Base type for all STIF structures.
 */
interface Entity {
  /**
   * A unique identifier for the entity. (ideally a UUIDv4 unless
   * specified otherwise on the entity)
   */
  id: string;
  /**
   * List of custom extensions.
   */
  extensions?: Extension[];
}

export { type Entity };
