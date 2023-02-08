// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import EventSelector from './EventSelector';
import { storiesOf } from '@storybook/react-native';

storiesOf('EventSelector', module).add('default', () => (
  <EventSelector onSelect={console.log} />
));
