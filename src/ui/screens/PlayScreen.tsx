// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ATTEMPT_RELAY_234567 } from '../../lib/stif/demo';
import { RootDrawerScreenProps } from '../navigation/types';
import { SafeAreaView } from 'react-native';
import ScramblingView from '../components/scrambles/ScramblingView';

type Props = RootDrawerScreenProps<'Play'>;

export default function PlayScreen(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScramblingView previousAttempt={ATTEMPT_RELAY_234567}/>
    </SafeAreaView>
  );
}
