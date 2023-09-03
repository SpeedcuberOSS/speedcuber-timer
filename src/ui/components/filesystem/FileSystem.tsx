// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect, useState } from 'react';
import { FlatList, Platform, ScrollView } from 'react-native';
import {
  DocumentDirectoryPath,
  ExternalDirectoryPath,
  ReadDirItem,
  readDir,
  readFile,
  stat,
} from 'react-native-fs';
import { ActivityIndicator, List, Text, useTheme } from 'react-native-paper';

interface FileSystemProps {
  path?: string;
  onPressFile?: (path: string) => void;
  onPressFolder?: (path: string) => void;
}

export const DEFAULT_PATH = Platform.select({
  ios: DocumentDirectoryPath,
  android: ExternalDirectoryPath,
}) as string;

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
  useEffect(() => {
    readDir(path)
      .then(entries => setEntries(entries))
      .catch(console.error);
  }, [path]);
  return (
    <>
      <List.Section>
        {entries.map(e => (
          <List.Item
            key={e.path}
            title={e.name}
            left={props => <List.Icon {...props} icon={e.isDirectory() ? "folder" : "file"} />}
            onPress={() => {
              if (e.isFile()) {
                onPressFile(e.path);
              } else {
                onPressFolder(e.path);
              }
            }}
          />
        ))}
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
