// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_SQUARE_1 } from '../../../lib/stif/builtins';

import { ConnectionStatus } from './types';
import { DevelopmentExampleSet } from '../../examples/types';
import SmartPuzzleCard from './SmartPuzzleCard';
import { View } from 'react-native';
import { useState } from 'react';

const examples: DevelopmentExampleSet = {
  title: 'Smart Puzzle Card',
  description: 'Card for identifying a smart puzzle.',
  examples: [
    {
      title: 'Default',
      component: <SmartPuzzleCard />,
    },
    {
      title: "Rubik's Connected",
      component: (
        <SmartPuzzleCard name="Rubik_12345" brand="Rubik's Connected" />
      ),
    },
    {
      title: 'GiiKER i2',
      component: (
        <SmartPuzzleCard
          name="Giiker_12345"
          brand="Giiker Super Cube i2"
          puzzle={PUZZLE_2x2x2}
        />
      ),
    },
    {
      title: 'Super long brand name',
      component: (
        <SmartPuzzleCard
          name="Puzzle_123456789012345678901234567890"
          brand="Lorem Isum Dolor Sit Amet Cubes Julius Caeser's @thehale Outfit"
        />
      ),
    },
    {
      title: 'Unsupported Puzzle Type',
      component: (
        <SmartPuzzleCard
          name="FooBar"
          brand="Mysterious Cubes"
          puzzle={PUZZLE_SQUARE_1}
        />
      ),
    },
    {
      title: 'Connecting',
      component: (
        <SmartPuzzleCard
          name="Rubik_12345"
          brand="Rubik's Connected"
          connectionStatus={'connecting'}
        />
      ),
    },

    {
      title: 'Connected',
      component: (
        <SmartPuzzleCard
          name="Rubik_12345"
          brand="Rubik's Connected"
          connectionStatus={'connected'}
        />
      ),
    },
    {
      title: 'Disconnected',
      component: (
        <SmartPuzzleCard
          name="Rubik_12345"
          brand="Rubik's Connected"
          connectionStatus={'disconnected'}
        />
      ),
    },
    {
      title: 'Failed',
      component: (
        <SmartPuzzleCard
          name="Rubik_12345"
          brand="Rubik's Connected"
          connectionStatus={'failed'}
        />
      ),
    },
    {
      title: 'Compact',
      component: (
        <View style={{maxWidth: '60%'}}>
          <SmartPuzzleCard />
        </View>
      ),
    },
    {
      title: 'Interactive (Success)',
      component: () => {
        const [connectionStatus, setConnectionStatus] =
          useState<ConnectionStatus>('disconnected');
        return (
          <SmartPuzzleCard
            name="Rubik_12345"
            brand="Rubik's Connected"
            connectionStatus={connectionStatus}
            onConnect={() => {
              setConnectionStatus('connecting');
              setTimeout(() => setConnectionStatus('connected'), 1000);
            }}
            onDisconnect={() => setConnectionStatus('disconnected')}
          />
        );
      },
    },
    {
      title: 'Interactive (Failure)',
      component: () => {
        const [connectionStatus, setConnectionStatus] =
          useState<ConnectionStatus>('disconnected');
        return (
          <SmartPuzzleCard
            name="Rubik_12345"
            brand="Rubik's Connected"
            connectionStatus={connectionStatus}
            onConnect={() => {
              setConnectionStatus('connecting');
              setTimeout(() => setConnectionStatus('failed'), 1000);
            }}
            onDisconnect={() => setConnectionStatus('disconnected')}
          />
        );
      },
    },
  ],
};

export default examples;
