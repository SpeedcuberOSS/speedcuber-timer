// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function ZeroAttemptsPlaceholder() {
  const { t } = useTranslation();
  return (
    <View style={styles.centeredContents}>
      <Text style={styles.centeredText}>{t('insights.emptyChartLine1')}</Text>
      <Text style={styles.centeredText}>{t('insights.emptyChartLine2')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContents: { alignSelf: 'center', flex: 1, justifyContent: 'center' },
  centeredText: { textAlign: 'center' },
});
