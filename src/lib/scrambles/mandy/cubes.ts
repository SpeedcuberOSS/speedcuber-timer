// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Face, NbyN } from './core';
import {
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  Puzzle,
} from '../../stif';

class Cube2x2x2 extends NbyN {
  constructor() {
    super(2);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_2x2x2;
  }
  getFaces(): Face[] {
    return ['U', 'R', 'F'].map(label => {
      return { label: label, opposite: '' };
    });
  }
}

class Cube3x3x3 extends NbyN {
  constructor() {
    super(3);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_3x3x3;
  }
}

class Cube4x4x4 extends NbyN {
  constructor() {
    super(4);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_4x4x4;
  }
}

class Cube5x5x5 extends NbyN {
  constructor() {
    super(5);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_5x5x5;
  }
}

class Cube6x6x6 extends NbyN {
  constructor() {
    super(6);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_6x6x6;
  }
}

class Cube7x7x7 extends NbyN {
  constructor() {
    super(7);
  }
  getPuzzle(): Puzzle {
    return PUZZLE_7x7x7;
  }
}

export { Cube2x2x2, Cube3x3x3, Cube4x4x4, Cube5x5x5, Cube6x6x6, Cube7x7x7 };
