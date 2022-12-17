// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, ProgressBar } from 'react-native-paper';
import PuzzleRegistry, {
  BluetoothPuzzle,
} from '../utils/bluetooth/SmartPuzzleRegistry';
import React, { useEffect, useState } from 'react';

import ErrorDialog from './ErrorDialog';
import SmartPuzzleConnector from './SmartPuzzleConnector';
import { SmartPuzzleError } from '../utils/bluetooth/SmartPuzzleError';
import { View } from 'react-native';
import { ensureScanningReady } from '../utils/bluetooth/permissions';
import { scanForSmartPuzzles } from '../utils/bluetooth';
import useErrorGuard from '../hooks/useErrorGuard';
import { useTranslation } from 'react-i18next';

const SmartPuzzleScanner = () => {
  const { t } = useTranslation();
  const { error, guard } = useErrorGuard(SmartPuzzleError);
  const [isScanActive, setIsScanActive] = useState(false);
  const [smartPuzzles, setSmartPuzzles] = useState<BluetoothPuzzle[]>([]);
  useEffect(() => {
    setSmartPuzzles(PuzzleRegistry.getPuzzles());
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
      <Button onPress={onInitiateScan} mode="contained-tonal" icon="bluetooth">
        {t('bluetooth.start_scan')}
      </Button>
      <ProgressBar visible={isScanActive} indeterminate />
      {smartPuzzles.length > 0 &&
        smartPuzzles.map(cube => (
          <SmartPuzzleConnector key={cube.device.id} smartPuzzle={cube} />
        ))}
      <ErrorDialog error={error} />
    </View>
  );
};

export default SmartPuzzleScanner;
