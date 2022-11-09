// Copyright (c) 2022 Joseph Hale <me@jhale.dev>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import { WebView } from 'react-native-webview';

export default function LearnScreen() {
  return (
    <WebView
      originWhitelist={['*']}
      style={{ flex: 1 }}
      source={{
        html: `
        <script src="https://cdn.cubing.net/js/cubing/twisty" type="module"></script>
        <twisty-player alg="R U R' U''"></twisty-player>
      `,
      }}
    />
  );
}
