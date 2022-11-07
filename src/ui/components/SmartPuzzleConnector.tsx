// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BluetoothPuzzle,
  ConnectionStatus,
  MoveListener,
} from '../../lib/bluetooth-puzzle';
import React, { useEffect, useState } from 'react';

import SmartPuzzleCard from './SmartPuzzleCard';
import { StyleSheet } from 'react-native';

interface SmartPuzzleConnectorProps {
  smartPuzzle: BluetoothPuzzle;
  onMove: MoveListener;
}

const SmartPuzzleConnector = ({
  smartPuzzle,
  onMove,
}: SmartPuzzleConnectorProps) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    smartPuzzle.connectionStatus(),
  );
  useEffect(() => {
    smartPuzzle.addConnectionStatusListener(s => setConnectionStatus(s));
  }, []);
  return (
    <SmartPuzzleCard
      key={smartPuzzle.id()}
      name={smartPuzzle.name()}
      brand={smartPuzzle.brand()}
      puzzle={smartPuzzle.puzzle()}
      connectionStatus={connectionStatus}
      onConnect={async () => {
        await smartPuzzle.connect();
        smartPuzzle.addMoveListener(onMove);
      }}
    />
  );
};

export default SmartPuzzleConnector;

const styles = StyleSheet.create({});
