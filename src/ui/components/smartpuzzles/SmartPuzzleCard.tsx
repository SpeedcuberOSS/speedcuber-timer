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
  useTheme,
} from 'react-native-paper';
import Icons, { IconFunction } from '../../icons/iconHelper';
import { PUZZLE_2x2x2, PUZZLE_3x3x3 } from '../../../lib/stif/builtins';
import { STIF } from '../../../lib/stif';

import { ConnectionStatus } from './types';
import { StyleSheet } from 'react-native';

interface SmartPuzzleCardProps {
  name?: string;
  brand?: string;
  connectionStatus?: ConnectionStatus;
  puzzle?: STIF.Puzzle;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const PuzzleIcons = new Map<STIF.Puzzle, IconFunction>([
  [PUZZLE_2x2x2, Icons.WCAEvent('222')],
  [PUZZLE_3x3x3, Icons.WCAEvent('333')],
]);

function getPuzzleIcon(puzzle: STIF.Puzzle): IconFunction {
  return PuzzleIcons.get(puzzle) || Icons.FontAwesome('question');
}

function SmartPuzzleCard({
  name = 'Unknown Name',
  brand = 'Unknown Brand',
  puzzle = PUZZLE_3x3x3,
  connectionStatus = 'disconnected',
  onConnect = () => {},
  onDisconnect = () => {},
}: SmartPuzzleCardProps) {
  const theme = useTheme()
  return (
    <Card style={styles.card}>
      <Card.Title
        style={styles.title}
        title={name}
        subtitle={
          <Chip icon={getPuzzleIcon(puzzle)} mode="outlined" disabled>
            <Text variant="bodySmall">{brand}</Text>
          </Chip>
        }
        right={() => {
          switch (connectionStatus) {
            case 'disconnected':
              return (
                <IconButton
                  mode="contained"
                  icon={Icons.MaterialCommunityIcons('bluetooth')}
                  style={styles.connection}
                  onPress={onConnect}
                />
              );
            case 'connecting':
              return <ActivityIndicator animating style={styles.connecting} />;
            case 'connected':
              return (
                <IconButton
                  mode="outlined"
                  icon={Icons.MaterialCommunityIcons('bluetooth-connect')}
                  style={styles.connection}
                  onPress={onDisconnect}
                />
              );
            case 'failed':
              return (
                <IconButton
                  icon={Icons.Entypo('warning')}
                  style={styles.connection}
                />
              );
            default:
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

export default SmartPuzzleCard;

const styles = StyleSheet.create({
  card: { marginTop: 8, marginHorizontal: 8},
  title: { paddingVertical: 10 },
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
