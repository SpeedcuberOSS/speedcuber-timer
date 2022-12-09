// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import {
  BluetoothDevice,
  BluetoothPuzzle,
  GoCube,
  GoCube2x2x2,
  MonitorCallback,
  RubiksConnected,
} from '../../../lib/bluetooth-puzzle';

import { Platform } from 'react-native';

export const DEFAULT_BLUETOOTH_SCAN_DURATION = 5000;
let _MANAGER = new BleManager();
let _SUBSCRIPTION: { remove: () => void } | null = null;
type PuzzleDiscoveryListener = (puzzle: BluetoothPuzzle) => void;

export async function getAvailableBluetoothCubes(
  scanDurationMillis: number = 5000,
  onDiscoverPuzzle: PuzzleDiscoveryListener = (_p: BluetoothPuzzle) => {},
): Promise<BluetoothPuzzle[]> {
  if (Platform.OS === 'android') {
    await _ensurePermissionsGranted();
    await _ensureLocationEnabled();
  }
  await _ensureBluetoothPoweredOn();
  let devices = await _getSmartcubes(scanDurationMillis, onDiscoverPuzzle);
  return devices;
}

async function _ensurePermissionsGranted(): Promise<boolean> {
  let success = true;
  return success;
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

async function _ensureLocationEnabled(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
    } catch (error) {
      console.error(error);
    }
  }
  return true; // TODO: Handled manually right now.
}

async function _getSmartcubes(
  scanDurationMillis: number,
  onDiscoverPuzzle: PuzzleDiscoveryListener,
): Promise<BluetoothPuzzle[]> {
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
        if (device?.name) {
          console.debug(`Found device named '${device.name}'`);
        }
        if (error) {
          console.error(`Error while getting smartcubes: ${error}`);
          reject(error);
        } else if (device && _isSmartcube(device)) {
          devices.set(device.name ?? 'Unknown', device);
          onDiscoverPuzzle(
            _mapToBluetoothPuzzle(new _ReactNativeBluetoothDevice(device)),
          );
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
    }, scanDurationMillis);
  });
}

function _getBleManager() {
  return _MANAGER;
}

function _isSmartcube(device: Device | null) {
  return device?.name?.includes('Rubik') || device?.name?.includes('GoCube');
}

function _mapToBluetoothPuzzle(device: BluetoothDevice): BluetoothPuzzle {
  // TODO add support for other puzzles here.
  if (device.name().includes('Rubik')) {
    return new RubiksConnected(device);
  }
  if (device.name().includes('GoCube2x2')) {
    return new GoCube2x2x2(device);
  }
  if (device.name().includes('GoCube')) {
    return new GoCube(device);
  }
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
