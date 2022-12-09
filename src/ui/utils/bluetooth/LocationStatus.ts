// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { NativeModules } from 'react-native';
const { LocationStatus } = NativeModules;

interface LocationStatusInterface {
  /**
   * Check if location services are enabled.
   *
   * [Android only]
   */
  isLocationEnabled(): Promise<boolean>;
}

export default LocationStatus as LocationStatusInterface;
