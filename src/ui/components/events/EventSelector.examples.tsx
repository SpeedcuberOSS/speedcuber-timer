// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import EventSelector from './EventSelector';

const examples: DevelopmentExampleSet = {
  title: 'Event Selector',
  description: 'Allows the user to select an event.',
  examples: [
    {
      title: 'Default',
      component: <EventSelector onSelect={console.log} />,
    },
  ],
};

export default examples;
