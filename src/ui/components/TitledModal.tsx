// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Dimensions, StyleSheet, View } from 'react-native';
import { Modal, Portal, Surface, Text, useTheme } from 'react-native-paper';

import React from 'react';

interface TitledModalProps {
  title: string;
  visible: boolean;
  onDismiss: () => void;
}

const TitledModal: React.FC<TitledModalProps> = ({
  title,
  visible,
  onDismiss,
  children,
}) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.contents,
          { backgroundColor: theme.colors.background },
        ]}>
        <Surface style={styles.titleContainer}>
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>
        </Surface>
        <View style={styles.container}>{children}</View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  contents: {
    maxHeight: 0.6 * Dimensions.get('window').height,
    paddingBottom: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
  },
  title: { padding: 10 },
});

export default TitledModal;
