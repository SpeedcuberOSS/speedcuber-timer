// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { InMemoryAttemptLibrary } from './InMemoryAttemptLibrary';
import attempts from '../analytics/demo/twisty2stif';
import { STIF } from '../stif';
import { Attempt } from '../stif/wrappers';
const smartAttempt =
  require('../recordings/__fixtures__/rubiks_connected_attempt.json') as STIF.Attempt;
const smartAttemptGyro =
  require('../recordings/__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;

const a1 = new Attempt(smartAttempt);
const a2 = new Attempt(smartAttemptGyro);

class DemoAttemptLibrary extends InMemoryAttemptLibrary {
  constructor() {
    super();
    const as = [a1, a2, ...attempts]
    as.forEach(attempt => {
      this.add(attempt);
    });
  }
}

export { DemoAttemptLibrary };
