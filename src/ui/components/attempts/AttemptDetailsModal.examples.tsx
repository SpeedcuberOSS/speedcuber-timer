// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';
import {
  basicAttempt,
  dnfAttempt,
  dnsAttempt,
  infractionsAttempt,
} from './AttemptDetails.examples';

import { Attempt } from '../../../lib/stif';
import AttemptDetailsModal from './AttemptDetailsModal';
import { Button } from 'react-native-paper';

const AttemptDetailsModalWrapper = ({ attempt }: { attempt: Attempt }) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Modal</Button>
      <AttemptDetailsModal
        attempt={attempt}
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

const examples = [
  {
    key: 'attemptDetailsModal:typical',
    name: 'Typical Attempt Details Modal',
    component: <AttemptDetailsModalWrapper attempt={basicAttempt} />,
  },
  {
    key: 'attemptDetailsModal:infractions',
    name: 'Attempt Details Modal with Infractions',
    component: <AttemptDetailsModalWrapper attempt={infractionsAttempt} />,
  },
  {
    key: 'attemptDetailsModal:dnf',
    name: 'Attempt Details Modal with DNF',
    component: <AttemptDetailsModalWrapper attempt={dnfAttempt} />,
  },
  {
    key: 'attemptDetailsModal:dns',
    name: 'Attempt Details Modal with DNS',
    component: <AttemptDetailsModalWrapper attempt={dnsAttempt} />,
  },
]

export default examples;
