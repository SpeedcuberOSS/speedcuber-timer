// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react';

import EntypoIcon from '@react-native-vector-icons/entypo';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome';
import IoniconsIcon from '@react-native-vector-icons/ionicons';
import MaterialCommunityIconsIcon from '@react-native-vector-icons/material-design-icons';
import MaterialIconsIcon from '@react-native-vector-icons/material-icons';
import { STIFIcon } from './STIFIcons';

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
  FontAwesome: (name: string) => render(FontAwesomeIcon, name),
  Ionicons: (name: string) => render(IoniconsIcon, name),
  MaterialIcons: (name: string) => render(MaterialIconsIcon, name),
  MaterialCommunityIcons: (name: string) =>
    render(MaterialCommunityIconsIcon, name),
};

const STIFIcons = {
  STIF: (name: string) => render(STIFIcon, name),
};

export default {
  ...ReactNativeVectorIcons,
  ...STIFIcons
};
