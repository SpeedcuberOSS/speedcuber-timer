// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FlatList, StyleSheet, View } from 'react-native';
import SolutionPhase from './SolutionPhase';
import { useEffect, useRef } from 'react';
import { Solution as SolutionWrapper } from '../../../lib/stif/wrappers';

import { Milliseconds } from '../../../lib/stif';

interface SolutionProps {
  /**
   * The solution to render.
   */
  solution: SolutionWrapper;
  /**
   * The current timestamp in the solve replay.
   */
  atTimestamp?: Milliseconds;
}

export default function Solution({ solution, atTimestamp = 0 }: SolutionProps) {
  const phases = solution.reconstruction();
  const ref = useRef<FlatList>(null);
  useEffect(() => {
    if (ref.current && phases.length > 0) {
      let idx = 0;
      for (let i = 0; i < phases.length; i++) {
        if (atTimestamp < phases[i].moves()[0]?.t) {
          break;
        }
        idx = i;
      }
      ref.current.scrollToIndex({
        index: idx,
        animated: true,
        viewPosition: 0,
      });
    }
  }, [atTimestamp]);
  return (
    <View style={styles.container}>
      {phases.length > 0 ? (
        <FlatList
          ref={ref}
          data={phases}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
          renderItem={({ item }) => {
            let timestamp = atTimestamp;
            if (atTimestamp < item.moves()[0]?.t) {
              timestamp = 0;
            } else if (atTimestamp > item.moves()[item.moves().length - 1]?.t) {
              timestamp = Infinity;
            }
            return (
              <SolutionPhase
                key={item.label()}
                phase={item}
                elapsed={timestamp}
              />
            );
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});
