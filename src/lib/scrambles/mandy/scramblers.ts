// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Cube2x2x2,
  Cube3x3x3,
  Cube4x4x4,
  Cube5x5x5,
  Cube6x6x6,
  Cube7x7x7,
} from './cubes';

import { Scrambler } from './core';

class ScramblerUnknown extends Scrambler {
  constructor() {
    super(new Cube3x3x3());
  }

  generateScramble() {
    return [];
  }
}

class Scrambler2x2x2 extends Scrambler {
  constructor() {
    super(new Cube2x2x2());
  }
}
class Scrambler3x3x3 extends Scrambler {
  constructor() {
    super(new Cube3x3x3());
  }
}
class Scrambler4x4x4 extends Scrambler {
  constructor() {
    super(new Cube4x4x4());
  }
}
class Scrambler5x5x5 extends Scrambler {
  constructor() {
    super(new Cube5x5x5());
  }
}
class Scrambler6x6x6 extends Scrambler {
  constructor() {
    super(new Cube6x6x6());
  }
}
class Scrambler7x7x7 extends Scrambler {
  constructor() {
    super(new Cube7x7x7());
  }
}

export {
  ScramblerUnknown,
  Scrambler2x2x2,
  Scrambler3x3x3,
  Scrambler4x4x4,
  Scrambler5x5x5,
  Scrambler6x6x6,
  Scrambler7x7x7,
};
