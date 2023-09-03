// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useEffect } from 'react';
import FileSystem, { DEFAULT_PATH } from './FileSystem';
import { FileSystemStackScreenProps } from './FileSystemStackNavigator';
type Props = FileSystemStackScreenProps<'FileSystem'>;

export default function FileSystemScreen({ route, navigation }: Props) {
  const path = route?.params?.path ?? DEFAULT_PATH;
  useEffect(() => {
    navigation.setOptions({
      title: path.split('/').pop(),
    });

  }, [path, navigation])
  return (
    <FileSystem
      path={path}
      onPressFile={p => navigation.push('FileSystem', { path: p })}
      onPressFolder={p => navigation.push('FileSystem', { path: p })}
    />
  );
}
