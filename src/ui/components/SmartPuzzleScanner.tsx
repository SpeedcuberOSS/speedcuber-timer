// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import PuzzleRegistry, {
  BluetoothPuzzle,
} from '../utils/bluetooth/SmartPuzzleRegistry';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import ErrorDialog from './ErrorDialog';
import SmartPuzzleConnector from './SmartPuzzleConnector';
import { SmartPuzzleError } from '../utils/bluetooth/SmartPuzzleError';
import { ensureScanningReady } from '../utils/bluetooth/permissions';
import { scanForSmartPuzzles } from '../utils/bluetooth';
import useErrorGuard from '../hooks/useErrorGuard';

const SmartPuzzleScanner = () => {
  const { error, guard } = useErrorGuard(SmartPuzzleError);
  const [isScanActive, setIsScanActive] = useState(false);
  const [smartPuzzles, setSmartPuzzles] = useState<BluetoothPuzzle[]>([]);
  useEffect(() => {
    setSmartPuzzles(PuzzleRegistry.getPuzzles());
    if (smartPuzzles.length === 0) onInitiateScan();
  }, [isScanActive]);

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
          <SmartPuzzleConnector key={cube.device.id} smartPuzzle={cube} />
        ))}
      </ScrollView>
      <ErrorDialog error={error} />
    </View>
  );
};

export default SmartPuzzleScanner;
