// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icons from '../utils/iconHelper';
import LearnScreen from '../screens/LearnScreen';
import PracticeScreen from '../screens/PracticeScreen';
import PlayScreen from '../screens/PlayScreen';
import InsightsScreen from '../screens/InsightsScreen';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { useTranslation } from 'react-i18next';

type RoutesState = Array<{
  key: string;
  title: string;
  icon: IconSource;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

const MainNavigator = () => {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<RoutesState>([
    { key: 'learn', title: t('learn'), focusedIcon: Icons.Entypo('open-book') },
    {
      key: 'practice',
      title: t('practice'),
      focusedIcon: Icons.Entypo('stopwatch'),
    },
    { key: 'play', title: t('play'), focusedIcon: 'gamepad-variant-outline' },
    {
      key: 'insights',
      title: t('insights'),
      focusedIcon: Icons.Entypo('line-graph'),
    },
  ]);
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={idx => setIndex(idx)}
      renderScene={BottomNavigation.SceneMap({
        learn: LearnScreen,
        practice: PracticeScreen,
        play: PlayScreen,
        insights: InsightsScreen,
      })}
      sceneAnimationEnabled={false}
    />
  );
};

MainNavigator.title = 'Bottom Navigation';

export default MainNavigator;
