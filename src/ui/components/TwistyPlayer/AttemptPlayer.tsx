// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AlgorithmBuilder, Attempt } from '../../../lib/stif';
import React, { useEffect, useRef, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';

import PlayerControls from './PlayerControls';
import TwistyPlayer from './TwistyPlayer';
import { View } from 'react-native';
import { getSolveReplay } from '../../../lib/bluetooth-puzzle/getSolveReplay';

interface AttemptPlayerProps {
  attempt: Attempt;
}

export default function AttemptPlayer({ attempt }: AttemptPlayerProps) {
  const theme = useTheme();
  const twistyPlayerRef = useRef({});
  const [elapsed, setElapsed] = useState(0);

  const scrambleAlg = attempt.solutions[0].scramble.algorithm;
  const solveReplay = getSolveReplay(attempt);
  const solutionMoves = solveReplay
    .filter(v => v.t < elapsed)
    .sort((a, b) => a.t - b.t)
    .map(v => v.m);

  useEffect(() => {
    const twistyAlg = new AlgorithmBuilder()
      .setMoves([...scrambleAlg.moves, ...solutionMoves])
      .build();
    // @ts-ignore
    twistyPlayerRef.current.setAlgorithm(twistyAlg);
  }, [elapsed]);

  return (
    <View style={{ flex: 1 }}>
      <TwistyPlayer
        ref={twistyPlayerRef}
        // @ts-ignore
        puzzle={attempt.event.puzzle}
        algorithm={scrambleAlg}
        backgroundColor={theme.colors.background}
      />
      <PlayerControls duration={attempt.duration} onSeek={setElapsed} />
      <Text>{solutionMoves.join(' ')}</Text>
    </View>
  );
}
