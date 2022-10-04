// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BleManager, Device } from 'react-native-ble-plx';

let manager = new BleManager();

function getBleManager() {
  return manager;
}

async function scanBluetooth() {
  console.debug('Checking if Bluetooth Adapter is powered on');
  // if (!listenerCreated) {
  //   getBleManager().onStateChange(state => {
  //     console.log(`Bluetooth Adapter State: ${state}`);
  //     if (state === 'PoweredOn') {
  //       scanForDevices();
  //     }
  //   }, true);
  //   listenerCreated = true;
  // }
  // (async () => {
  let state = await getBleManager().state();
  console.log(state);
  if (state === 'PoweredOn') {
    scanForDevices();
  }
  // })();
}

async function scanForDevices() {
  console.debug('Scanning for devices');
  getBleManager().startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error(error);
    } else if (device?.name?.includes('Rubik')) {
      console.debug(
        `Found ${device.name} (${device.localName}).
         Services: ${device.serviceUUIDs}
         Data: ${device.serviceData}
         Is Connectable: ${device.isConnectable}`,
      );
      getBleManager().stopDeviceScan();
      connectToDevice(device);
    }
  });
}

async function connectToDevice(targetDevice: Device) {
  console.debug(`Connecting to ${targetDevice.name}`);
  let device = await targetDevice.connect();
  console.debug(`Connected to device: ${device.name}`);
  await device.discoverAllServicesAndCharacteristics();
  console.debug(`Services and Characteristics Discovered for ${device.name}`);
  let services = await device.services();
  services.forEach(async service => {
    const characteristics = await service.characteristics();
    console.debug(`Service: ${service.uuid}`);
    characteristics.forEach(characteristic => {
      console.debug(
        ` - Characteristic: ${characteristic.uuid} (Value: ${characteristic.value})`,
      );
    });
  });
}

export { scanBluetooth };
