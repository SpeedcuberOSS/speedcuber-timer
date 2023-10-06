// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Card } from 'react-native-paper';
import { memo } from 'react';

import { Attempt } from '../../../lib/stif/wrappers';
import { StyleSheet } from 'react-native';
import { getAttemptTimeString } from '../../utils/formatElapsedTime';
import { STIF } from '../../../lib/stif';

interface AttemptCardProps {
  attempt: STIF.Attempt;
  onPress?: (attempt: STIF.Attempt) => void;
}

function AttemptCard({ attempt, onPress = () => {} }: AttemptCardProps) {
  const wrapped = new Attempt(attempt);
  return (
    <Card style={styles.card} onPress={() => onPress(attempt)}>
      <Card.Title
        title={getAttemptTimeString(wrapped)}
        titleVariant="titleMedium"
        subtitle={new Date(wrapped.timerStart()).toLocaleDateString()}
        subtitleVariant="bodySmall"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default memo(AttemptCard);
