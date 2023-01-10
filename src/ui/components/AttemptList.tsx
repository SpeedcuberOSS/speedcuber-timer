// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { FlatList, View } from 'react-native';
import React, { memo } from 'react';

import { Attempt } from '../../lib/stif';
import AttemptCard from './AttemptCard';

interface AttemptListProps {
  attempts: Attempt[];
}

function AttemptList({ attempts }: AttemptListProps) {
  console.debug(`AttemptList: ${attempts.length}`);
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <AttemptCard key={item.id} attempt={item} />
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList data={attempts} renderItem={renderAttempt} />
    </View>
  );
}

export default memo(AttemptList);
