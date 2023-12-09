// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// These themes come from the React Native Paper demonstration app.
// Used under the terms of the MIT license.
// Source: https://github.com/callstack/react-native-paper/blob/ac3820a50fe1afb82c19cc0853a451e5c190b769/example/utils/index.ts

import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";

const lightPinkColors = {
  colors: {
    primary: 'rgb(154, 64, 87)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 217, 223)',
    onPrimaryContainer: 'rgb(63, 0, 22)',
    secondary: 'rgb(117, 86, 92)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 217, 223)',
    onSecondaryContainer: 'rgb(43, 21, 26)',
    tertiary: 'rgb(122, 87, 50)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 220, 188)',
    onTertiaryContainer: 'rgb(44, 23, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 27)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 27)',
    surfaceVariant: 'rgb(243, 221, 224)',
    onSurfaceVariant: 'rgb(82, 67, 69)',
    outline: 'rgb(132, 115, 117)',
    outlineVariant: 'rgb(214, 194, 196)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 48)',
    inverseOnSurface: 'rgb(250, 238, 238)',
    inversePrimary: 'rgb(255, 177, 192)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(250, 242, 247)',
      level2: 'rgb(247, 236, 242)',
      level3: 'rgb(244, 230, 237)',
      level4: 'rgb(243, 229, 235)',
      level5: 'rgb(241, 225, 232)',
    },
    surfaceDisabled: 'rgba(32, 26, 27, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 27, 0.38)',
    backdrop: 'rgba(58, 45, 47, 0.4)',
  },
};

const darkPinkColors = {
  colors: {
    primary: 'rgb(255, 177, 192)',
    onPrimary: 'rgb(95, 17, 42)',
    primaryContainer: 'rgb(124, 41, 64)',
    onPrimaryContainer: 'rgb(255, 217, 223)',
    secondary: 'rgb(228, 189, 195)',
    onSecondary: 'rgb(67, 41, 46)',
    secondaryContainer: 'rgb(92, 63, 68)',
    onSecondaryContainer: 'rgb(255, 217, 223)',
    tertiary: 'rgb(236, 190, 144)',
    onTertiary: 'rgb(70, 42, 8)',
    tertiaryContainer: 'rgb(95, 64, 29)',
    onTertiaryContainer: 'rgb(255, 220, 188)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 27)',
    onBackground: 'rgb(236, 224, 224)',
    surface: 'rgb(32, 26, 27)',
    onSurface: 'rgb(236, 224, 224)',
    surfaceVariant: 'rgb(82, 67, 69)',
    onSurfaceVariant: 'rgb(214, 194, 196)',
    outline: 'rgb(159, 140, 143)',
    outlineVariant: 'rgb(82, 67, 69)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(236, 224, 224)',
    inverseOnSurface: 'rgb(54, 47, 48)',
    inversePrimary: 'rgb(154, 64, 87)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 35)',
      level2: 'rgb(50, 38, 40)',
      level3: 'rgb(57, 43, 45)',
      level4: 'rgb(59, 44, 47)',
      level5: 'rgb(63, 47, 50)',
    },
    surfaceDisabled: 'rgba(236, 224, 224, 0.12)',
    onSurfaceDisabled: 'rgba(236, 224, 224, 0.38)',
    backdrop: 'rgba(58, 45, 47, 0.4)',
  },
};

const lightGreenColors = {
  colors: {
    primary: 'rgb(0, 110, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(141, 251, 119)',
    onPrimaryContainer: 'rgb(0, 34, 0)',
    secondary: 'rgb(84, 99, 77)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(215, 232, 205)',
    onSecondaryContainer: 'rgb(18, 31, 14)',
    tertiary: 'rgb(56, 101, 104)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(188, 235, 238)',
    onTertiaryContainer: 'rgb(0, 32, 34)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(252, 253, 246)',
    onBackground: 'rgb(26, 28, 24)',
    surface: 'rgb(252, 253, 246)',
    onSurface: 'rgb(26, 28, 24)',
    surfaceVariant: 'rgb(223, 228, 215)',
    onSurfaceVariant: 'rgb(67, 72, 63)',
    outline: 'rgb(115, 121, 110)',
    outlineVariant: 'rgb(195, 200, 188)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 49, 45)',
    inverseOnSurface: 'rgb(241, 241, 235)',
    inversePrimary: 'rgb(114, 222, 94)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(239, 246, 234)',
      level2: 'rgb(232, 242, 226)',
      level3: 'rgb(224, 237, 219)',
      level4: 'rgb(222, 236, 217)',
      level5: 'rgb(217, 233, 212)',
    },
    surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
    backdrop: 'rgba(44, 50, 41, 0.4)',
  },
};

