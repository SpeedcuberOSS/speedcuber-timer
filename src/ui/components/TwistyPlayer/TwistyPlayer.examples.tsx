// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AlgorithmBuilder,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  PUZZLE_CLOCK,
  PUZZLE_MEGAMINX,
  PUZZLE_PYRAMINX,
  PUZZLE_SKEWB,
  PUZZLE_SQUARE_1,
} from '../../../lib/stif';
import { DevelopmentExampleSet } from '../../examples/types';

import TwistyPlayer from './TwistyPlayer';

const examples: DevelopmentExampleSet = {
  key: 'twisty-player',
  title: 'Twisty Player',
  description: 'The interactive viewer for all models of twisty puzzles.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <TwistyPlayer />,
    },
    {
      key: '2x2x2',
      title: '2x2x2',
      component: <TwistyPlayer puzzle={PUZZLE_2x2x2} />,
    },
    {
      key: '3x3x3',
      title: '3x3x3',
      component: <TwistyPlayer puzzle={PUZZLE_3x3x3} />,
    },
    {
      key: '4x4x4',
      title: '4x4x4',
      component: <TwistyPlayer puzzle={PUZZLE_4x4x4} />,
    },
    {
      key: '5x5x5',
      title: '5x5x5',
      component: <TwistyPlayer puzzle={PUZZLE_5x5x5} />,
    },
    {
      key: '6x6x6',
      title: '6x6x6',
      component: <TwistyPlayer puzzle={PUZZLE_6x6x6} />,
    },
    {
      key: '7x7x7',
      title: '7x7x7',
      component: <TwistyPlayer puzzle={PUZZLE_7x7x7} />,
    },
    {
      key: 'clock',
      title: 'Clock',
      component: <TwistyPlayer puzzle={PUZZLE_CLOCK} />,
    },
    {
      key: 'megaminx',
      title: 'Megaminx',
      component: <TwistyPlayer puzzle={PUZZLE_MEGAMINX} />,
    },
    {
      key: 'pyraminx',
      title: 'Pyraminx',
      component: <TwistyPlayer puzzle={PUZZLE_PYRAMINX} />,
    },
    {
      key: 'skewb',
      title: 'Skewb',
      component: <TwistyPlayer puzzle={PUZZLE_SKEWB} />,
    },
    {
      key: 'square-1',
      title: 'Square-1',
      component: <TwistyPlayer puzzle={PUZZLE_SQUARE_1} />,
    },
    {
      key: '2D',
      title: '2D',
      component: <TwistyPlayer visualization="2D" />,
    },
    {
      key: 'back-view-top-right',
      title: 'Back View (top-right)',
      component: <TwistyPlayer backView="top-right" />,
    },
    {
      key: 'back-view-side-by-side',
      title: 'Back View (side-by-side)',
      component: <TwistyPlayer backView="side-by-side" />,
    },
    {
      key: 'hint-facelets-floating',
      title: 'Hint Facelets (floating)',
      component: <TwistyPlayer hintFacelets="floating" />,
    },
    {
      key: 'custom-scramble',
      title: 'Custom Scramble',
      component: (
        <TwistyPlayer
          algorithm={new AlgorithmBuilder()
            .setMoves("R U R' U'".split(' '))
            .build()}
        />
      ),
    },
  ],
};

export default examples;
