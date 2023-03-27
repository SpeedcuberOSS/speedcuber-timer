// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DemoBluetoothDevice } from '../../../lib/bluetooth-puzzle/DemoBluetoothDevice';
import { ParticulaPuzzle } from '../../../lib/bluetooth-puzzle';
import SmartPuzzleConnector from './SmartPuzzleConnector';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

const device = new DemoBluetoothDevice();
device.delayConnection(1000);
const puzzle = new ParticulaPuzzle(device);

// storiesOf('SmartPuzzleConnector', module).add('3x3x3', () => (
//   // This component works in the app, but in Storybook, the Promises
//   // do not resolve properly, so it does not work there.
//   <SmartPuzzleConnector smartPuzzle={puzzle} onMove={() => {}} />
// ));
