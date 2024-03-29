// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExample, DevelopmentExampleSet } from './types';

import { Text } from 'react-native-paper';
import { slugify } from './_utils';

const examples: Map<string, DevelopmentExampleSet> = new Map();
[
  require('../components/attempts/AttemptCard.examples').default,
  require('../components/attempts/AttemptDetails.examples').default,
  require('../components/attempts/AttemptDetailsModal.examples').default,
  require('../components/charts/AttemptsChart.examples').default,
  require('../components/charts/AveragesTable.examples').default,
  require('../components/charts/TPSChart.examples').default,
  require('../components/ConfirmationDialog.examples').default,
  require('../components/events/EventSelector.examples').default,
  require('../components/events/EventSelectorModal.examples').default,
  require('../components/events/EventSelectorModal.examples').default,
  require('../components/inspection/InspectionTime.examples').default,
  require('../components/inspection/InspectionTimer.examples').default,
  require('../components/PlayerControls/PlayerControls.examples').default,
  require('../components/scrambles/Scrambles.examples').default,
  require('../components/smartpuzzles/SmartPuzzleCard.examples').default,
  require('../components/smartpuzzles/SmartPuzzleScanner.examples').default,
  require('../components/solutions/Solution.examples').default,
  require('../components/ticker/Ticker.examples').default,
  require('../components/TwistyPlayer/AttemptPlayer.examples').default,
  require('../components/TwistyPlayer/TwistyPlayer.examples').default,
  require('../layouts/CenteredBetweenSidebars.examples').default,
  require('../layouts/SplitScreen.examples').default,
].forEach(e => examples.set(slugify(e.title), e));

/**
 * The valid keys for all known example sets
 * @returns A sorted array of all example set keys.
 */
function setKeys(): string[] {
  return Array.from(examples.keys()).sort();
}

/**
 * Retrieves an example set by its key
 * @param key The key of the example set to retrieve
 * @returns The corresponding example set
 */
function setByKey(key: string): DevelopmentExampleSet {
  return (
    examples.get(key) ?? {
      title: '404',
      description: '404',
      examples: [],
    }
  );
}

/**
 * Retrieves an example by its key
 * Key format: <set>:<example>
 * @param key The key of the example to retrieve
 * @returns The corresponding example
 */
function exampleByKey(key: string): DevelopmentExample {
  let [set, example] = key.split(':');
  return (
    examples
      .get(set)
      ?.examples.filter(e => slugify(e.title) === example)[0] ?? {
      title: '404',
      description: '404',
      component: <Text>404 Example Not Found</Text>,
    }
  );
}

export default {
  setKeys: setKeys,
  setByKey: setByKey,
  exampleByKey: exampleByKey,
};
