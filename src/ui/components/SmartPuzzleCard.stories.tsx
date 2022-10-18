// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_SQUARE_1 } from '../../lib/stif';

import React from 'react';
import SmartPuzzleCard from './SmartPuzzleCard';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

async function connectSuccessfully(): Promise<void> {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(action('connected')());
    }, 3000);
  });
}

async function connectFailure(): Promise<void> {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(action('connectionFailed')());
    }, 3000);
  });
}

storiesOf('SmartPuzzleCard', module)
  .add('3x3x3', () => (
    <SmartPuzzleCard
      name="Rubik_12345"
      brand="Rubik's Connected"
      onConnect={connectSuccessfully}
    />
  ))
  .add('2x2x2', () => (
    <SmartPuzzleCard
      name="Giiker_12345"
      brand="Giiker Super Cube i2"
      puzzle={PUZZLE_2x2x2}
      onConnect={connectSuccessfully}
    />
  ))
  .add('long names', () => (
    <SmartPuzzleCard
      name="Puzzle_1234567890"
      brand="Lorem Isum Dolor Sit Amet Cubes"
      onConnect={connectSuccessfully}
    />
  ))
  .add('unknown puzzle', () => (
    <SmartPuzzleCard
      name="FooBar"
      brand="Mysterious Cubes"
      puzzle={PUZZLE_SQUARE_1}
      onConnect={connectFailure}
    />
  ))
  .add('connecting', () => (
    <SmartPuzzleCard
      name="Rubik_12345"
      brand="Rubik's Connected"
      connectionStatus="connecting"
      onConnect={connectSuccessfully}
    />
  ))
  .add('connected', () => (
    <SmartPuzzleCard
      name="Rubik_12345"
      brand="Rubik's Connected"
      connectionStatus="connected"
      onConnect={connectSuccessfully}
    />
  ))
  .add('failed', () => (
    <SmartPuzzleCard
      name="Rubik_12345"
      brand="Rubik's Connected"
      connectionStatus="failed"
      onConnect={connectFailure}
    />
  ));
