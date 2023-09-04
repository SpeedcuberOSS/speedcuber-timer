// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import {
  DocumentDirectoryPath,
  ReadDirItem,
  readDir,
  readFile,
  stat,
  unlink,
} from 'react-native-fs';
import {
  ActivityIndicator,
  IconButton,
  List,
  Text,
  useTheme,
} from 'react-native-paper';

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
  const [entries, setEntries] = useState<ReadDirItem[]>([]);
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
  const [contents, setContents] = useState<string | undefined>(undefined);
  useEffect(() => {
    readFile(path).then(setContents).catch(console.error);
  }, [path]);
  return (
    <ScrollView>
      {contents === undefined ? <ActivityIndicator /> : <Text>{contents}</Text>}
    </ScrollView>
  );
}
