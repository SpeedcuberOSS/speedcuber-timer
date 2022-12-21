// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import SmartPuzzleScanner from './SmartPuzzleScanner';
import TitledModal from './TitledModal';
import { useTranslation } from 'react-i18next';

interface SmartPuzzleScannerModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function SmartPuzzleScannerModal({
  visible,
  onDismiss,
}: SmartPuzzleScannerModalProps) {
  const { t } = useTranslation();
  return (
    <TitledModal
      title={t('bluetooth.start_scan')}
      visible={visible}
      onDismiss={onDismiss}>
      <SmartPuzzleScanner />
    </TitledModal>
  );
}
