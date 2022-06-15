// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ScrambleProvider, Session } from './types';

export const DEFAULT_SESSION: Session = {
  id: '5aeab03d-964b-4363-afac-39f85b7972c2',
  name: 'default',
  startTime: new Date(-8640000000000000), // Earliest possible date in JS
  endTime: new Date(8640000000000000), // Latest possible date in JS
};

export const DEFAULT_SCRAMBLE_PROVIDER: ScrambleProvider = {
  id: '1604c5a6-bbcf-4a55-862b-a1d5f7c976aa',
  name: 'default',
  url: 'https://speedcuber.org',
};
