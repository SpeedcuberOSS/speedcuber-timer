// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt, CompetitiveEvent } from '../../../lib/stif';
import { useState } from 'react';

import AttemptDetails from './AttemptDetails';
import TitledModal from '../TitledModal';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface AttemptDetailsModalProps {
  attempt: Attempt;
  onReplay?: (attempt: Attempt) => void;
  visible: boolean;
  onDismiss: () => void;
}

export default function AttemptDetailsModal({
  attempt,
  visible,
  onDismiss,
  onReplay = () => {},
}: AttemptDetailsModalProps) {
  const { t } = useTranslation();
  const [paddingBottom, setPaddingBottom] = useState(0);
  return (
    <TitledModal
      title={t('dialogs.attempt_details')}
      visible={visible}
      onDismiss={onDismiss}>
      <View style={{ paddingBottom: paddingBottom }}>
        <AttemptDetails
          attempt={attempt}
          onToggleScramble={visible => setPaddingBottom(visible ? 15 : 0)}
          onReplay={attempt => {
            onReplay(attempt);
            onDismiss();
          }}
        />
      </View>
    </TitledModal>
  );
}
