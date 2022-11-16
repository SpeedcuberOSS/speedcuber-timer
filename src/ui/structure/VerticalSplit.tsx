// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import React from 'react';

interface VerticalSplitProps {
  top: React.ReactNode;
  bottom: React.ReactNode;
  proportion?: number;
}

export default function VerticalSplit({
  top,
  bottom,
  proportion = 50,
}: VerticalSplitProps) {
  if (!Number.isInteger(proportion) || proportion < 0 || 100 < proportion) {
    throw new Error('proportion must be an integer on the domain [0, 100]');
  }
  const [topHeight, bottomHeight] = [`${proportion}%`, `${100 - proportion}%`];
  return (
    <View style={styles.container}>
      <View style={{ height: topHeight }}>{top}</View>
      <View style={{ height: bottomHeight }}>{bottom}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
