// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager as BleManagerModule, Device } from 'react-native-ble-plx';

import PuzzleRegistry from './SmartPuzzleRegistry';

const BleManager = new BleManagerModule();

export async function isBluetoothEnabled(): Promise<boolean> {
  const EMIT_CURRENT_STATE = true;
  return new Promise<boolean>((resolve, _reject) => {
    let bleState: string = '';
    const subscription = BleManager.onStateChange(state => {
      bleState = state;
    }, EMIT_CURRENT_STATE);
    setTimeout(() => {
      resolve(bleState === 'PoweredOn');
      subscription.remove();
    }, 100);
  });
}

export async function scanForSmartPuzzles(scanDurationMillis: number = 5000) {
  const UUIDs = null;
  const OPTIONS = null;
  return new Promise<boolean>(async (resolve, _reject) => {
    BleManager.startDeviceScan(UUIDs, OPTIONS, onDiscoverDevice);
    setTimeout(() => {
      BleManager.stopDeviceScan();
      resolve(true);
    }, scanDurationMillis);
  });
}

function onDiscoverDevice(error: any, device: Device | null) {
  if (error) {
    console.error(error);
    return;
  }
  if (device) {
    PuzzleRegistry.addPuzzle(device);
  }
}
