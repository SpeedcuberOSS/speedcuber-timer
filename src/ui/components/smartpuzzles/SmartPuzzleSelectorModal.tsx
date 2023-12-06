// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { GeneratedScramble } from '../scrambles/types';
import SmartPuzzleScannerModal from './SmartPuzzleScannerModal';

interface SmartPuzzleSelectorModalProps {
  scrambles: GeneratedScramble[];
  idx: number;
  visible: boolean;
  onDismiss: () => void;
}
export default function SmartPuzzleSelectorModal({
  scrambles,
  idx,
  visible,
  onDismiss,
}: SmartPuzzleSelectorModalProps) {
  return (
    <SmartPuzzleScannerModal
      visible={visible}
      onSelectPuzzle={smartPuzzle => {
        // TODO WARNING: Mutability
        scrambles[idx].smartPuzzle = smartPuzzle;
        onDismiss();
      }}
      onDeselectPuzzle={() => {
        // TODO WARNING: Mutability
        scrambles[idx].smartPuzzle = undefined;
        onDismiss();
      }}
      isPuzzleSelected={smartPuzzle => {
        return scrambles[idx].smartPuzzle?.device.id === smartPuzzle.device.id;
      }}
      isPuzzleSelectable={smartPuzzle => {
        const isRightPuzzle = smartPuzzle.puzzle === scrambles[idx].puzzle;
        const isPuzzleSelectedForOtherScramble = scrambles
          .filter((_value, i) => i !== idx)
          .some(
            scramble =>
              scramble.smartPuzzle?.device.id === smartPuzzle.device.id,
          );
        return isRightPuzzle && !isPuzzleSelectedForOtherScramble;
      }}
      onDismiss={onDismiss}
    />
  );
}
