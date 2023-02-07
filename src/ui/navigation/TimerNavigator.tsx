// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { IconButton, Surface, useTheme } from 'react-native-paper';

import AttemptsScreen from '../screens/AttemptsScreen';
import Icons from '../icons/iconHelper';
import InsightsScreen from '../screens/InsightsScreen';
import React from 'react';
import StopwatchScreen from '../screens/StopwatchScreen';
import { TimerTabParamList } from './types';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<TimerTabParamList>();

const TimerTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();
  return (
    <Surface style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, params: {}, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <IconButton
            key={route.key}
            icon={() =>
              // @ts-ignore
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused
                  ? theme.colors.primary
                  : theme.colors.onBackground,
                size: 24,
              })
            }
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </Surface>
  );
};

const TimerNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        header: () => null,
      }}
      tabBar={props => <TimerTabBar {...props} />}>
      <Tab.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          tabBarLabel: t('timer'),
          tabBarIcon: ({ color, size }) =>
            Icons.Entypo('stopwatch')({ size, color }),
        }}
      />
      <Tab.Screen
        name="Attempts"
        component={AttemptsScreen}
        options={{
          tabBarLabel: t('attempts'),
          tabBarIcon: ({ color, size }) =>
            Icons.MaterialIcons('list-alt')({ size, color }),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: t('insights'),
          tabBarIcon: ({ color, size }) =>
            Icons.Entypo('line-graph')({ size, color }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TimerNavigator;
