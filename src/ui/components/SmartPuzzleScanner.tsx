// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, ProgressBar } from 'react-native-paper';
import React, { useState } from 'react';

import ErrorDialog from './ErrorDialog';
import { SmartPuzzleError } from '../utils/bluetooth/SmartPuzzleError';
import { View } from 'react-native';
import { ensureScanningReady } from '../utils/bluetooth/permissions';
import { useTranslation } from 'react-i18next';

const SmartPuzzleScanner = () => {
  const [progressVisible, setProgressVisible] = useState(false);
  const { t } = useTranslation();
  const [smartPuzzleError, setSmartPuzzleError] = useState<SmartPuzzleError>();
  return (
    <View>
      <Button
        onPress={async () => {
          try {
            await ensureScanningReady();
            console.log('PLACEHOLDER: Scanning for cubes');
          } catch (error) {
            if (error instanceof SmartPuzzleError) {
              setSmartPuzzleError(error);
              return;
            } else {
              throw error;
            }
          }
        }}
        mode="contained-tonal"
        icon="bluetooth">
        {t('bluetooth.start_scan')}
      </Button>
      <ProgressBar visible={progressVisible} indeterminate />
      {/* {puzzles.length > 0 &&
        puzzles.map(cube => (
          <SmartPuzzleConnector key={cube.id()} smartPuzzle={cube} />
        ))} */}
      <ErrorDialog error={smartPuzzleError} />
    </View>
  );
};

export default SmartPuzzleScanner;
