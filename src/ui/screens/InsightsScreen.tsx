// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import BigList from 'react-native-big-list';
import { getLibrary } from '../../lib/attempts';
import AttemptCard from '../components/AttemptCard';
import { getCurrentTheme } from '../themes';
import { Attempt } from '../../lib/stif';
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import { VictoryThemeDefinition } from 'victory-core';

//import {Alg} from "cubing/alg"
//import {TwistyPlayer} from "cubing/twisty"
import { TwistyPlayer } from '../../cubing/twisty';
import { WebView } from 'react-native-webview';

// TODO: GET TWISTY PLAYER WORKING FROM LOCAL FORK, NOT NODE MODULES!!!

let library = getLibrary();
let chartTheme: VictoryThemeDefinition = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    style: {
      ...VictoryTheme.material.axis?.style,
      tickLabels: {
        ...VictoryTheme.material.axis?.style?.tickLabels,
        // @ts-ignore
        fill: getCurrentTheme().colors.onBackground,
      },
    },
  },
};

export default function InsightsScreen() {
  const theme = getCurrentTheme();
  let data = library.getAll();
  data = data
    .sort((a, b) => b.unixTimestamp - a.unixTimestamp)
    .slice(0, Math.min(200, data.length));
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  const testScale = {
    transform: [{ scale: 1.1 }]
  };
  console.debug(`showing ${data.length} attempts`);

  const player = new TwistyPlayer({
    puzzle: "4x4x4",
    alg: "R U R'",
    hintFacelets: "none",
    backView: "top-right",
    background: "none"
  });

  return (
    <SafeAreaView style={styles.container}>
      <WebView style={testScale}
        source={{ html: '<script type="module"></script><twisty-player></twisty-player>' }}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
