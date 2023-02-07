// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Card, Text } from 'react-native-paper';
import React, { memo, useState } from 'react';

import { Attempt } from '../../../lib/stif';
import AttemptDetailsModal from './AttemptDetailsModal';
import { StyleSheet } from 'react-native';
import { getAttemptTimeString } from '../../utils/formatElapsedTime';

interface AttemptCardProps {
  attempt: Attempt;
  onReplay?: (attempt: Attempt) => void;
}

function AttemptCard({ attempt, onReplay = () => {} }: AttemptCardProps) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  return (
    <>
      <Card style={styles.card} onPress={() => setDetailsVisible(true)}>
        <Card.Title
          title={getAttemptTimeString(attempt)}
          subtitle={new Date(attempt.unixTimestamp).toLocaleString()}
        />
        <Card.Content>
          <Text variant="bodySmall">
            {attempt.solutions[0].scramble.algorithm.moves.join(' ')}
          </Text>
        </Card.Content>
      </Card>
      <AttemptDetailsModal
        attempt={attempt}
        onReplay={onReplay}
        visible={detailsVisible}
        onDismiss={() => setDetailsVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default memo(AttemptCard);
