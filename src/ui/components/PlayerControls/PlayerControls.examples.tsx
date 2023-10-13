// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from '../../examples/types';
import PlayerControls from './PlayerControls';

const examples: DevelopmentExampleSet = {
  title: 'Player Controls',
  description: 'Time seeking controls for any sort of timed player.',
  examples: [
    {
      title: 'Default',
      component: <PlayerControls duration={15000} onSeek={console.debug} />,
    },
  ],
};

export default examples;
