// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { View } from 'react-native';

interface CenteredBetweenSidebarsProps {
  children: JSX.Element[];
  contentWeight?: number;
  sidebarWeight?: number;
}

export default function CenteredBetweenSidebars({
  children,
  contentWeight = 4,
  sidebarWeight = 1,
}: CenteredBetweenSidebarsProps) {
  if (children.length !== 3) {
    throw new Error('CenteredBetweenSidebars must have exactly three children');
  }
  const [leftSidebar, content, rightSidebar] = children;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: sidebarWeight }}>{leftSidebar}</View>
      <View style={{ flex: contentWeight, zIndex: 1 }}>{content}</View>
      <View style={{ flex: sidebarWeight }}>{rightSidebar}</View>
    </View>
  );
}
