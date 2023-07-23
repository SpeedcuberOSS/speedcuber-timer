// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View } from 'react-native';
import { DevelopmentExampleSet } from '../examples/types';
import Ticker from './Ticker';
import { List } from 'react-native-paper';

const examples: DevelopmentExampleSet = {
  key: 'ticker',
  title: 'Ticker',
  description: 'Increment and decrement a value with buttons.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: (
        <Ticker onChange={value => console.log(`Ticker is now ${value}`)} />
      ),
    },
    {
      key: 'horizontal',
      title: 'Horizontal',
      component: <Ticker orientation="horizontal" />,
    },
    {
      key: 'min-0',
      title: 'Min 0',
      component: <Ticker min={0} initialValue={0} />,
    },
    {
      key: 'init-lt-min',
      title: 'Initial < Min',
      component: <Ticker min={0} initialValue={-10} />,
    },
    {
      key: 'max-10',
      title: 'Max 10',
      component: <Ticker max={10} initialValue={10} />,
    },
    {
      key: 'init-gt-max',
      title: 'Initial > Max',
      component: <Ticker max={10} initialValue={15} />,
    },
    {
      key: 'max-lt-min',
      title: 'Max < Min',
      component: <Ticker min={10} max={-10} />,
    },
    {
      key: 'min-eq-maz',
      title: 'Min = Max',
      component: <Ticker min={10} max={10} />,
    },
    {
      key: 'step-5',
      title: 'Step 5',
      component: <Ticker step={5} />,
    },
    {
      key: 'starting-13',
      title: 'Starting 13',
      component: <Ticker initialValue={13} />,
    },
    {
      key: 'everything-vertical',
      title: 'Everything (Vertical)',
      component: (
        <Ticker
          initialValue={7}
          min={3}
          max={15}
          step={5}
          onChange={value => console.log(`Ticker is now ${value}`)}
        />
      ),
    },
    {
      key: 'everything-horizontal',
      title: 'Everything (Horizontal)',
      component: (
        <Ticker
          initialValue={7}
          min={3}
          max={15}
          step={5}
          onChange={value => console.log(`Ticker is now ${value}`)}
          orientation='horizontal'
        />
      ),
    },
    {
      key: 'cramped',
      title: 'Cramped',
      component: (
        <View style={{ margin: 200 }}>
          <Ticker
            initialValue={7}
            min={3}
            max={15}
            step={5}
            onChange={value => console.log(`Ticker is now ${value}`)}
            orientation='horizontal'
          />
        </View>
      ),
    },
    {
      key: 'listitem',
      title: 'Inside List Item',
      component: (
        <List.Item
          title="Ticker"
          right={props => (
            <Ticker
              initialValue={7}
              min={3}
              max={15}
              step={5}
              onChange={value => console.log(`Ticker is now ${value}`)}
              orientation="horizontal"
            />
          )}
        />
      ),
    },
  ],
};

export default examples;
