// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  basicAttempt,
  dnfAttempt,
  dnsAttempt,
  plus2Attempt,
  plus4Attempt,
} from './AttemptDetails.examples';

import { Attempt } from '../../../lib/stif/wrappers';
import AttemptDetailsModal from './AttemptDetailsModal';
import { Button } from 'react-native-paper';
import { DevelopmentExampleSet } from '../../examples/types';
import { useState } from 'react';

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
  title: 'Attempt Details Modal',
  description: 'Attempt Details in a Modal',
  examples: [
    {
      title: 'Typical',
      component: <AttemptDetailsModalWrapper attempt={basicAttempt} />,
    },
    {
      title: 'with +2',
      component: <AttemptDetailsModalWrapper attempt={plus2Attempt} />,
    },
    {
      title: 'with +4',
      component: <AttemptDetailsModalWrapper attempt={plus4Attempt} />,
    },
    {
      title: 'with DNF',
      component: <AttemptDetailsModalWrapper attempt={dnfAttempt} />,
    },
    {
      title: 'with DNS',
      component: <AttemptDetailsModalWrapper attempt={dnsAttempt} />,
    },
  ],
};

export default examples;
