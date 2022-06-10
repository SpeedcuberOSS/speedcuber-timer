// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import 'intl-pluralrules';
import locales from './locales';

const userLanguage = getLocales()[0].languageCode;
const fallbacklanguage = 'en';

i18n.use(initReactI18next).init({
  fallbackLng: fallbacklanguage,
  lng: userLanguage,
  resources: locales,
});

export default i18n;
