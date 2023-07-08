// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { View } from 'react-native';

type Wrapper = ({ children }: { children: React.ReactNode }) => JSX.Element;

function Identity({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
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

const wrappers: Wrapper[] = [Identity, Centered];

export { wrappers, Identity, Centered };
