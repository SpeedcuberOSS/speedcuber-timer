// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Custom third-party data that may be attached to any STIF entity.
 *
 * Applications that support STIF should accept and store this data,
 * even if they don't support the specific extension(s) used.
 *
 * Extensions that become widely used should have their fields proposed
 * for inclusion in the full STIF specification.
 */
export interface Extension {
  /**
   * The Extension identifier.
   *
   * Should be in [reverse domain name
   * notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation)
   * to distinguish the extension from other third-party extensions.
   */
  id: string;
  /**
   * A valid URI pointing to a [JSON Schema](https://json-schema.org/)
   * document specifying the structure of the extension data.
   */
  specUrl: string;
  /**
   * The extension data.
   */
  data: object;
}
