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
} from '../../lib/stif';
import { StyleSheet, View } from 'react-native';

import React from 'react';
import VerticalSplit from './VerticalSplit';
import { storiesOf } from '@storybook/react-native';

const styles = StyleSheet.create({
  red: {
    flex: 1,
    backgroundColor: 'red',
  },
  blue: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

storiesOf('VerticalSplit', module)
  .add('default (50% top)', () => (
    <VerticalSplit
      top={<View style={styles.red} />}
      bottom={<View style={styles.blue} />}
    />
  ))
  .add('75% top', () => (
    <VerticalSplit
      top={<View style={styles.red} />}
      bottom={<View style={styles.blue} />}
      proportion={75}
    />
  ))
  .add('33% top', () => (
    <VerticalSplit
      top={<View style={styles.red} />}
      bottom={<View style={styles.blue} />}
      proportion={33}
    />
  ));
