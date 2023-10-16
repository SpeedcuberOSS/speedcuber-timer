// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

export interface ConfirmationDialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmationDialog({
  visible,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    if (visible) setIsProcessing(false);
  }, [visible]);

  const renderedTitle = title ?? t('confirmation.title');
  const renderedDescription = description ?? t('confirmation.description');
  const renderedConfirmText = confirmText ?? t('confirmation.confirm');
  const renderedCancelText = cancelText ?? t('confirmation.cancel');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        {isProcessing ? (
          <Dialog.Content>
            <ActivityIndicator size="large" />
          </Dialog.Content>
        ) : (
          <>
            <Dialog.Title>{renderedTitle}</Dialog.Title>
            {renderedDescription && (
              <Dialog.Content>
                <Text>{renderedDescription}</Text>
              </Dialog.Content>
            )}
            <Dialog.Actions>
              <Button onPress={onCancel}>{renderedCancelText}</Button>
              <Button
                mode="contained"
                onPress={() => {
                  onConfirm();
                  setIsProcessing(true);
                }}>
                {renderedConfirmText}
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Portal>
  );
}
