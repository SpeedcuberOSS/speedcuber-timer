// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ActivityIndicator,
  Card,
  Chip,
  IconButton,
  Text,
} from 'react-native-paper';
import Icons, { IconFunction } from '../../icons/iconHelper';
import { PUZZLE_2x2x2, PUZZLE_3x3x3, Puzzle } from '../../../lib/stif';

import { ConnectionStatus } from '../../../lib/bluetooth-puzzle';
import { StyleSheet } from 'react-native';

interface SmartPuzzleCardProps {
  name: string;
  brand: string;
  connectionStatus?: ConnectionStatus;
  puzzle?: Puzzle;
  onConnect: () => void;
  onDisconnect: () => void;
}

const PuzzleIcons = new Map<Puzzle, IconFunction>([
  [PUZZLE_2x2x2, Icons.WCAEvent('222')],
  [PUZZLE_3x3x3, Icons.WCAEvent('333')],
]);

function getPuzzleIcon(puzzle: Puzzle): IconFunction {
  return PuzzleIcons.get(puzzle) || Icons.FontAwesome('question');
}

function SmartPuzzleCard({
  name = 'Unknown Name',
  brand = 'Unknown Brand',
  puzzle = PUZZLE_3x3x3,
  connectionStatus = ConnectionStatus.DISCONNECTED,
  onConnect,
  onDisconnect,
}: SmartPuzzleCardProps) {
  return (
    <Card style={{ marginTop: 8, marginHorizontal: 8 }}>
      <Card.Title
        style={{ paddingVertical: 10 }}
        title={name}
        subtitle={
          <Chip icon={getPuzzleIcon(puzzle)} mode="outlined" disabled>
            <Text variant="bodySmall">{brand}</Text>
          </Chip>
        }
        right={() => {
          if (connectionStatus === ConnectionStatus.DISCONNECTED) {
            return (
              // @ts-ignore
              <IconButton
                mode="contained"
                icon={Icons.MaterialCommunityIcons('bluetooth')}
                style={styles.connection}
                onPress={onConnect}
              />
            );
          } else if (connectionStatus === ConnectionStatus.CONNECTING) {
            return <ActivityIndicator animating style={styles.connecting} />;
          } else if (connectionStatus === ConnectionStatus.CONNECTED) {
            return (
              // @ts-ignore
              <IconButton
                mode="contained"
                icon={Icons.MaterialCommunityIcons('bluetooth-connect')}
                style={styles.connection}
                onPress={onDisconnect}
              />
            );
          } else if (connectionStatus === 'failed') {
            return (
              // @ts-ignore
              <IconButton
                icon={Icons.Entypo('warning')}
                style={styles.connection}
              />
            );
          } else {
            return (
              // @ts-ignore
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

export default SmartPuzzleCard;

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  connecting: {
    marginHorizontal: 28,
  },
  connection: {
    marginHorizontal: 20,
  },
});
