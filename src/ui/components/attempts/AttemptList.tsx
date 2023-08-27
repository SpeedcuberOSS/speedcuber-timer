// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, FlatList, View } from 'react-native';
import { memo } from 'react';

import { Attempt } from '../../../lib/stif/wrappers';
import AttemptCard from './AttemptCard';

const NUM_COLUMNS = 3;

interface AttemptListProps {
  attempts: Attempt[];
  onPress?: (attempt: Attempt) => void;
}

function AttemptList({ attempts, onPress = () => {} }: AttemptListProps) {
  console.debug(`AttemptList: ${attempts.length}`);
  const renderAttempt = ({ item }: { item: Attempt }) => (
    <View style={{ width: Dimensions.get('window').width / NUM_COLUMNS }}>
      <AttemptCard key={item.id()} attempt={item} onPress={onPress} />
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={attempts}
        renderItem={renderAttempt}
        keyExtractor={attempt => attempt.id()}
        numColumns={NUM_COLUMNS}
        initialNumToRender={30}
      />
    </View>
  );
}

export default memo(AttemptList);
