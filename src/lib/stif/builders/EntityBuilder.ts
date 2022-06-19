// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Extension } from '../types';
import { Entity } from '../types/Entity';
import { v4 as uuid } from 'uuid';

abstract class EntityBuilder {
  /**
   * The work-in-progress Entity being constructed.
   */
  protected wip: Partial<Entity> = {};
  public setId(id: string): this {
    this.wip.id = id;
    return this;
  }
  public addExtension(extension: Extension): this {
    if (this.wip.extensions == undefined) {
      this.wip.extensions = [];
    }
    if (!this.wip.extensions.every(e => e.id !== extension.id)) {
      throw new Error('cannot add a duplicate extension');
    }
    this.wip.extensions.push(extension);
    return this;
  }
  public build(): Entity {
    if (Object.keys(this.wip).length === 0)
      throw new Error('Nothing to build!');
    return {
      id: this.wip.id ?? uuid(),
      extensions: this.wip.extensions,
    };
  }
}

export { EntityBuilder };
