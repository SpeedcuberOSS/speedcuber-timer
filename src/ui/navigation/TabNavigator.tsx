import Icons from '../icons/iconHelper';
import InsightsScreen from '../screens/InsightsScreen';
import LearnScreen from '../screens/LearnScreen';
import PlayScreen from '../screens/PlayScreen';
import PracticeScreen from '../screens/PracticeScreen';
// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: t('learn'),
          tabBarIcon: ({ color }) =>
            Icons.Entypo('open-book')({ size: 24, color }),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          tabBarLabel: t('practice'),
          tabBarIcon: ({ color }) =>
            Icons.Entypo('stopwatch')({ size: 24, color }),
        }}
      />
      <Tab.Screen
        name="Play"
        component={PlayScreen}
        options={{
          tabBarLabel: t('play'),
          tabBarIcon: ({ color }) =>
            Icons.MaterialCommunityIcons('gamepad-variant-outline')({
              size: 24,
              color,
            }),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: t('insights'),
          tabBarIcon: ({ color }) =>
            Icons.Entypo('line-graph')({ size: 24, color }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
