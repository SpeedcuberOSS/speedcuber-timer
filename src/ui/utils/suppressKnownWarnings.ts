// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { LogBox } from 'react-native';

const knownWarnings = [
  // Known Victory warning.
  // https://formidable.com/open-source/victory/docs/native/#4-ignoring-require-cycles
  'Require cycle: node_modules/victory',

  // Known Storybook warning. Fixed in 6.0 (unstable)
  // https://github.com/storybookjs/react-native/issues/240
  'Require cycle: node_modules/core-js/internals/microtask.js',
];

export function suppressKnownWarnings() {
  const ignore = [
    ...knownWarnings,
    // Windows uses a forward slash for paths.
    ...knownWarnings.map(w => w.split('/').join('\\')),
  ];
  LogBox.ignoreLogs(ignore);
}
