// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useAttempts, useAttemptRestoration } from '../../persistence/hooks';
import { backupAttempts } from '../../persistence/backup';
import { RootDrawerScreenProps } from '../navigation/types';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import {
  BackupEntry,
  listBackups,
  loadAttemptsBackup,
} from '../../persistence/restore';
import { useEffect, useState } from 'react';
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
    setBackups(await listBackups('attempts'));
  }

  async function createBackup() {
    await backupAttempts(attempts);
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
        onPressRestore={item => setBackupToRestore(item)}
      />
      <ConfirmationDialog
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
  onPressRestore: (backup: BackupEntry) => void;
}
function BackupList({ backups, onRefresh, onPressRestore }: BackupListProps) {
  const { t } = useTranslation();
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

interface ConfirmationDialogProps {
  backup: null | BackupEntry;
  onDismiss: () => void;
}
function ConfirmationDialog({ backup, onDismiss }: ConfirmationDialogProps) {
  const { t } = useTranslation();
  const restoreAttempts = useAttemptRestoration();
  const [isRestoring, setIsRestoring] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsRestoring(false), 500);
  }, [backup]);

  async function conductRestoreFrom(path: string) {
    setIsRestoring(true);
    const backup = await loadAttemptsBackup(path);
    restoreAttempts(backup);
    onDismiss();
  }

  return (
    <Portal>
      <Dialog visible={backup != null} onDismiss={onDismiss}>
        {isRestoring ? (
          <Dialog.Content>
            <ActivityIndicator size="large" />
          </Dialog.Content>
        ) : (
          <>
            <Dialog.Title>{t('restore.guard')}</Dialog.Title>
            <Dialog.Content>
              <Text>{t('restore.confirmation_message')}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() =>
                  backup ? conductRestoreFrom(backup.path) : null
                }>
                {t('restore.button')}
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Portal>
  );
}
