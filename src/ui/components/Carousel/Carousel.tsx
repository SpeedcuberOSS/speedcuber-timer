import { Card, Surface, Text, useTheme } from 'react-native-paper';
import { Dimensions, StyleSheet } from 'react-native';
import React, { Children } from 'react';

import PaginationItem from './PaginationItem';
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import type { ScaledSize } from 'react-native';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export const ElementsText = {
  AUTOPLAY: 'AutoPlay',
};

export const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;

const Carousel: React.FC = ({ children }) => {
  const theme = useTheme();
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  } as const;
  const numChildren = Children.count(children);
  console.log('num kids', Children.count(children));
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <ReanimatedCarousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={Children.toArray(children)}
        renderItem={({ index }) => (
          <Surface
            style={{
              height: PAGE_WIDTH * 0.4,
              borderRadius: 5 * theme.roundness,
              paddingVertical: 5,
              backgroundColor: theme.colors.background,
            }}>
            {Children.toArray(children)[index]}
          </Surface>
        )}
      />
      {!!progressValue && (
        <View style={styles.pagination}>
          {Children.map(children, (_child, index) => {
            return (
              <PaginationItem
                animValue={progressValue}
                index={index}
                key={index}
                length={numChildren}
              />
            );
          })}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
    alignSelf: 'center',
  },
});

export default Carousel;
