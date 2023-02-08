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
} from './AttemptDetails.stories';

import { Attempt } from '../../../lib/stif';
import AttemptDetailsModal from './AttemptDetailsModal';
import { Button } from 'react-native-paper';
import { storiesOf } from '@storybook/react-native';

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

storiesOf('AttemptDetailsModal', module)
  .add('default', () => <AttemptDetailsModalWrapper attempt={basicAttempt} />)
  .add('with Infractions', () => (
    <AttemptDetailsModalWrapper attempt={infractionsAttempt} />
  ))
  .add('with DNF', () => <AttemptDetailsModalWrapper attempt={dnfAttempt} />)
  .add('with DNS', () => <AttemptDetailsModalWrapper attempt={dnsAttempt} />);
