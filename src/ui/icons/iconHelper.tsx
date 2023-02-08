// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { WCAEvent, WCAEventUnofficial, WCAInfraction } from './wca';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import * as React from 'react';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

interface IconParams {
  size: number;
  color?: string;
}

export type IconFunction = (params: IconParams) => React.ReactNode;

const _ICON_CACHE: { [key: string]: IconFunction } = {};

function render(Icon: any, name: string) {
  const key = `${Icon.name}-${name}`;
  if (!_ICON_CACHE[key]) {
    _ICON_CACHE[key] = ({ size, color }: IconParams) => (
      <Icon name={name} size={size} color={color} />
    );
  }
  return _ICON_CACHE[key];
}

const ReactNativeVectorIcons = {
  Entypo: (name: string) => render(EntypoIcon, name),
  AntDesign: (name: string) => render(AntDesignIcon, name),
  EvilIcons: (name: string) => render(EvilIconsIcon, name),
  FontAwesome: (name: string) => render(FontAwesomeIcon, name),
  FontAwesome5: (name: string) => render(FontAwesome5Icon, name),
  Fontisto: (name: string) => render(FontistoIcon, name),
  Foundation: (name: string) => render(FoundationIcon, name),
  Ionicons: (name: string) => render(IoniconsIcon, name),
  MaterialIcons: (name: string) => render(MaterialIconsIcon, name),
  MaterialCommunityIcons: (name: string) =>
    render(MaterialCommunityIconsIcon, name),
  Octicons: (name: string) => render(OcticonsIcon, name),
  Zocial: (name: string) => render(ZocialIcon, name),
  SimpleLineIcons: (name: string) => render(SimpleLineIconsIcon, name),
};

const WCAIcons = {
  WCAEvent: (name: string) => render(WCAEvent, name),
  WCAEventUnofficial: (name: string) => render(WCAEventUnofficial, name),
  WCAInfraction: (name: string) => render(WCAInfraction, name),
};

export default {
  ...ReactNativeVectorIcons,
  ...WCAIcons,
};
