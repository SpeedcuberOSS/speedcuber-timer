// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import PuzzleRegistry, { BluetoothPuzzle } from './SmartPuzzleRegistry';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';

import ErrorDialog from '../ErrorDialog';
import SmartPuzzleConnector from './SmartPuzzleConnector';
import { SmartPuzzleError } from './SmartPuzzleError';
import { ensureScanningReady } from './permissions';
import { scanForSmartPuzzles } from './scanner';
import useErrorGuard from '../../hooks/useErrorGuard';

interface SmartPuzzleScannerProps {
  onSelectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  onDeselectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  isPuzzleSelectable?: (puzzle: BluetoothPuzzle) => boolean;
  isPuzzleSelected?: (puzzle: BluetoothPuzzle) => boolean;
}
function SmartPuzzleScanner({
  onSelectPuzzle,
  onDeselectPuzzle,
  isPuzzleSelectable,
  isPuzzleSelected,
}: SmartPuzzleScannerProps) {
  const { error, guard } = useErrorGuard(SmartPuzzleError);
  const [isScanActive, setIsScanActive] = useState(false);
  const [arePuzzlesRetrieved, setArePuzzlesRetrieved] = useState(false);
  const [smartPuzzles, setSmartPuzzles] = useState<BluetoothPuzzle[]>([]);
  useEffect(() => {
    setSmartPuzzles(PuzzleRegistry.getPuzzles());
    setArePuzzlesRetrieved(true);
  }, [isScanActive]);
  useEffect(() => {
    if (arePuzzlesRetrieved && smartPuzzles.length === 0) onInitiateScan();
  }, [arePuzzlesRetrieved, smartPuzzles]);

  async function onInitiateScan() {
    await guard(
      async () => {
        await ensureScanningReady();
        setIsScanActive(true);
        await scanForSmartPuzzles();
      },
      () => setIsScanActive(false),
    );
  }

  return (
    <View>
      <ScrollView
        style={{ minHeight: '100%', paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={isScanActive}
            onRefresh={onInitiateScan}
          />
        }>
        {smartPuzzles.map(cube => (
          <SmartPuzzleConnector
            key={cube.device.id}
            smartPuzzle={cube}
            onSelectPuzzle={onSelectPuzzle}
            onDeselectPuzzle={onDeselectPuzzle}
            isPuzzleSelectable={isPuzzleSelectable}
            isPuzzleSelected={isPuzzleSelected}
          />
        ))}
      </ScrollView>
      <ErrorDialog error={error} />
    </View>
  );
}

export default SmartPuzzleScanner;
