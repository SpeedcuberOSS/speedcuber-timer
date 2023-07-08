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
import { DevelopmentExampleSet } from '../../examples/types';

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

const examples: DevelopmentExampleSet = {
  key: 'attemptdetailsmodal',
  title: 'Attempt Details Modal',
  description: 'Attempt Details in a Modal',
  examples: [
    {
      key: 'typical',
      title: 'Typical',
      component: <AttemptDetailsModalWrapper attempt={basicAttempt} />,
    },
    {
      key: 'infractions',
      title: 'with Infractions',
      component: <AttemptDetailsModalWrapper attempt={infractionsAttempt} />,
    },
    {
      key: 'dnf',
      title: 'with DNF',
      component: <AttemptDetailsModalWrapper attempt={dnfAttempt} />,
    },
    {
      key: 'dns',
      title: 'with DNS',
      component: <AttemptDetailsModalWrapper attempt={dnsAttempt} />,
    },
  ],
};

export default examples;
