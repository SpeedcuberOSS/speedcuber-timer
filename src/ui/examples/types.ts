// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { CompositeScreenProps } from '@react-navigation/native';
import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { RootDrawerHeaderProps, RootDrawerParamList, RootDrawerScreenProps } from '../navigation/types';

// Development Examples Data Structures
export interface DevelopmentExampleSet {
  key: string;
  title: string;
  description?: string;
  examples: DevelopmentExample[];
}
export interface DevelopmentExample {
  key: string;
  title: string;
  description?: string;
  component: React.ReactNode | (() => JSX.Element);
}

// Navigation
export type DevelopmentStackParamList = {
  Example: { key: string };
  ExampleList: {
    keys: string[];
  };
};

export type DevelopmentStackScreenProps<
  T extends keyof DevelopmentStackParamList,
> = CompositeScreenProps<
  StackScreenProps<DevelopmentStackParamList, T>,
  RootDrawerScreenProps<keyof RootDrawerParamList>
>;

export type DevelopmentStackHeaderProps = RootDrawerHeaderProps &
  StackHeaderProps;
