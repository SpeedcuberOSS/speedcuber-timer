// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Text } from "react-native-paper";

const examples = [
  {
    key: 'hello',
    name: 'Hello World!',
    component: <Text>Hello World!</Text>,
  },
  {
    key: 'goodbye',
    name: 'Goodbye World!',
    component: <Text>Goodbye World!</Text>,
  }
]

export function exampleByKey(key: string) {
  return examples.filter(e => e.key === key)[0] ?? {
    key: '404',
    name: '404',
    component: <Text>404 Example Not Found</Text>,
  };
}

export default examples;