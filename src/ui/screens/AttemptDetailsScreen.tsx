// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useMemo, useState } from 'react';

import { Attempt } from '../../lib/stif/wrappers';
import AttemptDetails from '../components/attempts/AttemptDetails';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { PracticeStackScreenProps } from '../navigation/types';
import { View } from 'react-native';
import { useAttemptDeletor } from '../../persistence/hooks';

type Props = PracticeStackScreenProps<'Details'>;

export default function AttemptDetailsScreen({ route, navigation }: Props) {
  const attempt = useMemo(
    () => new Attempt(route.params.attempt),
    [route.params.attempt],
  );
  const deleteAttempt = useAttemptDeletor();
  useEffect(() => {
    navigation.setOptions({
      title: new Date(attempt.stif().timerStart).toLocaleString(),
    });
  }, [attempt]);
  const [confirming, setConfirming] = useState(false);
  return (
    <View style={{ paddingTop: 12 }}>
      <AttemptDetails
        attempt={attempt}
        onReplay={() =>
          navigation.push('Player', {
            attempt: attempt.stif(),
          })
        }
        onDelete={() => setConfirming(true)}
        onInspectTPS={() =>
          navigation.push('TPSChart', {
            attempt: attempt.stif(),
          })
        }
      />
      <ConfirmationDialog
        visible={confirming}
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          navigation.pop();
          deleteAttempt(attempt.id());
        }}
      />
    </View>
  );
}
