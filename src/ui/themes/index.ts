// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { Appearance } from 'react-native';
import merge from 'deepmerge';
import { MD3Theme, MD3Typescale } from 'react-native-paper/src/types';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const fonts: MD3Typescale = {
  displayLarge: {
    ...MD3DarkTheme.fonts.displayLarge,
    fontFamily: 'Rubik-Regular',
  },
  displayMedium: {
    ...MD3DarkTheme.fonts.displayMedium,
    fontFamily: 'Rubik-Regular',
  },
  displaySmall: {
    ...MD3DarkTheme.fonts.displaySmall,
    fontFamily: 'Rubik-Regular',
  },
  headlineLarge: {
    ...MD3DarkTheme.fonts.headlineLarge,
    fontFamily: 'Rubik-Regular',
  },
  headlineMedium: {
    ...MD3DarkTheme.fonts.headlineMedium,
    fontFamily: 'Rubik-Regular',
  },
  headlineSmall: {
    ...MD3DarkTheme.fonts.headlineSmall,
    fontFamily: 'Rubik-Regular',
  },
  titleLarge: {
    ...MD3DarkTheme.fonts.titleLarge,
    fontFamily: 'Rubik-Regular',
  },
  titleMedium: {
    ...MD3DarkTheme.fonts.titleMedium,
    fontFamily: 'Rubik-Regular',
  },
  titleSmall: {
    ...MD3DarkTheme.fonts.titleSmall,
    fontFamily: 'Rubik-Regular',
  },
  labelLarge: {
    ...MD3DarkTheme.fonts.labelLarge,
    fontFamily: 'Rubik-Regular',
  },
  labelMedium: {
    ...MD3DarkTheme.fonts.labelMedium,
    fontFamily: 'Rubik-Regular',
  },
  labelSmall: {
    ...MD3DarkTheme.fonts.labelSmall,
    fontFamily: 'Rubik-Regular',
  },
  bodyLarge: {
    ...MD3DarkTheme.fonts.bodyLarge,
    fontFamily: 'Rubik-Regular',
  },
  bodyMedium: {
    ...MD3DarkTheme.fonts.bodyMedium,
    fontFamily: 'Rubik-Regular',
  },
  bodySmall: {
    ...MD3DarkTheme.fonts.bodySmall,
    fontFamily: 'Rubik-Regular',
  },
  default: {
    ...MD3DarkTheme.fonts.default,
    fontFamily: 'Rubik-Regular',
  },
};

function getCurrentTheme() {
  const darkTheme = Appearance.getColorScheme() == 'dark';
  const baseTheme = darkTheme ? CombinedDarkTheme : CombinedLightTheme;
  const theme = {
    ...baseTheme,
    roundness: 2,
    colors: {
      ...baseTheme.colors,
      secondary: darkTheme ? '#00ff00' : '#1B5E20',
    },
    fonts: fonts,
  };
  return theme;
}

export { getCurrentTheme };
