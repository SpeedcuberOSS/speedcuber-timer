import { MD3DarkTheme, configureFonts } from 'react-native-paper';

import { MD3Theme } from 'react-native-paper/lib/typescript/types';
// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Platform } from 'react-native';

const fontConfig = {
  displayLarge: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 64,
    fontSize: 57,
  },
  displayMedium: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 52,
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 44,
    fontSize: 36,
  },
  headlineLarge: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 40,
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 36,
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 32,
    fontSize: 24,
  },
  titleLarge: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0,
    fontWeight: '400',
    lineHeight: 28,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.15,
    fontWeight: '500',
    lineHeight: 24,
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.1,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: 14,
  },
  labelLarge: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.1,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.5,
    fontWeight: '500',
    lineHeight: 16,
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.5,
    fontWeight: '500',
    lineHeight: 16,
    fontSize: 11,
  },
  bodyLarge: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.15,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.25,
    fontWeight: '400',
    lineHeight: 20,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.4,
    fontWeight: '400',
    lineHeight: 16,
    fontSize: 12,
  },
};

function getCurrentTheme(): MD3Theme {
  let theme = {
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      secondary: '#00ff00',
    },
    fonts: {
      ...fontConfig,
      default: {
        ...MD3DarkTheme.fonts.default,
        fontFamily: 'Rubik-Regular',
      },
    },
  };
  return theme;
}

export { getCurrentTheme };
