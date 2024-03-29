// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../../../lib/stif';
import EventSelector from './EventSelector';
import TitledModal from '../TitledModal';
import { useTranslation } from 'react-i18next';

interface EventSelectorModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (event: STIF.CompetitiveEvent) => void;
}

export default function EventSelectorModal({
  visible,
  onDismiss,
  onSelect,
}: EventSelectorModalProps) {
  const { t } = useTranslation();
  return (
    <TitledModal
      title={t('dialogs.select_event')}
      visible={visible}
      onDismiss={onDismiss}>
      <EventSelector onSelect={onSelect} />
    </TitledModal>
  );
}
