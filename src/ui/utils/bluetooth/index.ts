// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import {
  BluetoothDevice,
  BluetoothPuzzle,
  MonitorCallback,
  RubiksConnected,
} from '../../../lib/bluetooth-puzzle';

let _MANAGER = new BleManager();
let _SUBSCRIPTION: { remove: () => void } | null = null;

export async function getAvailableBluetoothCubes(): Promise<BluetoothPuzzle[]> {
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
    _getBleManager().onStateChange(state => {
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
    if (_SUBSCRIPTION) {
      _SUBSCRIPTION.remove();
    }
    // @ts-ignore
    _SUBSCRIPTION = _getBleManager().startDeviceScan(
      null,
      null,
      (error, device) => {
        console.debug(`Found device named '${device?.name}'`);
        if (error) {
          console.error(error);
          reject(error);
        } else if (device && _isSmartcube(device)) {
          devices.set(device.name ?? 'Unknown', device);
        }
      },
    );
    setTimeout(() => {
      console.debug('Stopping device scan');
      _getBleManager().stopDeviceScan();
      resolve(
        Array.from(devices.values())
          .map(d => new _ReactNativeBluetoothDevice(d))
          .map(d => _mapToBluetoothPuzzle(d)),
      );
    }, 5000);
  });
}

function _getBleManager() {
  return _MANAGER;
}

function _isSmartcube(device: Device | null) {
  return device?.name?.includes('Rubik');
}

function _mapToBluetoothPuzzle(device: BluetoothDevice): BluetoothPuzzle {
  // TODO add support for other puzzles here.
  return new RubiksConnected(device);
}

class _ReactNativeBluetoothDevice extends BluetoothDevice {
  private _device: Device;
  constructor(device: Device) {
    super();
    this._device = device;
  }
  id(): string {
    return this._device.id;
  }
  name(): string {
    return this._device.name ?? 'Unknown';
  }
  protected async _connectToDevice(): Promise<any> {
    console.debug(`Connecting to ${this.name()}`);
    await this._device.connect();
    console.debug(`Connected to device: ${this.name()}`);
  }
  protected async _addMonitor(
    callback: MonitorCallback,
    serviceUUID: string,
    characteristicUUID: string,
  ): Promise<void> {
    const characteristic = await this.__findCharacteristic(
      serviceUUID,
      characteristicUUID,
    );
    if (characteristic) {
      characteristic.monitor((error, updatedCharacteristic) =>
        callback(error, updatedCharacteristic?.value),
      );
    } else {
      this._device.cancelConnection();
      throw new Error('Could not find state characteristic to monitor.');
    }
  }
  private async __findCharacteristic(
    serviceUUID: string,
    characteristicUUID: string,
  ): Promise<Characteristic> {
    await this._device.discoverAllServicesAndCharacteristics();
    console.debug(
      `Services and Characteristics Discovered for ${this._device.name}`,
    );
    let services = await this._device.services();
    let primaryService = services.filter(s => s.uuid === serviceUUID)[0];
    let characteristics = await primaryService.characteristics();
    characteristics.forEach(c => console.debug(c.uuid));
    return characteristics.filter(c => c.uuid === characteristicUUID)[0];
  }
}
