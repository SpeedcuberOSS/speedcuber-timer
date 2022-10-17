// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager, Device } from 'react-native-ble-plx';

let manager = new BleManager();
let subscription: { remove: () => void } | null = null;

async function getAvailableBluetoothCubes(): Promise<Device[]> {
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

async function _getSmartcubes(): Promise<Device[]> {
  return await new Promise<Device[]>((resolve, reject) => {
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
      resolve(Array.from(devices.values()));
    }, 5000);
  });
}

function isSmartcube(device: Device | null) {
  return device?.name?.includes('Rubik');
}

function getBleManager() {
  return manager;
}

async function connectToCube(cube: Device) {
  console.debug(`Connecting to ${cube.name}`);
  let device = await cube.connect();
  console.debug(`Connected to device: ${device.name}`);
  await device.discoverAllServicesAndCharacteristics();
  console.debug(`Services and Characteristics Discovered for ${device.name}`);
  let services = await device.services();
  let primaryService = services.filter(s => s.isPrimary)[0];
  let characteristics = await primaryService.characteristics();
  let stateCharacteristic = characteristics.filter(
    c => c.uuid === '6e400003-b5a3-f393-e0a9-e50e24dcca9e', // GoCube State Characteristic
  )[0];
  stateCharacteristic.monitor((error, characteristic) => {
    if (error) {
      console.error(error);
    } else {
      console.debug(characteristic?.value);
    }
  });
}

export { getAvailableBluetoothCubes, connectToCube };
