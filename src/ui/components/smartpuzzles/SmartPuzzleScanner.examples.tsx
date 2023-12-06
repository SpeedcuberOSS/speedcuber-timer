// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import { PUZZLE_2x2x2 } from '../../../lib/stif/builtins';
import SmartPuzzleScanner from './SmartPuzzleScanner';

const examples: DevelopmentExampleSet = {
  title: 'Smart Puzzle Scanner',
  description: 'Search for and connect to nearby smart puzzles',
  examples: [
    {
      title: 'Default',
      component: <SmartPuzzleScanner />,
    },
    {
      title: 'Selectable Puzzles',
      component: <SmartPuzzleScanner onSelectPuzzle={console.log} />,
    },
    {
      title: 'Selectable Puzzles (except 2x2x2)',
      component: (
        <SmartPuzzleScanner
          onSelectPuzzle={console.log}
          isPuzzleSelectable={smartPuzzle => {
            return smartPuzzle.puzzle !== PUZZLE_2x2x2;
          }}
        />
      ),
    },
  ],
};

export default examples;
