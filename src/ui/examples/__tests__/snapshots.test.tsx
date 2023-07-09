// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import renderer from 'react-test-renderer';
import Examples from '../examples';
import { getCurrentTheme } from '../../themes';
import { PaperProvider } from 'react-native-paper';
import i18n from '../../../localization';

describe('Examples', () => {
  Examples.setKeys().forEach(setKey => {
    describe(`${setKey}'s`, () => {
      const set = Examples.setByKey(setKey);
      set.examples.forEach(example => {
        it(`${example.key} matches snapshot`, () => {
          let tree = renderer
            .create(
              <PaperProvider theme={getCurrentTheme()}>
                {example.component}
              </PaperProvider>,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
});
