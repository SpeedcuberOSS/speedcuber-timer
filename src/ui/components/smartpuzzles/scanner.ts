// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import BLE from './BLE';
import { BleDevice } from './types';
import PuzzleRegistry from './SmartPuzzleRegistry';

export async function scanForSmartPuzzles(
  scanDurationMillis: number = 5000,
): Promise<boolean> {
  const subscription = BLE.Manager.onDiscoverPeripheral(
    (device: BleDevice) => PuzzleRegistry.addPuzzle(device)
  );

  const FILTER_UUIDS: string[] = [];
  const IOS_ALLOW_DUPLICATES = false;
  const ANDROID_OPTIONS = {};

  return new Promise<boolean>(async (resolve, _reject) => {
    BLE.Manager.scan(
      FILTER_UUIDS,
      scanDurationMillis,
      IOS_ALLOW_DUPLICATES,
      ANDROID_OPTIONS,
    );
    setTimeout(async () => {
      await BLE.Manager.stopScan();
      subscription.remove();
      resolve(true);
    }, scanDurationMillis);
  });
}
