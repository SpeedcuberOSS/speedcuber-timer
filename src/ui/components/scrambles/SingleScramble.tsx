// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Algorithm from './Algorithm';
import { GeneratedScramble } from './types';
import ScrambleHeader from './ScrambleHeader';
import SmartPuzzleSelectorModal from '../smartpuzzles/SmartPuzzleSelectorModal';
import { useState } from 'react';

interface SingleScrambleProps {
  scramble: GeneratedScramble;
  layoutHeightLimit?: number;
}
export default function SingleScramble({
  scramble,
  layoutHeightLimit,
}: SingleScrambleProps) {
  const [showSmartPuzzleSelector, setShowSmartPuzzleSelector] = useState(false);
  return (
    <>
      <ScrambleHeader
        puzzle={scramble.puzzle}
        smartPuzzle={scramble.smartPuzzle}
        onRequestSmartPuzzleLink={() => setShowSmartPuzzleSelector(true)}
      />
      <Algorithm
        algorithm={scramble.algorithm}
        layoutHeightLimit={layoutHeightLimit}
      />
      <SmartPuzzleSelectorModal
        scrambles={[scramble]}
        idx={0}
        visible={showSmartPuzzleSelector}
        onDismiss={() => {
          setShowSmartPuzzleSelector(false);
        }}
      />
    </>
  );
}
