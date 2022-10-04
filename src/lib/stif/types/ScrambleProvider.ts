// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Entity } from './Entity';

/**
 * Details about a software system that can generate scrambles.
 */
interface ScrambleProvider extends Entity {
  /**
   * A unique identifier for the scramble provider.
   *
   * Should be in [reverse domain name
   * notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation)
   * to distinguish the provider from other scramble providers.
   */
  id: string;
  /**
   * A valid URL pointing to more information about the scramble
   * provider.
   */
  url: string;
}

export { type ScrambleProvider };
