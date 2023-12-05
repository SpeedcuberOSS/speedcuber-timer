// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { STIF } from '../../../lib/stif';
import { useTranslation } from 'react-i18next';

interface AlgorithmProps {
  algorithm?: STIF.Algorithm;
  layoutHeightLimit?: number;
}
export default function Algorithm({
  algorithm,
  layoutHeightLimit,
}: AlgorithmProps) {
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();
  const likelyOverflow = useOverflowHeuristic(algorithm);
  const [measuredOverflow, setMeasuredHeight] = useMeasuredOverflow(
    algorithm,
    layoutHeightLimit,
  );
  const overflows = !!likelyOverflow || !!measuredOverflow;
  return (
    <>
      <View>
        {overflows ? (
          <Button onPress={() => setShowDialog(true)}>
            {t('scramble.show')}
          </Button>
        ) : (
          <AlgorithmText
            algorithm={algorithm}
            textProps={{
              onTextLayout: event => {
                const lines = event.nativeEvent.lines;
                const height = lines.reduce((a, l) => a + l.height, 0);
                setMeasuredHeight(height);
              },
            }}
          />
        )}
      </View>
      <AlgorithmDialog
        algorithm={algorithm}
        isVisible={showDialog}
        onDismiss={() => setShowDialog(false)}
      />
    </>
  );
}

const OVERFLOW_HEURISTIC = 200;
const isLikelyOverflow = (algorithm?: STIF.Algorithm) => {
  const characterCount = algorithm?.join('').length ?? 0;
  return characterCount > OVERFLOW_HEURISTIC;
};

function useOverflowHeuristic(algorithm?: STIF.Algorithm) {
  const likely = isLikelyOverflow(algorithm);
  const [likelyOverflow, setLikelyOverflow] = useState(likely);
  useEffect(() => setLikelyOverflow(likely), [algorithm]);
  return likelyOverflow;
}

function useMeasuredOverflow(algorithm?: STIF.Algorithm, heightLimit?: number) {
  const [measuredHeight, setMeasuredHeight] = useState(0);
  useEffect(() => setMeasuredHeight(0), [algorithm]);
  const maxHeight = heightLimit ?? measuredHeight;
  const measuredOverflow = measuredHeight > maxHeight;
  return [measuredOverflow, setMeasuredHeight] as const;
}

interface AlgorithmDialogProps {
  algorithm?: STIF.Algorithm;
  isVisible: boolean;
  onDismiss?: () => void;
}
export function AlgorithmDialog({
  algorithm,
  isVisible,
  onDismiss,
}: AlgorithmDialogProps) {
  const { t } = useTranslation();
  const maxHeight = 0.8 * Dimensions.get('window').height;
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss} style={{ maxHeight }}>
        <Dialog.Title>{t('scramble.scramble', { count: 1 })}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <AlgorithmText algorithm={algorithm} />
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
}

interface AlgorithmTextProps {
  algorithm?: STIF.Algorithm;
  textProps?: Partial<React.ComponentProps<typeof Text>>;
}
function AlgorithmText({ algorithm, textProps }: AlgorithmTextProps) {
  const { t } = useTranslation();
  const text = algorithm ? algorithm.join('  ') : t('scramble.hand');
  return (
    <Text {...(textProps ?? {})} variant="bodyLarge" style={styles.algorithm}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  algorithm: {
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontVariant: ['tabular-nums'],
  },
});
