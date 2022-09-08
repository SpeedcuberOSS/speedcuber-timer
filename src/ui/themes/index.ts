// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { MD3DarkTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

function getCurrentTheme(): Theme {
  return {
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#000000',
      secondary: '#00ff00',
    },
  };
}

export { getCurrentTheme };
