// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { List, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Attempt } from '../../../lib/stif';
import Icons from '../../icons/iconHelper';
import TwistyPlayer from '../TwistyPlayer';
import { getAttemptTimeString } from '../../utils/formatElapsedTime';
import { getSolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';

interface AttemptDetailsProps {
  attempt: Attempt;
  onToggleScramble?: (visible: boolean) => void;
  onReplay?: (attempt: Attempt) => void;
}

export default function AttemptDetails({
  attempt,
  onToggleScramble = () => {},
  onReplay = () => {},
}: AttemptDetailsProps) {
  const theme = useTheme();
  const [scrambleExpanded, setScrambleExpanded] = useState(false);
  const solution = attempt.solutions[0];
  const scramble = solution.scramble.algorithm.moves.join(' ');
  return (
    <ScrollView style={styles.container}>
      <List.Section>
        {/* @ts-ignore */}
        <List.Item
          title={getAttemptTimeString(attempt)}
          description={new Date(attempt.unixTimestamp).toLocaleString()}
          left={props => (
            <List.Icon {...props} icon={Icons.Entypo('stopwatch')} />
          )}
          right={props =>
            getSolveReplay(attempt).length > 0 ? (
              <TouchableOpacity onPress={() => onReplay(attempt)}>
                <List.Icon {...props} icon={Icons.Entypo('controller-play')} />
              </TouchableOpacity>
            ) : null
          }
        />
        {attempt.comment.length > 0 ? (
          // @ts-ignore
          <List.Item
            title={attempt.comment}
            titleNumberOfLines={0}
            left={props => (
              <List.Icon {...props} icon={Icons.MaterialIcons('comment')} />
            )}
          />
        ) : null}
        {/* @ts-ignore */}
        <List.Accordion
          style={{ marginLeft: 10 }}
          title={scramble}
          titleNumberOfLines={0}
          expanded={scrambleExpanded}
          onPress={() => {
            setScrambleExpanded(!scrambleExpanded);
            onToggleScramble?.(!scrambleExpanded);
          }}
          left={props => (
            <List.Icon {...props} icon={Icons.WCAEvent(attempt.event.id)} />
          )}
        />
      </List.Section>
      {scrambleExpanded ? (
        <View style={{ height: 200 }}>
          <TwistyPlayer
            // @ts-ignore
            puzzle={attempt.event.puzzle}
            algorithm={solution.scramble.algorithm}
            visualization={'2D'}
            backgroundColor={theme.colors.background}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
