// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Wrapper = ({ children }: { children: React.ReactNode }) => JSX.Element;

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      {children}
    </View>
  );
}

function RaisedCard({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
        padding: 10,
        backgroundColor: theme.colors.background,
        borderRadius: 12,
        // iOS
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 12,
        // Android
        elevation: 10
      }}>
      {children}
    </View>
  );
}

const wrappers: Wrapper[] = [Centered, RaisedCard];

export { wrappers, Centered };
