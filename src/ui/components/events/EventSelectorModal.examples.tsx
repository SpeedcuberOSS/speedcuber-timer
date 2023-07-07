// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';

import EventSelectorModal from './EventSelectorModal';

const EventSelectorModalWrapper = () => {
  const [visible, setVisible] = useState(true);
  return (
    <EventSelectorModal
      visible={visible}
      onDismiss={() => setVisible(!visible)}
      onSelect={console.log}
    />
  );
};

const examples = [
  {
    key: 'eventSelectorModal:default',
    name: 'Default Event Selector Modal',
    component: <EventSelectorModalWrapper />,
  }
]

export default examples;