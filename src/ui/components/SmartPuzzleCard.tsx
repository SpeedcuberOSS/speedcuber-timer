// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
} from 'react-native-paper';
import Icons, { IconFunction } from '../utils/iconHelper';
import { PUZZLE_2x2x2, PUZZLE_3x3x3, Puzzle } from '../../lib/stif';

import { ConnectionStatus } from '../../lib/bluetooth-puzzle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface SmartPuzzleCardProps {
  name: string;
  brand: string;
  connectionStatus?: ConnectionStatus;
  puzzle?: Puzzle;
  onConnect: () => Promise<void>;
}

const PuzzleIcon = new Map<Puzzle, IconFunction>([
  [PUZZLE_2x2x2, Icons.MaterialCommunityIcons('grid-large')],
  [PUZZLE_3x3x3, Icons.MaterialCommunityIcons('grid')],
]);

function SmartcubeCard({
  name = 'Unknown Name',
  brand = 'Unknown Brand',
  puzzle = PUZZLE_3x3x3,
  connectionStatus = 'pending',
  onConnect,
}: SmartPuzzleCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Title
        title={name}
        subtitle={brand}
        left={PuzzleIcon.get(puzzle) ?? Icons.FontAwesome('question')}
        right={props => {
          if (connectionStatus === 'pending') {
            return (
              <Button
                {...props}
                onPress={onConnect}
                icon={Icons.MaterialCommunityIcons('bluetooth')}
                mode={'contained-tonal'}
                style={styles.button}>
                {t('bluetooth.connect')}
              </Button>
            );
          } else if (connectionStatus === 'connecting') {
            return <ActivityIndicator animating style={styles.connection} />;
          } else if (connectionStatus === 'connected') {
            return (
              <IconButton
                icon={Icons.MaterialCommunityIcons('bluetooth-connect')}
                style={styles.connection}
              />
            );
          } else if (connectionStatus === 'failed') {
            return (
              <IconButton
                icon={Icons.Entypo('warning')}
                style={styles.connection}
              />
            );
          } else {
            return (
              <IconButton
                icon={Icons.FontAwesome('question')}
                style={styles.connection}
              />
            );
          }
        }}
      />
    </Card>
  );
}

export default SmartcubeCard;

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  connection: {
    marginHorizontal: 20,
  },
});
