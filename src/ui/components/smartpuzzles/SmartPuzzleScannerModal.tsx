// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle } from './SmartPuzzleRegistry';
import SmartPuzzleScanner from './SmartPuzzleScanner';
import TitledModal from '../TitledModal';
import { useTranslation } from 'react-i18next';

interface SmartPuzzleScannerModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSelectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  onDeselectPuzzle?: (puzzle: BluetoothPuzzle) => void;
  isPuzzleSelectable?: (puzzle: BluetoothPuzzle) => boolean;
  isPuzzleSelected?: (puzzle: BluetoothPuzzle) => boolean;
}

export default function SmartPuzzleScannerModal({
  visible,
  onDismiss,
  onSelectPuzzle,
  onDeselectPuzzle,
  isPuzzleSelectable,
  isPuzzleSelected,
}: SmartPuzzleScannerModalProps) {
  const { t } = useTranslation();
  return (
    <TitledModal
      title={t('bluetooth.start_scan')}
      visible={visible}
      onDismiss={onDismiss}>
      <SmartPuzzleScanner
        onSelectPuzzle={onSelectPuzzle}
        onDeselectPuzzle={onDeselectPuzzle}
        isPuzzleSelectable={isPuzzleSelectable}
        isPuzzleSelected={isPuzzleSelected}
      />
    </TitledModal>
  );
}
