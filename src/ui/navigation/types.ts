// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import type {
  DrawerHeaderProps,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack';

import { Attempt } from '../../lib/stif';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootDrawerParamList = {
  Practice: undefined;
  Learn: undefined;
  Play: undefined;
  Examples: undefined;
  NotFound: undefined;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  DrawerScreenProps<RootDrawerParamList, T>;

export type RootDrawerHeaderProps = DrawerHeaderProps;

export type PracticeStackParamList = {
  Timer: undefined;
  Player: { attempt: Attempt };
};

export type PracticeStackScreenProps<T extends keyof PracticeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<PracticeStackParamList, T>,
    RootDrawerScreenProps<keyof RootDrawerParamList>
  >;

export type PracticeStackHeaderProps = RootDrawerHeaderProps & StackHeaderProps;

export type TimerTabParamList = {
  Stopwatch: undefined;
  Attempts: undefined;
  Insights: undefined;
};

export type TimerTabScreenProps<T extends keyof TimerTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TimerTabParamList, T>,
    PracticeStackScreenProps<keyof PracticeStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList {}
  }
}
