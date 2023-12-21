// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../lib/stif/wrappers';
import AttemptPlayer from '../components/TwistyPlayer/AttemptPlayer';
import { RootDrawerScreenProps } from '../navigation/types';
import { STIF } from '../../lib/stif';
import { SafeAreaView } from 'react-native';

type Props = RootDrawerScreenProps<'Play'>;

const attempt =
  require('../../lib/recordings/__fixtures__/particula_3x3x3_attempt.json') as STIF.Attempt;

export default function PlayScreen(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Button
        onPress={() => console.log(JSON.stringify(getLibrary().getAll()))}>
        Print Attempt Library
      </Button>
      */}
      <AttemptPlayer attempt={new Attempt(attempt)} />
    </SafeAreaView>
  );
}