const darkGreenColors = {
  colors: {
    primary: 'rgb(114, 222, 94)',
    onPrimary: 'rgb(0, 58, 0)',
    primaryContainer: 'rgb(0, 83, 0)',
    onPrimaryContainer: 'rgb(141, 251, 119)',
    secondary: 'rgb(187, 203, 178)',
    onSecondary: 'rgb(38, 52, 34)',
    secondaryContainer: 'rgb(60, 75, 55)',
    onSecondaryContainer: 'rgb(215, 232, 205)',
    tertiary: 'rgb(160, 207, 210)',
    onTertiary: 'rgb(0, 55, 57)',
    tertiaryContainer: 'rgb(30, 77, 80)',
    onTertiaryContainer: 'rgb(188, 235, 238)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 24)',
    onBackground: 'rgb(226, 227, 220)',
    surface: 'rgb(26, 28, 24)',
    onSurface: 'rgb(226, 227, 220)',
    surfaceVariant: 'rgb(67, 72, 63)',
    onSurfaceVariant: 'rgb(195, 200, 188)',
    outline: 'rgb(141, 147, 135)',
    outlineVariant: 'rgb(67, 72, 63)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(226, 227, 220)',
    inverseOnSurface: 'rgb(47, 49, 45)',
    inversePrimary: 'rgb(0, 110, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(30, 38, 28)',
      level2: 'rgb(33, 44, 30)',
      level3: 'rgb(36, 49, 32)',
      level4: 'rgb(37, 51, 32)',
      level5: 'rgb(38, 55, 34)',
    },
    surfaceDisabled: 'rgba(226, 227, 220, 0.12)',
    onSurfaceDisabled: 'rgba(226, 227, 220, 0.38)',
    backdrop: 'rgba(44, 50, 41, 0.4)',
  },
};

const lightBlueColors = {
  colors: {
    primary: 'rgb(52, 61, 255)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(224, 224, 255)',
    onPrimaryContainer: 'rgb(0, 0, 110)',
    secondary: 'rgb(92, 93, 114)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(225, 224, 249)',
    onSecondaryContainer: 'rgb(25, 26, 44)',
    tertiary: 'rgb(120, 83, 107)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 216, 238)',
    onTertiaryContainer: 'rgb(46, 17, 38)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(228, 225, 236)',
    onSurfaceVariant: 'rgb(70, 70, 79)',
    outline: 'rgb(119, 118, 128)',
    outlineVariant: 'rgb(199, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(243, 239, 244)',
    inversePrimary: 'rgb(190, 194, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(245, 242, 255)',
      level2: 'rgb(239, 236, 255)',
      level3: 'rgb(233, 230, 255)',
      level4: 'rgb(231, 228, 255)',
      level5: 'rgb(227, 224, 255)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
  },
};

const darkBlueColors = {
  colors: {
    primary: 'rgb(190, 194, 255)',
    onPrimary: 'rgb(0, 1, 172)',
    primaryContainer: 'rgb(0, 0, 239)',
    onPrimaryContainer: 'rgb(224, 224, 255)',
    secondary: 'rgb(197, 196, 221)',
    onSecondary: 'rgb(46, 47, 66)',
    secondaryContainer: 'rgb(68, 69, 89)',
    onSecondaryContainer: 'rgb(225, 224, 249)',
    tertiary: 'rgb(232, 185, 213)',
    onTertiary: 'rgb(70, 38, 59)',
    tertiaryContainer: 'rgb(94, 60, 82)',
    onTertiaryContainer: 'rgb(255, 216, 238)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(229, 225, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(229, 225, 230)',
    surfaceVariant: 'rgb(70, 70, 79)',
    onSurfaceVariant: 'rgb(199, 197, 208)',
    outline: 'rgb(145, 144, 154)',
    outlineVariant: 'rgb(70, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(229, 225, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(52, 61, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 35, 42)',
      level2: 'rgb(40, 40, 49)',
      level3: 'rgb(45, 45, 56)',
      level4: 'rgb(47, 47, 58)',
      level5: 'rgb(50, 50, 62)',
    },
    surfaceDisabled: 'rgba(229, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(229, 225, 230, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
  },
};

