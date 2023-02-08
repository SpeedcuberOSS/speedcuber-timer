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

import TwistyPlayer from './TwistyPlayer';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

const visualizationKnob = select('Visualization', ['2D', '3D'], '3D');

storiesOf('TwistyPlayer', module)
  .add('default', () => <TwistyPlayer />)
  .add('2x2x2', () => (
    <TwistyPlayer puzzle={PUZZLE_2x2x2} visualization={visualizationKnob} />
  ))
  .add('3x3x3', () => (
    <TwistyPlayer puzzle={PUZZLE_3x3x3} visualization={visualizationKnob} />
  ))
  .add('4x4x4', () => (
    <TwistyPlayer puzzle={PUZZLE_4x4x4} visualization={visualizationKnob} />
  ))
  .add('5x5x5', () => (
    <TwistyPlayer puzzle={PUZZLE_5x5x5} visualization={visualizationKnob} />
  ))
  .add('6x6x6', () => (
    <TwistyPlayer puzzle={PUZZLE_6x6x6} visualization={visualizationKnob} />
  ))
  .add('7x7x7', () => (
    <TwistyPlayer puzzle={PUZZLE_7x7x7} visualization={visualizationKnob} />
  ))
  .add('clock', () => (
    <TwistyPlayer puzzle={PUZZLE_CLOCK} visualization={visualizationKnob} />
  ))
  .add('megaminx', () => (
    <TwistyPlayer puzzle={PUZZLE_MEGAMINX} visualization={visualizationKnob} />
  ))
  .add('pyraminx', () => (
    <TwistyPlayer puzzle={PUZZLE_PYRAMINX} visualization={visualizationKnob} />
  ))
  .add('skewb', () => (
    <TwistyPlayer puzzle={PUZZLE_SKEWB} visualization={visualizationKnob} />
  ))
  .add('square 1', () => (
    <TwistyPlayer puzzle={PUZZLE_SQUARE_1} visualization={visualizationKnob} />
  ))
  .add('2D', () => <TwistyPlayer visualization="2D" />)
  .add('Back View (top-right)', () => <TwistyPlayer backView="top-right" />)
  .add('Back View (side-by-side)', () => (
    <TwistyPlayer backView="side-by-side" />
  ))
  .add('Hint Facelets', () => <TwistyPlayer hintFacelets="floating" />)
  .add('Custom Scramble', () => (
    <TwistyPlayer
      algorithm={new AlgorithmBuilder()
        .setMoves("R U R' U'".split(' '))
        .build()}
    />
  ));
