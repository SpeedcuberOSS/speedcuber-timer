// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import SmartPuzzleScanner from './SmartPuzzleScanner';

const examples: DevelopmentExampleSet = {
  key: 'smart-puzzle-scanner',
  title: 'Smart Puzzle Scanner',
  description: 'Search for and connect to nearby smart puzzles',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <SmartPuzzleScanner />,
    },
  ],
};

export default examples;