const lightOrangeColors = {
  colors: {
    primary: 'rgb(133, 84, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 221, 183)',
    onPrimaryContainer: 'rgb(42, 23, 0)',
    secondary: 'rgb(112, 91, 65)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(252, 222, 188)',
    onSecondaryContainer: 'rgb(40, 24, 5)',
    tertiary: 'rgb(83, 100, 62)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(214, 233, 185)',
    onTertiaryContainer: 'rgb(18, 31, 3)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(31, 27, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(31, 27, 22)',
    surfaceVariant: 'rgb(240, 224, 208)',
    onSurfaceVariant: 'rgb(80, 69, 57)',
    outline: 'rgb(130, 117, 104)',
    outlineVariant: 'rgb(212, 196, 181)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(53, 47, 42)',
    inverseOnSurface: 'rgb(249, 239, 231)',
    inversePrimary: 'rgb(255, 185, 92)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(249, 243, 242)',
      level2: 'rgb(245, 238, 235)',
      level3: 'rgb(242, 233, 227)',
      level4: 'rgb(240, 231, 224)',
      level5: 'rgb(238, 228, 219)',
    },
    surfaceDisabled: 'rgba(31, 27, 22, 0.12)',
    onSurfaceDisabled: 'rgba(31, 27, 22, 0.38)',
    backdrop: 'rgba(56, 47, 36, 0.4)',
  },
};

const darkOrangeColors = {
  colors: {
    primary: 'rgb(255, 185, 92)',
    onPrimary: 'rgb(70, 42, 0)',
    primaryContainer: 'rgb(101, 62, 0)',
    onPrimaryContainer: 'rgb(255, 221, 183)',
    secondary: 'rgb(223, 194, 162)',
    onSecondary: 'rgb(63, 45, 23)',
    secondaryContainer: 'rgb(87, 67, 43)',
    onSecondaryContainer: 'rgb(252, 222, 188)',
    tertiary: 'rgb(186, 205, 159)',
    onTertiary: 'rgb(38, 53, 20)',
    tertiaryContainer: 'rgb(60, 76, 40)',
    onTertiaryContainer: 'rgb(214, 233, 185)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(31, 27, 22)',
    onBackground: 'rgb(235, 225, 217)',
    surface: 'rgb(31, 27, 22)',
    onSurface: 'rgb(235, 225, 217)',
    surfaceVariant: 'rgb(80, 69, 57)',
    onSurfaceVariant: 'rgb(212, 196, 181)',
    outline: 'rgb(156, 142, 128)',
    outlineVariant: 'rgb(80, 69, 57)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(235, 225, 217)',
    inverseOnSurface: 'rgb(53, 47, 42)',
    inversePrimary: 'rgb(133, 84, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(42, 35, 26)',
      level2: 'rgb(49, 40, 28)',
      level3: 'rgb(56, 44, 30)',
      level4: 'rgb(58, 46, 30)',
      level5: 'rgb(62, 49, 32)',
    },
    surfaceDisabled: 'rgba(235, 225, 217, 0.12)',
    onSurfaceDisabled: 'rgba(235, 225, 217, 0.38)',
    backdrop: 'rgba(56, 47, 36, 0.4)',
  },
};

const lightRedColors = {
  colors: {
    primary: 'rgb(192, 1, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 218, 212)',
    onPrimaryContainer: 'rgb(65, 0, 0)',
    secondary: 'rgb(119, 86, 81)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 218, 212)',
    onSecondaryContainer: 'rgb(44, 21, 18)',
    tertiary: 'rgb(112, 92, 46)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(251, 223, 166)',
    onTertiaryContainer: 'rgb(37, 26, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 25)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 25)',
    surfaceVariant: 'rgb(245, 221, 218)',
    onSurfaceVariant: 'rgb(83, 67, 65)',
    outline: 'rgb(133, 115, 112)',
    outlineVariant: 'rgb(216, 194, 190)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 46)',
    inverseOnSurface: 'rgb(251, 238, 236)',
    inversePrimary: 'rgb(255, 180, 168)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(252, 239, 242)',
      level2: 'rgb(250, 231, 235)',
      level3: 'rgb(248, 224, 227)',
      level4: 'rgb(247, 221, 224)',
      level5: 'rgb(246, 216, 219)',
    },
    surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
    backdrop: 'rgba(59, 45, 43, 0.4)',
  },
};

