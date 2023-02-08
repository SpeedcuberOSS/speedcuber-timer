// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_SQUARE_1 } from '../../../lib/stif';

import { ConnectionStatus } from '../../../lib/bluetooth-puzzle';
import { ScrollView } from 'react-native';
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

// storiesOf('SmartPuzzleCard', module).add('variants', () => (
//   <ScrollView>
//     <SmartPuzzleCard
//       name="Rubik_12345"
//       brand="Rubik's Connected"
//       onConnect={connectSuccessfully}
//     />
//     <SmartPuzzleCard
//       name="Giiker_12345"
//       brand="Giiker Super Cube i2"
//       puzzle={PUZZLE_2x2x2}
//       onConnect={connectSuccessfully}
//     />
//     <SmartPuzzleCard
//       name="Puzzle_1234567890"
//       brand="Lorem Isum Dolor Sit Amet Cubes"
//       onConnect={connectSuccessfully}
//     />
//     <SmartPuzzleCard
//       name="FooBar"
//       brand="Mysterious Cubes"
//       puzzle={PUZZLE_SQUARE_1}
//       onConnect={connectFailure}
//     />
//     <SmartPuzzleCard
//       name="Rubik_12345"
//       brand="Rubik's Connected"
//       connectionStatus={ConnectionStatus.CONNECTING}
//       onConnect={connectSuccessfully}
//     />
//     <SmartPuzzleCard
//       name="Rubik_12345"
//       brand="Rubik's Connected"
//       connectionStatus={ConnectionStatus.CONNECTED}
//       onConnect={connectSuccessfully}
//     />
//     <SmartPuzzleCard
//       name="Rubik_12345"
//       brand="Rubik's Connected"
//       connectionStatus={ConnectionStatus.DISCONNECTED}
//       onConnect={connectFailure}
//     />
//   </ScrollView>
// ));
