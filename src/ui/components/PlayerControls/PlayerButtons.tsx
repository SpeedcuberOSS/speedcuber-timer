// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { IconButton } from 'react-native-paper';
import Icons from '../../icons/iconHelper';
import React from 'react';

interface PlayerButtonsProps {
  isPlaying: boolean;
  onJumpToStart: () => void;
  onJumpBackward: () => void;
  onPlay: () => void;
  onPause: () => void;
  onJumpForward: () => void;
  onJumpToEnd: () => void;
}

export default function PlayerButtons({
  isPlaying,
  onJumpToStart,
  onJumpBackward,
  onPlay,
  onPause,
  onJumpForward,
  onJumpToEnd,
}: PlayerButtonsProps) {
  return (
    <View style={styles.container}>
      <IconButton
        icon={Icons.Entypo('controller-jump-to-start')}
        onPress={onJumpToStart}
      />
      <IconButton
        icon={Icons.Entypo('controller-fast-backward')}
        onPress={onJumpBackward}
      />
      <IconButton
        icon={
          isPlaying
            ? Icons.Entypo('controller-paus')
            : Icons.Entypo('controller-play')
        }
        animated={true}
        onPress={isPlaying ? onPause : onPlay}
      />
      <IconButton
        icon={Icons.Entypo('controller-fast-forward')}
        onPress={onJumpForward}
      />
      <IconButton
        icon={Icons.Entypo('controller-next')}
        onPress={onJumpToEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