const darkRedColors = {
  colors: {
    primary: 'rgb(255, 180, 168)',
    onPrimary: 'rgb(105, 1, 0)',
    primaryContainer: 'rgb(147, 1, 0)',
    onPrimaryContainer: 'rgb(255, 218, 212)',
    secondary: 'rgb(231, 189, 182)',
    onSecondary: 'rgb(68, 41, 37)',
    secondaryContainer: 'rgb(93, 63, 59)',
    onSecondaryContainer: 'rgb(255, 218, 212)',
    tertiary: 'rgb(222, 196, 140)',
    onTertiary: 'rgb(62, 46, 4)',
    tertiaryContainer: 'rgb(86, 68, 25)',
    onTertiaryContainer: 'rgb(251, 223, 166)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 25)',
    onBackground: 'rgb(237, 224, 221)',
    surface: 'rgb(32, 26, 25)',
    onSurface: 'rgb(237, 224, 221)',
    surfaceVariant: 'rgb(83, 67, 65)',
    onSurfaceVariant: 'rgb(216, 194, 190)',
    outline: 'rgb(160, 140, 137)',
    outlineVariant: 'rgb(83, 67, 65)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(237, 224, 221)',
    inverseOnSurface: 'rgb(54, 47, 46)',
    inversePrimary: 'rgb(192, 1, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 32)',
      level2: 'rgb(50, 38, 36)',
      level3: 'rgb(57, 43, 41)',
      level4: 'rgb(59, 45, 42)',
      level5: 'rgb(63, 48, 45)',
    },
    surfaceDisabled: 'rgba(237, 224, 221, 0.12)',
    onSurfaceDisabled: 'rgba(237, 224, 221, 0.38)',
    backdrop: 'rgba(59, 45, 43, 0.4)',
  },
};

const lightYellowColors = {
  colors: {
    primary: 'rgb(98, 98, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(234, 234, 0)',
    onPrimaryContainer: 'rgb(29, 29, 0)',
    secondary: 'rgb(96, 96, 67)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(231, 228, 191)',
    onSecondaryContainer: 'rgb(29, 29, 6)',
    tertiary: 'rgb(61, 102, 87)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(191, 236, 216)',
    onTertiaryContainer: 'rgb(0, 33, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 28, 23)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 28, 23)',
    surfaceVariant: 'rgb(230, 227, 209)',
    onSurfaceVariant: 'rgb(72, 71, 58)',
    outline: 'rgb(121, 120, 105)',
    outlineVariant: 'rgb(202, 199, 182)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 49, 43)',
    inverseOnSurface: 'rgb(244, 240, 232)',
    inversePrimary: 'rgb(205, 205, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 242)',
      level2: 'rgb(242, 239, 235)',
      level3: 'rgb(238, 234, 227)',
      level4: 'rgb(236, 233, 224)',
      level5: 'rgb(233, 230, 219)',
    },
    surfaceDisabled: 'rgba(28, 28, 23, 0.12)',
    onSurfaceDisabled: 'rgba(28, 28, 23, 0.38)',
    backdrop: 'rgba(49, 49, 37, 0.4)',
  },
};

const darkYellowColors = {
  colors: {
    primary: 'rgb(205, 205, 0)',
    onPrimary: 'rgb(50, 50, 0)',
    primaryContainer: 'rgb(73, 73, 0)',
    onPrimaryContainer: 'rgb(234, 234, 0)',
    secondary: 'rgb(202, 200, 165)',
    onSecondary: 'rgb(50, 50, 24)',
    secondaryContainer: 'rgb(73, 72, 45)',
    onSecondaryContainer: 'rgb(231, 228, 191)',
    tertiary: 'rgb(164, 208, 189)',
    onTertiary: 'rgb(11, 55, 42)',
    tertiaryContainer: 'rgb(37, 78, 64)',
    onTertiaryContainer: 'rgb(191, 236, 216)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 28, 23)',
    onBackground: 'rgb(230, 226, 217)',
    surface: 'rgb(28, 28, 23)',
    onSurface: 'rgb(230, 226, 217)',
    surfaceVariant: 'rgb(72, 71, 58)',
    onSurfaceVariant: 'rgb(202, 199, 182)',
    outline: 'rgb(147, 145, 130)',
    outlineVariant: 'rgb(72, 71, 58)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(230, 226, 217)',
    inverseOnSurface: 'rgb(49, 49, 43)',
    inversePrimary: 'rgb(98, 98, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 37, 22)',
      level2: 'rgb(42, 42, 21)',
      level3: 'rgb(48, 48, 21)',
      level4: 'rgb(49, 49, 20)',
      level5: 'rgb(53, 53, 20)',
    },
    surfaceDisabled: 'rgba(230, 226, 217, 0.12)',
    onSurfaceDisabled: 'rgba(230, 226, 217, 0.38)',
    backdrop: 'rgba(49, 49, 37, 0.4)',
  },
};

