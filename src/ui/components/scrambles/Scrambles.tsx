// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Algorithm from './Algorithm';
import { GeneratedScramble } from './types';
import ScrambleTicker from './ScrambleTicker';
import SingleScramble from './SingleScramble';

export interface ScramblesProps {
  scrambles?: GeneratedScramble[];
  layoutHeightLimit?: number;
}

export default function Scrambles({
  scrambles,
  layoutHeightLimit,
}: ScramblesProps) {
  const handScramble = undefined;
  if (!scrambles || scrambles.length === 0)
    return (
      <Algorithm
        algorithm={handScramble}
        layoutHeightLimit={layoutHeightLimit}
      />
    );
  else if (scrambles.length === 1)
    return (
      <SingleScramble
        scramble={scrambles[0]}
        layoutHeightLimit={layoutHeightLimit}
      />
    );
  else return <ScrambleTicker {...{ scrambles, layoutHeightLimit }} />;
}

