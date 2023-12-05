// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Text, useTheme } from "react-native-paper";

import Icons from '../../icons/iconHelper';
import { ScrambleHeaderProps } from "./Scramble";
import { View } from "react-native";

export default function ScrambleHeader({
  puzzle,
  smartPuzzle,
  positioning,
}: ScrambleHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingBottom: 8,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        gap: 8,
      }}>
      {puzzle &&
        Icons.STIF(`event-${puzzle}`)({
          size: 12,
          color: theme.colors.onBackground,
        })}
      {positioning && (
        <Text
          style={{
            textAlignVertical: 'center',
          }}>{`#${positioning[0]}/${positioning[1]}`}</Text>
      )}
      {smartPuzzle && (
        <>
          {Icons.MaterialCommunityIcons('bluetooth-connect')({
            size: 16,
            color: theme.colors.onBackground,
          })}
          <Text style={{ textAlignVertical: 'center' }}>
            {smartPuzzle.name}
          </Text>
        </>
      )}
    </View>
  );
}