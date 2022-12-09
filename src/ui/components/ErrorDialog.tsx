// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, Dialog, Portal, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface ErrorDialogProps {
  error: Error | undefined;
}

export default function ErrorDialog({ error }: ErrorDialogProps) {
  const message = error?.message;
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const shouldBeVisible = message !== undefined;
    console.debug(`ErrorDialog: ${message} | ${visible}`);
    setVisible(shouldBeVisible);
  }, [error]);
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{t('error.title')}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>{t('common.ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
