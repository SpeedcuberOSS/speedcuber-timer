// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ConnectionStatus, MoveListener } from '../../lib/bluetooth-puzzle';
import PuzzleRegistry, {
  BluetoothPuzzle,
} from '../utils/bluetooth/SmartPuzzleRegistry';
import React, { useEffect, useState } from 'react';

import ErrorDialog from './ErrorDialog';
import SmartPuzzleCard from './SmartPuzzleCard';
import { SmartPuzzleError } from '../utils/bluetooth/SmartPuzzleError';
import { StyleSheet } from 'react-native';
import useErrorGuard from '../hooks/useErrorGuard';

interface SmartPuzzleConnectorProps {
  smartPuzzle: BluetoothPuzzle;
  onMove?: MoveListener;
}

async function getConnectionStatus(
  puzzle: BluetoothPuzzle,
): Promise<ConnectionStatus> {
  return (await puzzle.device.isConnected())
    ? ConnectionStatus.CONNECTED
    : ConnectionStatus.DISCONNECTED;
}

const SmartPuzzleConnector = ({
  smartPuzzle,
  onMove,
}: SmartPuzzleConnectorProps) => {
  const { error, guard } = useErrorGuard(SmartPuzzleError);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED,
  );
  useEffect(() => {
    getConnectionStatus(smartPuzzle).then(setConnectionStatus);
  }, [smartPuzzle]);

  async function onInitiateConnection() {
    setConnectionStatus(ConnectionStatus.CONNECTING);
    await guard(async () => await PuzzleRegistry.connect(smartPuzzle));
    setConnectionStatus(await getConnectionStatus(smartPuzzle));
  }

  async function onTerminateConnection() {
    await guard(async () => await PuzzleRegistry.disconnect(smartPuzzle));
    setConnectionStatus(await getConnectionStatus(smartPuzzle));
  }

  return (
    <>
      <SmartPuzzleCard
        key={smartPuzzle.device.id}
        name={smartPuzzle.device.name ?? 'Unknown'}
        brand={smartPuzzle.brand}
        puzzle={smartPuzzle.puzzle}
        connectionStatus={connectionStatus}
        onConnect={onInitiateConnection}
        onDisconnect={onTerminateConnection}
      />
      <ErrorDialog error={error} />
    </>
  );
};

export default SmartPuzzleConnector;

const styles = StyleSheet.create({});
