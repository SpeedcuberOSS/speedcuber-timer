// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, Text, View } from 'react-native';

import { Phase } from './ReconstructionStep';
import React from 'react';

interface PhaseBarsProps {
  phases: Phase[];
}

const PhaseBars: React.FC<PhaseBarsProps> = ({ phases }) => {
  return (
    <>
      {/* Horizontal bar showing relative move counts for each phase */}
      <View style={{ flexDirection: 'row', minHeight: 20 }}>
        {phases.map((phase, index) => {
          return (
            <>
              <View
                key={index}
                style={{ flex: phase.moves.length, backgroundColor: 'red' }}
              />
              <View
                key={-(index + 1)}
                style={{ flex: 1, backgroundColor: 'green' }}
              />
            </>
          );
        })}
      </View>
      {/* Horizontal bar showing relative move durations of each phase */}
      <View style={{ flexDirection: 'row', minHeight: 20 }}>
        {phases.map((phase, index) => {
          return (
            <>
              <View
                key={index}
                style={{ flex: phase.duration, backgroundColor: 'red' }}
              />
              <View
                key={-(index + 1)}
                style={{ flex: 100, backgroundColor: 'green' }}
              />
            </>
          );
        })}
      </View>
    </>
  );
};

export default PhaseBars;

const styles = StyleSheet.create({});
