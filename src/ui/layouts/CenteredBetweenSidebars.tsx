// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';

export interface LayoutEvent {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface LayoutAllEvent {
  container: LayoutEvent;
  leading: LayoutEvent;
  content: LayoutEvent;
  ending: LayoutEvent;
}

interface CenteredBetweenSidebarsProps {
  children: JSX.Element[];
  containerStyle?: ViewStyle;
  direction?: 'horizontal' | 'vertical';
  contentWeight?: number;
  contentStyle?: ViewStyle;
  sidebarWeight?: number;
  sidebarStyle?: ViewStyle;
  onLayoutAll?: (layouts: LayoutAllEvent) => void;
}

export default function CenteredBetweenSidebars({
  children,
  containerStyle = {},
  direction = 'horizontal',
  contentWeight = 4,
  contentStyle = {},
  sidebarWeight = 1,
  sidebarStyle = {},
  onLayoutAll,
}: CenteredBetweenSidebarsProps) {
  if (children.length !== 3) {
    throw new Error('CenteredBetweenSidebars must have exactly three children');
  }
  const [leading, content, ending] = children;
  const flexDirection = direction === 'horizontal' ? 'row' : 'column';
  const {
    onContainerLayout,
    onLeadingLayout,
    onContentLayout,
    onEndingLayout,
  } = useLayoutTracker(onLayoutAll);
  return (
    <View
      onLayout={onContainerLayout}
      style={[containerStyle, { flexDirection: flexDirection }]}>
      <View
        onLayout={onLeadingLayout}
        style={[sidebarStyle, { flex: sidebarWeight }]}>
        {leading}
      </View>
      <View
        onLayout={onContentLayout}
        style={[contentStyle, { flex: contentWeight }]}>
        {content}
      </View>
      <View
        onLayout={onEndingLayout}
        style={[sidebarStyle, { flex: sidebarWeight }]}>
        {ending}
      </View>
    </View>
  );
}

function useLayoutTracker(onLayoutAll?: (layouts: LayoutAllEvent) => void) {
  const [containerLayout, setContainerLayout] = useState<LayoutEvent>();
  const [leadingLayout, setLeadingLayout] = useState<LayoutEvent>();
  const [contentLayout, setContentLayout] = useState<LayoutEvent>();
  const [endingLayout, setEndingLayout] = useState<LayoutEvent>();
  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerLayout(event.nativeEvent.layout);
  };
  const onLeadingLayout = (event: LayoutChangeEvent) => {
    setLeadingLayout(event.nativeEvent.layout);
  };
  const onContentLayout = (event: LayoutChangeEvent) => {
    setContentLayout(event.nativeEvent.layout);
  };
  const onEndingLayout = (event: LayoutChangeEvent) => {
    setEndingLayout(event.nativeEvent.layout);
  };
  useEffect(() => {
    if (containerLayout && leadingLayout && contentLayout && endingLayout) {
      const layouts = {
        container: containerLayout,
        leading: leadingLayout,
        content: contentLayout,
        ending: endingLayout,
      };
      onLayoutAll && onLayoutAll(layouts);
    }
  }, [containerLayout, leadingLayout, contentLayout, endingLayout]);
  return {
    onContainerLayout,
    onLeadingLayout,
    onContentLayout,
    onEndingLayout,
  };
}
