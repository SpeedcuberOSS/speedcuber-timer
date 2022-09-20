// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption, Card } from 'react-native-paper';
import { Attempt } from '../../lib/stif';
import { getAttemptTimeString } from '../utils/formatElapsedTime';

interface AttemptCardProps {
  attempt: Attempt;
}

export default function AttemptCard(props: AttemptCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={getAttemptTimeString(props.attempt)}
        subtitle={props.attempt.timestamp.toLocaleString()}
      />
      <Card.Content>
        <Caption>
          {props.attempt.solutions[0].scramble.algorithm.moves.join(' ')}
        </Caption>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});
