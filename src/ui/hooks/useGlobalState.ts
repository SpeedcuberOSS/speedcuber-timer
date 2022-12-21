// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { EVENT_3x3x3 } from '../../lib/stif';
import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  competitiveEvent: EVENT_3x3x3,
});

export { useGlobalState };
