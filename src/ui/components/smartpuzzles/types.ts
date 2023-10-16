// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'failed';

export interface BleDevice {
  advertising: {
    isConnectable: boolean,
    kCBAdvDataRxPrimaryPHY: number,
    kCBAdvDataRxSecondaryPHY: number,
    kCBAdvDataTimestamp: number,
    localName: string,
    manufacturerData?: {
      CDVType: string,
      bytes: number[],
      data: string, // Base64 encoded
    }
    serviceUUIDs: string[]
  }
  id: string,
  name: string,
  rssi: number,
}

export interface BleNotification {
  value: number[]
  peripheral: string
  characteristic: string
  service: string
}

export interface BleDisconnected {
  peripheral: string
}

