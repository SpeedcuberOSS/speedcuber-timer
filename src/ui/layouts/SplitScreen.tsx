// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { View, ViewStyle } from 'react-native';

type SplitDirection = 'horizontal' | 'vertical';
interface SplitScreenProps {
  children: JSX.Element[];
  /** The percent of space to give to the first child */
  split?: number;
  direction?: SplitDirection;
  style?: ViewStyle;
}

const splitToFlex: { [key: string]: 'row' | 'column' } = {
  horizontal: 'row',
  vertical: 'column',
};

export default function SplitScreen({
  children,
  split = 50,
  direction = 'vertical',
  style = {},
}: SplitScreenProps) {
  if (children.length !== 2) {
    throw new Error('SplitScreen must have exactly two children');
  }
  split = Math.floor(split)
  if (split < 0 || split > 100) {
    throw new Error('`split` must be a number between 0 and 100')
  }
  const [first, second] = children;
  const styles = computeStyles(split, direction);
  return (
    <View style={[style, styles.container]}>
      <View style={styles.first}>{first}</View>
      <View style={styles.second}>{second}</View>
    </View>
  );
}

function computeStyles(split: number, direction: SplitDirection) {
  return {
    container: { flex: 1, flexDirection: splitToFlex[direction] },
    first: { flex: split },
    second: { flex: 100 - split },
  };
}
