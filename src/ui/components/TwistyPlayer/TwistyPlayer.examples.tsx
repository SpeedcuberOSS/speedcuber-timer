// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
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
} from '../../../lib/stif/builtins';

import { DevelopmentExampleSet } from '../../examples/types';
import TwistyPlayer from './TwistyPlayer';

const examples: DevelopmentExampleSet = {
  title: 'Twisty Player',
  description: 'The interactive viewer for all models of twisty puzzles.',
  examples: [
    {
      title: 'Default',
      component: <TwistyPlayer />,
    },
    {
      title: '2x2x2',
      component: <TwistyPlayer puzzle={PUZZLE_2x2x2} />,
    },
    {
      title: '3x3x3',
      component: <TwistyPlayer puzzle={PUZZLE_3x3x3} />,
    },
    {
      title: '4x4x4',
      component: <TwistyPlayer puzzle={PUZZLE_4x4x4} />,
    },
    {
      title: '5x5x5',
      component: <TwistyPlayer puzzle={PUZZLE_5x5x5} />,
    },
    {
      title: '6x6x6',
      component: <TwistyPlayer puzzle={PUZZLE_6x6x6} />,
    },
    {
      title: '7x7x7',
      component: <TwistyPlayer puzzle={PUZZLE_7x7x7} />,
    },
    {
      title: 'Clock',
      component: <TwistyPlayer puzzle={PUZZLE_CLOCK} />,
    },
    {
      title: 'Megaminx',
      component: <TwistyPlayer puzzle={PUZZLE_MEGAMINX} />,
    },
    {
      title: 'Pyraminx',
      component: <TwistyPlayer puzzle={PUZZLE_PYRAMINX} />,
    },
    {
      title: 'Skewb',
      component: <TwistyPlayer puzzle={PUZZLE_SKEWB} />,
    },
    {
      title: 'Square-1',
      component: <TwistyPlayer puzzle={PUZZLE_SQUARE_1} />,
    },
    {
      title: '2D',
      component: <TwistyPlayer visualization="2D" />,
    },
    {
      title: 'Back View (top-right)',
      component: <TwistyPlayer backView="top-right" />,
    },
    {
      title: 'Back View (side-by-side)',
      component: <TwistyPlayer backView="side-by-side" />,
    },
    {
      title: 'Hint Facelets (floating)',
      component: <TwistyPlayer hintFacelets="floating" />,
    },
    {
      title: 'Custom Scramble',
      component: (
        <TwistyPlayer
          algorithm={"R U R' U'".split(' ')}
        />
      ),
    },
  ],
};

export default examples;
