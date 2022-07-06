<!--
 Copyright (c) 2022 Joseph Hale <me@jhale.dev>

 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

# Mandy

Mandy is a simple, STIF-compliant, Rubik's Cube scrambling program that
generates sensible random move sequences for NxN cubes.

## Usage

```javascript
import { Scrambler3x3x3 } from 'mandy';
let scramble = new Scrambler3x3x3().generateScramble();
```

## License

Mozilla Public License v2.0
