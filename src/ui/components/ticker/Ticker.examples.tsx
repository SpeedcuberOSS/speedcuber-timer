// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import { List } from 'react-native-paper';
import Ticker from './Ticker';
import { View } from 'react-native';

const examples: DevelopmentExampleSet = {
  title: 'Ticker',
  description: 'Increment and decrement a value with buttons.',
  examples: [
    {
      title: 'Default',
      component: (
        <Ticker onChange={value => console.log(`Ticker is now ${value}`)} />
      ),
    },
    {
      title: 'Horizontal',
      component: <Ticker orientation="horizontal" />,
    },
    {
      title: 'Min 0',
      component: <Ticker min={0} initialValue={0} />,
    },
    {
      title: 'Initial < Min',
      component: <Ticker min={0} initialValue={-10} />,
    },
    {
      title: 'Max 10',
      component: <Ticker max={10} initialValue={10} />,
    },
    {
      title: 'Initial > Max',
      component: <Ticker max={10} initialValue={15} />,
    },
    {
      title: 'Max < Min',
      component: <Ticker min={10} max={-10} />,
    },
    {
      title: 'Min = Max',
      component: <Ticker min={10} max={10} />,
    },
    {
      title: 'Step 5',
      component: <Ticker step={5} />,
    },
    {
      title: 'Starting 13',
      component: <Ticker initialValue={13} />,
    },
    {
      title: 'Large Numbers (Vertical)',
      component: <Ticker initialValue={1397} step={10000} />,
    },
    {
      title: 'Large Numbers (Horizontal)',
      component: <Ticker initialValue={1397} step={10000} orientation='horizontal'/>,
    },
    {
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
