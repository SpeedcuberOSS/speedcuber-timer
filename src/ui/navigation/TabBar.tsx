// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icons from '../icons/iconHelper';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const tabs: IBubbleTabConfig[] = [
    {
      activeColor: theme.colors.primary,
      activeBackgroundColor: theme.colors.background,
      activeIcon: Icons.Entypo('open-book'),
    },
    {
      activeColor: theme.colors.primary,
      activeBackgroundColor: theme.colors.background,
      activeIcon: Icons.Entypo('stopwatch'),
    },
    {
      activeColor: theme.colors.primary,
      activeBackgroundColor: theme.colors.background,
      activeIcon: Icons.MaterialCommunityIcons('gamepad-variant-outline'),
    },
    {
      activeColor: theme.colors.primary,
      activeBackgroundColor: theme.colors.background,
      activeIcon: Icons.Entypo('line-graph'),
    },
  ];
  return (
    <BubbleTabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      tabs={tabs}
      iconRenderer={({ icon: Icon, color }: IIconRenderer) => (
        <Icon color={color} size={24} />
      )}
    />
  );
};

export default TabBar;
