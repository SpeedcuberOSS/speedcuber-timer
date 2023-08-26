// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PUZZLE_2x2x2, PUZZLE_SQUARE_1 } from '../../../lib/stif/builtins';

import { ConnectionStatus } from './types';
import SmartPuzzleCard from './SmartPuzzleCard';
import { DevelopmentExampleSet } from '../../examples/types';
import { useState } from 'react';
import { View } from 'react-native';

const examples: DevelopmentExampleSet = {
  key: 'smart-puzzle-card',
  title: 'Smart Puzzle Card',
  description: 'Card for identifying a smart puzzle.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <SmartPuzzleCard />,
    },
    {
      key: 'rubiks-connected',
      title: "Rubik's Connected",
      component: (
        <SmartPuzzleCard name="Rubik_12345" brand="Rubik's Connected" />
      ),
    },
    {
      key: 'giiker-i2',
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
      key: 'long-brand-name',
      title: 'Super long brand name',
      component: (
        <SmartPuzzleCard
          name="Puzzle_123456789012345678901234567890"
          brand="Lorem Isum Dolor Sit Amet Cubes Julius Caeser's @thehale Outfit"
        />
      ),
    },
    {
      key: 'unsupported-puzzle-type',
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
      key: 'connecting',
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
      key: 'connected',
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
      key: 'disconnected',
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
      key: 'failed',
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
      key: 'compact',
      title: 'Compact',
      component: (
        <View style={{maxWidth: '60%'}}>
          <SmartPuzzleCard />
        </View>
      ),
    },
    {
      key: 'interactive-success',
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
      key: 'interactive-failure',
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
