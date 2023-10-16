// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import ConfirmationDialog, {
  ConfirmationDialogProps,
} from './ConfirmationDialog';

import { Button } from 'react-native-paper';
import { DevelopmentExampleSet } from '../examples/types';
import { useState } from 'react';

const ConfirmationDialogWrapper = (props: ConfirmationDialogProps) => {
  const { onCancel, onConfirm } = props;
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Dialog</Button>
      <ConfirmationDialog
        {...props}
        visible={visible}
        onConfirm={() => {
          onConfirm();
          setTimeout(() => setVisible(false), 1000);
        }}
        onCancel={() => {
          onCancel();
          setVisible(false);
        }}
      />
    </>
  );
};

const examples: DevelopmentExampleSet = {
  title: 'Confirmation Dialog',
  description: 'A pop-up to confirm an action.',
  examples: [
    {
      title: 'Default',
      component: (
        <ConfirmationDialogWrapper
          visible={true}
          onConfirm={() => console.log('confirming action')}
          onCancel={() => console.log('cancelling action')}
        />
      ),
    },
    {
      title: 'Custom Text',
      component: (
        <ConfirmationDialogWrapper
          visible={true}
          title="Double check this one..."
          description="Are you sure you want to do this?"
          confirmText="Yes, I'm sure"
          cancelText="No, nevermind"
          onConfirm={() => console.log('confirming action')}
          onCancel={() => console.log('cancelling action')}
        />
      ),
    },
  ],
};

export default examples;
