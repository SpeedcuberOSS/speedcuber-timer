// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt } from '../../lib/stif/wrappers';
import AttemptPlayer from '../components/TwistyPlayer/AttemptPlayer';
import { PracticeStackScreenProps } from '../navigation/types';

type Props = PracticeStackScreenProps<'Player'>;

export default function AttemptPlayerScreen({ route, navigation }: Props) {
  return <AttemptPlayer attempt={new Attempt(route.params.attempt)} />;
}
