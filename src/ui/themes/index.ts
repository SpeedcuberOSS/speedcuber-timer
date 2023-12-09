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
import { colorThemes } from './colors';
import { fonts } from './fonts';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});




function getCurrentTheme() {
  const RNPLightTheme = colorThemes.green.light
  const RNPDarkTheme = colorThemes.green.dark
  const CombinedLightTheme = merge(LightTheme, RNPLightTheme);
  const CombinedDarkTheme = merge(DarkTheme, RNPDarkTheme);

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
