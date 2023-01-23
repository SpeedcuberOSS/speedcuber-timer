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

const MODAL_HEIGHT = 0.6 * Dimensions.get('window').height;

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
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <Surface style={styles.titleContainer} elevation={2}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
        </Surface>
        <View style={styles.childrenContainer}>{children}</View>
        <View
          style={[
            styles.bottomContainer,
            { backgroundColor: theme.colors.background },
          ]}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: MODAL_HEIGHT,
    margin: 20,
    borderRadius: 10,
  },
  titleContainer: {
    maxHeight: 0.15 * MODAL_HEIGHT,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
  },
  childrenContainer: {
    maxHeight: 0.85 * MODAL_HEIGHT,
    alignItems: 'stretch',
  },
  bottomContainer: {
    height: 15,
    marginTop: -15,
    opacity: 0.25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: { padding: 10 },
});

export default TitledModal;
