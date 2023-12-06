// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Card, Switch, useTheme } from 'react-native-paper';
import Icons, { IconFunction } from '../../icons/iconHelper';
import { PUZZLE_2x2x2, PUZZLE_3x3x3 } from '../../../lib/stif/builtins';
import { StyleSheet, View } from 'react-native';

import { ConnectionStatus } from './types';
import { STIF } from '../../../lib/stif';
import { useCallback } from 'react';

interface SmartPuzzleCardProps {
  name?: string;
  brand?: string;
  connectionStatus?: ConnectionStatus;
  puzzle?: STIF.Puzzle;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

interface BluetoothSwitchProps {
  connectionStatus: ConnectionStatus;
  disabled?: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const PuzzleIcons = new Map<STIF.Puzzle, IconFunction>([
  [PUZZLE_2x2x2, Icons.STIF('event-222')],
  [PUZZLE_3x3x3, Icons.STIF('event-333')],
]);

function getPuzzleIcon(puzzle: STIF.Puzzle): IconFunction {
  return PuzzleIcons.get(puzzle) || Icons.FontAwesome('question');
}

function BluetoothSwitch({
  connectionStatus,
  disabled = false,
  onConnect,
  onDisconnect,
}: BluetoothSwitchProps) {
  const theme = useTheme();
  return (
    <View style={styles.btSwitch}>
      {Icons.MaterialCommunityIcons('bluetooth')({
        size: 24,
        color:
          !disabled && connectionStatus == 'disconnected'
            ? theme.colors.onBackground
            : theme.colors.onSurfaceDisabled,
      })}
      <Switch
        disabled={disabled || connectionStatus == 'connecting'}
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
              !disabled && connectionStatus == 'connected'
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
  onSelect,
  onDeselect = () => {},
  selectable = true,
  selected = false,
}: SmartPuzzleCardProps) {
  const canSelect = connectionStatus === 'connected' && selectable;

  const theme = useTheme();

  const handlePress = useCallback(() => {
    if (selected) onDeselect();
    else if (canSelect && onSelect) onSelect();
  }, [connectionStatus, onSelect]);

  const handleDisconnect = useCallback(() => {
    if (connectionStatus === 'connected') {
      onDisconnect();
      onDeselect();
    }
  }, [connectionStatus, onDisconnect, onDeselect]);
  console.log(canSelect, onSelect, canSelect || !onSelect)
  const puzzleIconStyle = {
    size: 24,
    color:
      canSelect || !onSelect
        ? theme.colors.onBackground
        : theme.colors.onSurfaceDisabled,
  };

  const textStyle = {
    color:
      canSelect || !onSelect
        ? theme.colors.onBackground
        : theme.colors.onSurfaceDisabled,
  };

  return (
    <Card
      style={styles.card}
      onPress={handlePress}
      mode={selected ? 'contained' : 'elevated'}>
      <Card.Title
        title={name}
        titleStyle={textStyle}
        subtitle={brand}
        subtitleStyle={textStyle}
        left={() => getPuzzleIcon(puzzle)(puzzleIconStyle)}
        leftStyle={{ marginRight: 0 }}
        right={() => {
          return (
            <BluetoothSwitch
              connectionStatus={connectionStatus}
              disabled={!selectable}
              onConnect={onConnect}
              onDisconnect={handleDisconnect}
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
  btSwitch: { flexDirection: 'row', marginRight: 18 },
});
