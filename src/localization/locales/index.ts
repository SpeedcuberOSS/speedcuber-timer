// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export default {
  // `translation` is the default namespace for i18n.
  // https://www.i18next.com/principles/fallback#namespace-fallback
  //
  // Other namesspaces can be defined in separate files and imported
  // here, then accessed by the `t` function using the {ns: 'namespace'}
  // option or as `useTranslation('namespace')`.
  en: { translation: require('./en.json') },
  es: { translation: require('./es.json') },
};
