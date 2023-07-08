// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';

import EventSelectorModal from './EventSelectorModal';
import { DevelopmentExampleSet } from '../../examples/types';
import { Button } from 'react-native-paper';

const EventSelectorModalWrapper = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Button onPress={() => setVisible(!visible)}>Show Modal</Button>
      <EventSelectorModal
        visible={visible}
        onDismiss={() => setVisible(!visible)}
        onSelect={console.log}
      />
    </>
  );
};

const examples: DevelopmentExampleSet = {
  key: 'event-selector-modal',
  title: 'Event Selector Modal',
  description: 'A modal that allows the user to select an event.',
  examples: [
    {
      key: 'default',
      title: 'Default',
      component: <EventSelectorModalWrapper />,
    },
  ],
};
export default examples;
