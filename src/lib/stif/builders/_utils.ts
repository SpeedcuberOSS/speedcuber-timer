// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIFError } from '../exceptions';

export function err(attr: string): never {
  throw new STIFError(`\`${attr}\` is a required attribute.`);
}

export function lengthGreaterThan<T extends object>(
  num: number,
  arr?: T[],
): arr is T[] {
  return arr !== undefined && arr.length > num;
}
