// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Card, Switch, useTheme } from 'react-native-paper';
import Icons, { IconFunction } from '../../icons/iconHelper';
import { PUZZLE_2x2x2, PUZZLE_3x3x3 } from '../../../lib/stif/builtins';
import { STIF } from '../../../lib/stif';

import { ConnectionStatus } from './types';
import { StyleSheet, View } from 'react-native';

interface SmartPuzzleCardProps {
  name?: string;
  brand?: string;
  connectionStatus?: ConnectionStatus;
  puzzle?: STIF.Puzzle;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

interface BluetoothSwitchProps {
  connectionStatus: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

const PuzzleIcons = new Map<STIF.Puzzle, IconFunction>([
  [PUZZLE_2x2x2, Icons.WCAEvent('222')],
  [PUZZLE_3x3x3, Icons.WCAEvent('333')],
]);

function getPuzzleIcon(puzzle: STIF.Puzzle): IconFunction {
  return PuzzleIcons.get(puzzle) || Icons.FontAwesome('question');
}

function BluetoothSwitch({
  connectionStatus,
  onConnect,
  onDisconnect,
}: BluetoothSwitchProps) {
  const theme = useTheme();
  return (
    <View style={styles.btSwitch}>
      {Icons.MaterialCommunityIcons('bluetooth')({
        size: 24,
        color:
          connectionStatus == 'disconnected'
            ? theme.colors.onBackground
            : theme.colors.onSurfaceDisabled,
      })}
      <Switch
        disabled={connectionStatus == 'connecting'}
        value={connectionStatus == 'connected'}
        onValueChange={
          connectionStatus == 'connected' ? onDisconnect : onConnect
        }
      />
      {connectionStatus === 'failed'
        ? Icons.Entypo('warning')({
            size: 24,
            color: theme.colors.error,
          })
        : Icons.MaterialCommunityIcons('bluetooth-connect')({
            size: 24,
            color:
              connectionStatus == 'connected'
                ? theme.colors.onBackground
                : theme.colors.onSurfaceDisabled,
          })}
    </View>
  );
}

function SmartPuzzleCard({
  name = 'Unknown Name',
  brand = 'Unknown Brand',
  puzzle = PUZZLE_3x3x3,
  connectionStatus = 'disconnected',
  onConnect = () => {},
  onDisconnect = () => {},
}: SmartPuzzleCardProps) {
  const theme = useTheme();
  return (
    <Card style={styles.card}>
      <Card.Title
        style={styles.title}
        title={name}
        subtitle={brand}
        left={() =>
          getPuzzleIcon(puzzle)({ size: 24, color: theme.colors.onBackground })
        }
        leftStyle={{ marginRight: 0 }}
        right={() => {
          return (
            <BluetoothSwitch
              connectionStatus={connectionStatus}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
            />
          );
        }}
        rightStyle={{ marginLeft: 0 }}
      />
    </Card>
  );
}

export default SmartPuzzleCard;

const styles = StyleSheet.create({
  card: { marginTop: 8, marginHorizontal: 8 },
  title: { paddingVertical: 10 },
  btSwitch: { flexDirection: 'row', marginRight: 18 },
});
