// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Backup, Restore } from '../../persistence';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useAttemptRestoration, useAttempts } from '../../persistence/hooks';
import { useEffect, useState } from 'react';

import { BackupEntry } from '../../persistence/types';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { RootDrawerScreenProps } from '../navigation/types';
import { useTranslation } from 'react-i18next';

type Props = RootDrawerScreenProps<'Backup'>;

export default function BackupScreen(props: Props) {
  const { t } = useTranslation();
  const attempts = useAttempts({});
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [backupToRestore, setBackupToRestore] = useState(
    null as BackupEntry | null,
  );

  async function onRefresh() {
    setBackups(await Restore.list('attempts'));
  }

  async function createBackup() {
    await Backup.attempts(attempts);
    onRefresh();
  }

  async function removeBackup(backup: BackupEntry) {
    await Backup.removeAt(backup.path);
    onRefresh();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t('backup.title')}
      </Text>
      <Button onPress={createBackup} mode="contained" style={styles.create}>
        {t('backup.button')}
      </Button>
      <BackupList
        backups={backups}
        onRefresh={onRefresh}
        onPressDelete={item => removeBackup(item)}
        onPressRestore={item => setBackupToRestore(item)}
      />
      <BackupConfirmationDialog
        backup={backupToRestore}
        onDismiss={() => setBackupToRestore(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20 },
  title: { marginVertical: 20 },
  create: { marginBottom: 20 },
});

interface BackupListProps {
  backups: BackupEntry[];
  onRefresh: () => Promise<void>;
  onPressDelete: (backup: BackupEntry) => void;
  onPressRestore: (backup: BackupEntry) => void;
}
function BackupList({
  backups,
  onRefresh,
  onPressDelete,
  onPressRestore,
}: BackupListProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [lastBackupCheck, setLastBackupCheck] = useState(new Date());
  useEffect(() => {
    setRefreshing(true);
    const started = new Date().getTime();
    (async () => {
      await onRefresh();
      setTimeout(
        () => setRefreshing(false),
        Math.max(0, 500 - (new Date().getTime() - started)),
      );
    })();
  }, [lastBackupCheck]);

  return (
    <FlatList
      data={backups}
      keyExtractor={item => item.date.getTime().toString()}
      renderItem={({ item }) => (
        <Card>
          <Card.Title title={item.date.toLocaleString()} />
          <Card.Actions>
            <Button
              onPress={() => onPressDelete(item)}
              textColor={theme.colors.error}>
              {t('restore.deleteButton')}
            </Button>
            <Button onPress={() => onPressRestore(item)}>
              {t('restore.button')}
            </Button>
          </Card.Actions>
        </Card>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListFooterComponent={() => <View style={{ height: 10 }} />}
      refreshing={refreshing}
      onRefresh={() => setLastBackupCheck(new Date())}
      style={{ flexGrow: 1 }}
    />
  );
}

interface BackupConfirmationDialogProps {
  backup: null | BackupEntry;
  onDismiss: () => void;
}
function BackupConfirmationDialog({
  backup,
  onDismiss,
}: BackupConfirmationDialogProps) {
  const { t } = useTranslation();
  const restoreAttempts = useAttemptRestoration();
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsProcessing(false), 500);
  }, [backup]);

  async function conductRestoreFrom(path: string) {
    setIsProcessing(true);
    const backup = await Restore.attempts(path);
    restoreAttempts(backup);
    onDismiss();
  }

  return (
    <ConfirmationDialog
      visible={backup != null || isProcessing}
      title={t('restore.guard')}
      description={t('restore.confirmation_message')}
      confirmText={t('restore.button')}
      onConfirm={() => (backup ? conductRestoreFrom(backup.path) : null)}
      onCancel={onDismiss}
    />
  );
}
