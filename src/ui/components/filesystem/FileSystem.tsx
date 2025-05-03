// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ActivityIndicator,
  IconButton,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import {
  DocumentDirectoryPath,
  ReadDirResItemT,
  hash,
  readDir,
  readFile,
  stat,
  unlink,
} from '@dr.pogodin/react-native-fs';
import { FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import { Timer } from '../../../lib/timers';

interface FileSystemProps {
  path?: string;
  onPressFile?: (path: string) => void;
  onPressFolder?: (path: string) => void;
}

export const DEFAULT_PATH = DocumentDirectoryPath;

export default function FileSystem({
  path = DEFAULT_PATH,
  onPressFile = () => {},
  onPressFolder = () => {},
}: FileSystemProps) {
  const theme = useTheme();
  const [pathType, setPathType] = useState<'file' | 'folder' | 'unknown'>(
    'unknown',
  );
  useEffect(() => {
    stat(path)
      .then(stats => {
        if (stats.isFile()) {
          setPathType('file');
        } else if (stats.isDirectory()) {
          setPathType('folder');
        } else {
          setPathType('unknown');
        }
      })
      .catch(error => console.error(error));
  }, [path]);
  return (
    <>
      <Text style={{ color: theme.colors.primary }}>{path}</Text>
      {pathType === 'folder' && (
        <FolderBrowser
          path={path}
          onPressFile={onPressFile}
          onPressFolder={onPressFolder}
        />
      )}
      {pathType === 'file' && <FileViewer path={path} />}
    </>
  );
}

function FolderBrowser({
  path = DEFAULT_PATH,
  onPressFile = () => {},
  onPressFolder = () => {},
}: FileSystemProps) {
  const [entries, setEntries] = useState<ReadDirResItemT[]>([]);
  const theme = useTheme();
  useEffect(() => {
    readDir(path)
      .then(entries => entries.sort((a, b) => a.name.localeCompare(b.name)))
      .then(setEntries)
      .catch(console.error);
  }, [path]);
  return (
    <>
      <List.Section>
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <List.Item
              key={item.path}
              title={item.name}
              titleNumberOfLines={0}
              left={props => (
                <List.Icon
                  {...props}
                  icon={item.isDirectory() ? 'folder' : 'file'}
                />
              )}
              right={props => (
                <IconButton
                  iconColor={theme.colors.error}
                  icon="trash-can"
                  onPress={() => {
                    (async () => {
                      try {
                        await unlink(item.path);
                        setEntries(
                          entries.filter(entry => entry.path !== item.path),
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    })();
                  }}
                />
              )}
              onPress={() => {
                if (item.isFile()) {
                  onPressFile(item.path);
                } else {
                  onPressFolder(item.path);
                }
              }}
            />
          )}
          keyExtractor={item => item.path}
        />
      </List.Section>
    </>
  );
}

interface FileViewerProps {
  path: string;
}

function FileViewer({ path }: FileViewerProps) {
  const [contents, setContents] = useState<string | undefined>('undefined');
  const [contentsTime, setContentsTime] = useState<number | undefined>(
    undefined,
  );
  const [md5Hash, setMd5Hash] = useState<string | undefined>(undefined);
  const [md5HashTime, setMd5HashTime] = useState<number | undefined>(undefined);
  const [sha1Hash, setSha1Hash] = useState<string | undefined>(undefined);
  const [sha1HashTime, setSha1HashTime] = useState<number | undefined>(
    undefined,
  );
  const [sha256Hash, setSha256Hash] = useState<string | undefined>(undefined);
  const [sha256HashTime, setSha256HashTime] = useState<number | undefined>(
    undefined,
  );
  const [sha512Hash, setSha512Hash] = useState<string | undefined>(undefined);
  const [sha512HashTime, setSha512HashTime] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    const timer = new Timer();
    timer.start();
    readFile(path)
      .then(contents => {
        setContentsTime(timer.elapsedMilliseconds());
        return contents;
      })
      .then(setContents)
      .catch(console.error);
  }, [path]);
  useEffect(() => {
    const timer = new Timer();
    timer.start();
    hash(path, 'md5')
      .then(hash => {
        setMd5HashTime(timer.elapsedMilliseconds());
        return hash;
      })
      .then(setMd5Hash)
      .catch(console.error);
  }, [path]);
  useEffect(() => {
    const timer = new Timer();
    timer.start();
    hash(path, 'sha1')
      .then(hash => {
        setSha1HashTime(timer.elapsedMilliseconds());
        return hash;
      })
      .then(setSha1Hash)
      .catch(console.error);
  }, [path]);
  useEffect(() => {
    const timer = new Timer();
    timer.start();
    hash(path, 'sha256')
      .then(hash => {
        setSha256HashTime(timer.elapsedMilliseconds());
        return hash;
      })
      .then(setSha256Hash)
      .catch(console.error);
  }, [path]);
  useEffect(() => {
    const timer = new Timer();
    timer.start();
    hash(path, 'sha512')
      .then(setSha512Hash)
      .then(() => {
        setSha512HashTime(timer.elapsedMilliseconds());
      })
      .catch(console.error);
  }, [path]);

  return (
    <ScrollView>
      {contents === undefined ? (
        <ActivityIndicator />
      ) : (
        <>
          <List.Section>
            <List.Subheader>Hashes</List.Subheader>
            <List.Item
              title={`MD5 (${md5HashTime}ms)`}
              description={md5Hash}
              onPress={() => setMd5Hash(undefined)}
            />
            <List.Item
              title={`SHA1 (${sha1HashTime}ms)`}
              description={sha1Hash}
              onPress={() => setSha1Hash(undefined)}
            />
            <List.Item
              title={`SHA256 (${sha256HashTime}ms)`}
              description={sha256Hash}
              onPress={() => setSha256Hash(undefined)}
            />
            <List.Item
              title={`SHA512 (${sha512HashTime}ms)`}
              description={sha512Hash}
              onPress={() => setSha512Hash(undefined)}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>Contents</List.Subheader>
            <List.Item
              title={`Loaded in ${contentsTime}ms`}
              description={contents}
              descriptionNumberOfLines={0}
              onPress={() => setContents(undefined)}
            />
          </List.Section>
        </>
      )}
    </ScrollView>
  );
}
