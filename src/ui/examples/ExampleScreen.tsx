// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentStackScreenProps } from './types';
import { exampleByKey } from './examples';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExampleScreen(
  props: DevelopmentStackScreenProps<'Example'>,
) {
  return (
    <ScrollView>{exampleByKey(props.route.params.key).component}</ScrollView>
  );
}
