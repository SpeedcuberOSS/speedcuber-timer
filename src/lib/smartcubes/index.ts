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

function scanBluetooth() {
  console.debug('Connecting to Bluetooth Adapter');
  getBleManager().onStateChange(state => {
    if (state === 'PoweredOn') {
      scanForDevices();
    }
  }, true);
}

function scanForDevices() {
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

function connectToDevice(targetDevice: Device) {
  console.debug(`Connecting to ${targetDevice.name}`);
  targetDevice
    .connect()
    .then(device => {
      console.debug(`Connected to device: ${device.name}`);
      return device.discoverAllServicesAndCharacteristics();
    })
    .then(device => {
      // Do work on device with services and characteristics
      console.debug(
        `Services and Characteristics Discovered for ${device.name}`,
      );
      device.services().then(services => {
        services.forEach(async service => {
          const characteristics = await service.characteristics();
          console.debug(`Service: ${service.uuid}`);
          characteristics.forEach(characteristic => {
            console.debug(
              ` - Characteristic: ${characteristic.uuid} (Value: ${characteristic.value})`,
            );
          });
        });
      });
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
}

export { scanBluetooth };
