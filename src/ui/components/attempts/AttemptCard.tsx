// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Card, Text } from 'react-native-paper';
import React, { memo } from 'react';

import { Attempt } from '../../../lib/stif';
import { StyleSheet } from 'react-native';
import { getAttemptTimeString } from '../../utils/formatElapsedTime';

interface AttemptCardProps {
  attempt: Attempt;
}

function AttemptCard(props: AttemptCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={getAttemptTimeString(props.attempt)}
        subtitle={new Date(props.attempt.unixTimestamp).toLocaleString()}
      />
      <Card.Content>
        <Text variant="bodySmall">
          {props.attempt.solutions[0].scramble.algorithm.moves.join(' ')}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default memo(AttemptCard);