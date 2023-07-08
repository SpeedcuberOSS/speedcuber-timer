// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentStackScreenProps } from './types';
import Examples from './examples';
import { useEffect } from 'react';
import { wrappers } from './wrappers';

export default function ExampleScreen(
  props: DevelopmentStackScreenProps<'Example'>,
) {
  useEffect(() => {
    const setTitle = Examples.setByKey(
      props.route.params.key.split(':')[0],
    ).title;
    const exampleTitle = Examples.exampleByKey(props.route.params.key).title;
    const displayTitle = `${setTitle}: ${exampleTitle}`;
    props.navigation.setOptions({ title: displayTitle });
  }, []);
  wrappers.forEach(wrapper => {
    const oldComponent = Examples.exampleByKey(props.route.params.key);

    oldComponent.component = wrapper({ children: oldComponent.component });
  });

  return wrappers.reduce((Wrapped, NextWrapper) => {
    return <NextWrapper>{Wrapped}</NextWrapper>;
  }, Examples.exampleByKey(props.route.params.key).component);
}
