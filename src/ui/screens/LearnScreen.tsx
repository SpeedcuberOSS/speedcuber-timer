// Copyright (c) 2022 Joseph Hale <me@jhale.dev>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SafeAreaView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import React, { useState } from 'react';

// import StoryBook from '../../../storybook';
import Icons from '../utils/iconHelper';

function OpenStorybookFAB({ onPress }: { onPress: () => void }) {
  return (
    <FAB
      style={styles.fabOpen}
      icon={Icons.MaterialCommunityIcons('book')}
      onPress={onPress}
    />
  );
}

function CloseStorybookFAB({ onPress }: { onPress: () => void }) {
  return (
    <FAB
      style={styles.fabClosed}
      icon={Icons.Entypo('open-book')}
      onPress={onPress}
    />
  );
}

export default function LearnScreen() {
  const [showStorybook, setShowStorybook] = useState(false);
  const onPressFAB = () => setShowStorybook(!showStorybook);
  return (
    <SafeAreaView style={styles.container}>
      {/* {showStorybook && <StoryBook />} */}
      {showStorybook ? (
        <CloseStorybookFAB onPress={onPressFAB} />
      ) : (
        <OpenStorybookFAB onPress={onPressFAB} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabOpen: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 2,
  },
  fabClosed: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 40,
  },
});
