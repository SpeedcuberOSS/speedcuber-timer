// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import PuzzleRegistry, { BluetoothPuzzle } from './SmartPuzzleRegistry';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ConnectionStatus } from './types';
import ErrorDialog from '../ErrorDialog';
import SmartPuzzleCard from './SmartPuzzleCard';
import { SmartPuzzleError } from './SmartPuzzleError';
import useErrorGuard from '../../hooks/useErrorGuard';

interface SmartPuzzleConnectorProps {
  smartPuzzle: BluetoothPuzzle;
  onSelectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  onDeselectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  isPuzzleSelectable?: (puzzle: BluetoothPuzzle) => boolean;
  isPuzzleSelected?: (puzzle: BluetoothPuzzle) => boolean;
}

async function getConnectionStatus(
  puzzle: BluetoothPuzzle,
): Promise<ConnectionStatus> {
  return (await puzzle.isConnected()) ? 'connected' : 'disconnected';
}

function useConnectionStatus(smartPuzzle: BluetoothPuzzle) {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');
  useEffect(() => {
    getConnectionStatus(smartPuzzle).then(setConnectionStatus);
  }, [smartPuzzle]);
  return [connectionStatus, setConnectionStatus] as const;
}

const SmartPuzzleConnector = ({
  smartPuzzle,
  onSelectPuzzle,
  onDeselectPuzzle,
  isPuzzleSelectable,
  isPuzzleSelected,
}: SmartPuzzleConnectorProps) => {
  const { error, guard } = useErrorGuard(SmartPuzzleError);
  
  const [connectionStatus, setConnectionStatus] =
    useConnectionStatus(smartPuzzle);
  
    const handleSelect = useCallback(() => {
    if (onSelectPuzzle) onSelectPuzzle(smartPuzzle);
  }, [onSelectPuzzle, smartPuzzle]);
  
  const selectable = useMemo(() => {
    if (isPuzzleSelectable) return isPuzzleSelectable(smartPuzzle);
    else return true;
  }, [isPuzzleSelectable, smartPuzzle]);
  
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (isPuzzleSelected)  setSelected(isPuzzleSelected(smartPuzzle));
    else setSelected(false);
  }, [isPuzzleSelected, smartPuzzle])
  
  const handleDeselect = useCallback(() => {
    if (onDeselectPuzzle) onDeselectPuzzle(smartPuzzle);
    setSelected(false);
  }, [onDeselectPuzzle, smartPuzzle]);

  async function onInitiateConnection() {
    setConnectionStatus('connecting');
    await guard(async () => await PuzzleRegistry.connect(smartPuzzle));
    PuzzleRegistry.addMessageListener(smartPuzzle, console.debug);
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
        onSelect={onSelectPuzzle ? handleSelect : undefined}
        onDeselect={handleDeselect}
        selectable={selectable}
        selected={selected}
      />
      <ErrorDialog error={error} />
    </>
  );
};

export default SmartPuzzleConnector;
