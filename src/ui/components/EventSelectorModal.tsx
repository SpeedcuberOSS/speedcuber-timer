// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Modal, Portal, useTheme } from 'react-native-paper';

import { CompetitiveEvent } from '../../lib/stif';
import { Dimensions } from 'react-native';
import EventSelector from './EventSelector';
import React from 'react';

interface EventSelectorModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (event: CompetitiveEvent) => void;
}

export default function EventSelectorModal({
  visible,
  onDismiss,
  onSelect,
}: EventSelectorModalProps) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          maxHeight: 0.6 * Dimensions.get('window').height,
          margin: 20,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <EventSelector onSelect={onSelect} />
      </Modal>
    </Portal>
  );
}
