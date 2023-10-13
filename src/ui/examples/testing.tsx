// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DevelopmentExampleSet } from './types';
import { PaperProvider } from 'react-native-paper';
import { getCurrentTheme } from '../themes';
import renderer from 'react-test-renderer';

export function snapshots(set: DevelopmentExampleSet) {
  describe(set.title, () => {
    set.examples.forEach(example => {
      it(`[${example.title}] matches snapshot`, () => {
        const Example = example.component;
        const ReadyToSnapshot =
          typeof Example === 'function' ? <Example /> : Example;
        let tree = renderer
          .create(
            <PaperProvider theme={getCurrentTheme()}>
              {ReadyToSnapshot}
            </PaperProvider>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
}
