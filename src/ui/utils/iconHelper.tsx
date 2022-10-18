// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

interface IconParams {
  size: number;
  color?: string;
}

export type IconFunction = (params: IconParams) => JSX.Element;

export default class Icons {
  private static render(Icon: any, name: string) {
    return ({ size, color }: IconParams) => (
      <Icon name={name} size={size} color={color} />
    );
  }
  static Entypo(name: string) {
    return this.render(EntypoIcon, name);
  }
  static AntDesign(name: string) {
    return this.render(AntDesignIcon, name);
  }
  static EvilIcons(name: string) {
    return this.render(EvilIconsIcon, name);
  }
  static FontAwesome(name: string) {
    return this.render(FontAwesomeIcon, name);
  }
  static FontAwesome5(name: string) {
    return this.render(FontAwesome5Icon, name);
  }
  static Fontisto(name: string) {
    return this.render(FontistoIcon, name);
  }
  static Foundation(name: string) {
    return this.render(FoundationIcon, name);
  }
  static Ionicons(name: string) {
    return this.render(IoniconsIcon, name);
  }
  static MaterialIcons(name: string) {
    return this.render(MaterialIconsIcon, name);
  }
  static MaterialCommunityIcons(name: string) {
    return this.render(MaterialCommunityIconsIcon, name);
  }
  static Octicons(name: string) {
    return this.render(OcticonsIcon, name);
  }
  static Zocial(name: string) {
    return this.render(ZocialIcon, name);
  }
  static SimpleLineIcons(name: string) {
    return this.render(SimpleLineIconsIcon, name);
  }
}
