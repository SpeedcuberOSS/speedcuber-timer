// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Algorithm, Scramble } from '../../../lib/stif';
import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ReconstructionStep, { Phase } from './ReconstructionStep';

import { SolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';
import getReconstruction from '../../../lib/bluetooth-puzzle/getReconstruction';

interface ReconstructionProps {
  /**
   * The starting scramble for solve.
   */
  scramble: Scramble;
  /**
   * The solve replay for which a reconstruction is being displayed.
   */
  solveReplay: SolveReplay;
  /**
   * The duration of the attempt.
   */
  duration: number;
  /**
   * The current timestamp in the solve replay.
   */
  atTimestamp: number;
}

export default function Reconstruction({
  scramble,
  solveReplay,
  duration,
  atTimestamp,
}: ReconstructionProps) {
  const [steps, setSteps] = useState<Phase[]>([]);
  useEffect(() => {
    const phases = getReconstruction(scramble, solveReplay, 'CFOP', duration);
    setSteps(phases);
  }, [scramble, solveReplay]);

  const ref = useRef<FlatList>(null);
  useEffect(() => {
    if (ref.current && steps.length > 0) {
      let idx = 0;
      for (let i = 0; i < steps.length; i++) {
        if (atTimestamp < steps[i].moves[0]?.t) {
          break;
        }
        idx = i;
      }
      ref.current.scrollToIndex({
        index: idx,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [atTimestamp]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={steps}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: 75,
          offset: 75 * index,
          index,
        })}
        renderItem={({ item }) => {
          let timestamp = atTimestamp;
          if (atTimestamp < item.moves[0]?.t) {
            timestamp = 0;
          } else if (atTimestamp > item.moves[item.moves.length - 1]?.t) {
            timestamp = Infinity;
          }
          return (
            <ReconstructionStep
              key={item.label}
              {...item}
              elapsed={timestamp}
            />
          );
        }}
        keyExtractor={item => item.label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});
