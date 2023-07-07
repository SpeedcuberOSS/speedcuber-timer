// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Text } from 'react-native-paper';
interface Example {
  key: string;
  name: string;
  component: JSX.Element;
}
const examples: Example[] = [
  ...require('../components/attempts/AttemptCard.examples').default,
  ...require('../components/attempts/AttemptDetails.examples').default,
  ...require('../components/attempts/AttemptDetailsModal.examples').default,
  ...require('../components/charts/TPSChart.examples').default,
  ...require('../components/events/EventSelector.examples').default,
  ...require('../components/events/EventSelectorModal.examples').default,
  ...require('../components/inspection/InspectionTime.examples').default,
  ...require('../components/inspection/InspectionTimer.examples').default,
];

export function exampleByKey(key: string) {
  return (
    examples.filter(e => e.key === key)[0] ?? {
      key: '404',
      name: '404',
      component: <Text>404 Example Not Found</Text>,
    }
  );
}

export default examples;
