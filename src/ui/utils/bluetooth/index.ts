// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager, Device } from 'react-native-ble-plx';
import {
  BluetoothDevice,
  BluetoothPuzzle,
  RubiksConnected,
} from '../../../lib/bluetooth-puzzle';

let manager = new BleManager();
let subscription: { remove: () => void } | null = null;

async function getAvailableBluetoothCubes(): Promise<BluetoothPuzzle[]> {
  await _ensurePermissionsGranted();
  await _ensureBluetoothPoweredOn();
  let devices = await _getSmartcubes();
  return devices;
}

async function _ensurePermissionsGranted(): Promise<boolean> {
  return true; // TODO: Handled manually right now.
}

async function _ensureBluetoothPoweredOn(): Promise<boolean> {
  return await new Promise<boolean>((resolve, reject) => {
    getBleManager().onStateChange(state => {
      console.debug(`Bluetooth state changed to ${state}`);
      if (state === 'PoweredOn') {
        resolve(true);
      }
    }, true);
    setTimeout(() => {
      reject('Bluetooth not powered on');
    }, 10000);
  });
}

async function _getSmartcubes(): Promise<BluetoothPuzzle[]> {
  return await new Promise<BluetoothPuzzle[]>((resolve, reject) => {
    let devices: Map<string, Device> = new Map();
    if (subscription) {
      subscription.remove();
    }
    // @ts-ignore
    subscription = getBleManager().startDeviceScan(
      null,
      null,
      (error, device) => {
        console.debug(`Found device named '${device?.name}'`);
        if (error) {
          console.error(error);
          reject(error);
        } else if (device && isSmartcube(device)) {
          devices.set(device.name ?? 'Unknown', device);
        }
      },
    );
    setTimeout(() => {
      console.debug('Stopping device scan');
      getBleManager().stopDeviceScan();
      resolve(Array.from(devices.values()).map(d => asBluetoothPuzzle(d)));
    }, 5000);
  });
}

function asBluetoothPuzzle(device: Device): BluetoothPuzzle {
  const standardizedDevice: BluetoothDevice = {
    id: device.id,
    name: device.name ?? 'Unknown',
    connectionStatus: 'disconnected',
    connect: async () => {
      console.debug(`Connecting to ${device.name}`);
      let cube = await device.connect();
      console.debug(`Connected to device: ${cube.name}`);
    },
    disconnect: async () => {
      device.cancelConnection();
    },
    monitor: async (
      callback: (error: any, value: any) => any,
      serviceUUID: string,
      characteristicUUID: string,
    ) => {
      await device.discoverAllServicesAndCharacteristics();
      console.debug(
        `Services and Characteristics Discovered for ${device.name}`,
      );
      let services = await device.services();
      let primaryService = services.filter(s => s.uuid === serviceUUID)[0];
      let characteristics = await primaryService.characteristics();
      characteristics.forEach(c => console.debug(c.uuid));
      let stateCharacteristic = characteristics.filter(
        c => c.uuid === characteristicUUID,
      )[0];
      if (stateCharacteristic) {
        stateCharacteristic.monitor((error, characteristic) =>
          callback(error, characteristic?.value),
        );
      } else {
        device.cancelConnection();
        throw new Error('Could not find state characteristic to monitor.');
      }
    },
  };
  return new RubiksConnected(standardizedDevice);
}

function isSmartcube(device: Device | null) {
  return device?.name?.includes('Rubik');
}

function getBleManager() {
  return manager;
}

export { getAvailableBluetoothCubes };
