// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View } from 'react-native';
import { Attempt } from '../../lib/stif/wrappers';
import AttemptDetails from '../components/attempts/AttemptDetails';
import { PracticeStackScreenProps } from '../navigation/types';

type Props = PracticeStackScreenProps<'Details'>;

export default function AttemptPlayerScreen({ route, navigation }: Props) {
  return (
    <View style={{paddingTop: 12}}>
      <AttemptDetails
        attempt={new Attempt(route.params.attempt)}
        onReplay={() => navigation.push('Player', {
          attempt: route.params.attempt
        })}
        // onPressTPS={route.params.onPressTPS}
      />
    </View>
  );
}
