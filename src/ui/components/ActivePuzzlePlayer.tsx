// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import TwistyPlayer from './TwistyPlayer';
import { useCompetitiveEvent } from '../hooks/useCompetitiveEvent';
import { useTheme } from 'react-native-paper';

export default function ActivePuzzlePlayer() {
  const [event] = useCompetitiveEvent();
  const theme = useTheme();
  return (
    <TwistyPlayer
      puzzle={Array.isArray(event.puzzle) ? event.puzzle[0] : event.puzzle}
      backgroundColor={theme.colors.background}
    />
  );
}
