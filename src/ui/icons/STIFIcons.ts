// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createIconSet } from '@react-native-vector-icons/common';
import glyphs from '../../lib/stif/icons/font/STIFIcon.json';

const STIFIcon = createIconSet(glyphs, 'STIFIcon', 'STIFIcon.ttf');

export { STIFIcon };