const lightCyanColors = {
  colors: {
    primary: 'rgb(0, 106, 106)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(0, 251, 251)',
    onPrimaryContainer: 'rgb(0, 32, 32)',
    secondary: 'rgb(74, 99, 99)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(204, 232, 231)',
    onSecondaryContainer: 'rgb(5, 31, 31)',
    tertiary: 'rgb(75, 96, 124)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(211, 228, 255)',
    onTertiaryContainer: 'rgb(4, 28, 53)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(250, 253, 252)',
    onBackground: 'rgb(25, 28, 28)',
    surface: 'rgb(250, 253, 252)',
    onSurface: 'rgb(25, 28, 28)',
    surfaceVariant: 'rgb(218, 229, 228)',
    onSurfaceVariant: 'rgb(63, 73, 72)',
    outline: 'rgb(111, 121, 121)',
    outlineVariant: 'rgb(190, 201, 200)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(45, 49, 49)',
    inverseOnSurface: 'rgb(239, 241, 240)',
    inversePrimary: 'rgb(0, 221, 221)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 246, 245)',
      level2: 'rgb(230, 241, 240)',
      level3: 'rgb(223, 237, 236)',
      level4: 'rgb(220, 235, 235)',
      level5: 'rgb(215, 232, 232)',
    },
    surfaceDisabled: 'rgba(25, 28, 28, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 28, 0.38)',
    backdrop: 'rgba(41, 50, 50, 0.4)',
  },
};

const darkCyanColors = {
  colors: {
    primary: 'rgb(0, 221, 221)',
    onPrimary: 'rgb(0, 55, 55)',
    primaryContainer: 'rgb(0, 79, 79)',
    onPrimaryContainer: 'rgb(0, 251, 251)',
    secondary: 'rgb(176, 204, 203)',
    onSecondary: 'rgb(27, 53, 52)',
    secondaryContainer: 'rgb(50, 75, 75)',
    onSecondaryContainer: 'rgb(204, 232, 231)',
    tertiary: 'rgb(179, 200, 232)',
    onTertiary: 'rgb(28, 49, 75)',
    tertiaryContainer: 'rgb(51, 72, 99)',
    onTertiaryContainer: 'rgb(211, 228, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(25, 28, 28)',
    onBackground: 'rgb(224, 227, 226)',
    surface: 'rgb(25, 28, 28)',
    onSurface: 'rgb(224, 227, 226)',
    surfaceVariant: 'rgb(63, 73, 72)',
    onSurfaceVariant: 'rgb(190, 201, 200)',
    outline: 'rgb(136, 147, 146)',
    outlineVariant: 'rgb(63, 73, 72)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(224, 227, 226)',
    inverseOnSurface: 'rgb(45, 49, 49)',
    inversePrimary: 'rgb(0, 106, 106)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(24, 38, 38)',
      level2: 'rgb(23, 43, 43)',
      level3: 'rgb(22, 49, 49)',
      level4: 'rgb(22, 51, 51)',
      level5: 'rgb(22, 55, 55)',
    },
    surfaceDisabled: 'rgba(224, 227, 226, 0.12)',
    onSurfaceDisabled: 'rgba(224, 227, 226, 0.38)',
    backdrop: 'rgba(41, 50, 50, 0.4)',
  },
};

export const colorThemes = {
  paper: {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
  },
  pink: {
    light: {
      ...MD3LightTheme,
      ...lightPinkColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkPinkColors,
    },
  },
  green: {
    light: {
      ...MD3LightTheme,
      ...lightGreenColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkGreenColors,
    },
  },
  blue: {
    light: {
      ...MD3LightTheme,
      ...lightBlueColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkBlueColors,
    },
  },
  orange: {
    light: {
      ...MD3LightTheme,
      ...lightOrangeColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkOrangeColors,
    },
  },
  red: {
    light: {
      ...MD3LightTheme,
      ...lightRedColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkRedColors,
    },
  },
  yellow: {
    light: {
      ...MD3LightTheme,
      ...lightYellowColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkYellowColors,
    },
  },
  cyan: {
    light: {
      ...MD3LightTheme,
      ...lightCyanColors,
    },
    dark: {
      ...MD3DarkTheme,
      ...darkCyanColors,
    },
  },
} as { [key: string]: { light: MD3Theme; dark: MD3Theme } };