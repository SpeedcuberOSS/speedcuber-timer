// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from './Extension';
import { Penalty } from './Penalty';

/**
 * A violation of the WCA regulations that incurs a penalty.
 */
type Infraction = {
  /**
   * A unique identifier for the infraction.
   *
   * **Note:** Each official infraction uses the id of the [WCA
   * regulation](https://www.worldcubeassociation.org/regulations/) that
   * the infraction violates.
   */
  id: string;
  /**
   * The penalty imposed by the infraction.
   */
  penalty: Penalty;
  /**
   * List of custom extensions.
   */
  extensions?: Extension[];
};

export { type Infraction };
