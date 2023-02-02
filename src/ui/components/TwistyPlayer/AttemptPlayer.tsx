// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AlgorithmBuilder, Attempt } from '../../../lib/stif';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  SolveReplay,
  getSolveReplay,
} from '../../../lib/bluetooth-puzzle/getSolveReplay';

import PlayerControls from './PlayerControls';
import Reconstruction from './Reconstruction';
import TwistyPlayer from './TwistyPlayer';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface AttemptPlayerProps {
  attempt: Attempt;
}

function reducer(
  state: { old: number; current: number },
  action: { type: string; elapsed: number },
) {
  switch (action.type) {
    case 'setElapsed':
      return { old: state.current, current: action.elapsed };
    default:
      return state;
  }
}

export default function AttemptPlayer({ attempt }: AttemptPlayerProps) {
  const theme = useTheme();
  const twistyPlayerRef = useRef({});
  const [elapsed, dispatchElapsed] = useReducer(reducer, {
    old: 0,
    current: 0,
  });
  const setElapsed = useCallback((elapsed: number) => {
    dispatchElapsed({ type: 'setElapsed', elapsed });
  }, []);
  const [scrambleAlg] = useState(attempt.solutions[0].scramble.algorithm);
  const [solveReplay, setSolveReplay] = useState<SolveReplay>([]);
  useEffect(() => {
    setSolveReplay(getSolveReplay(attempt));
  }, [attempt]);

  useEffect(() => {
    const didMoveBackward = elapsed.old > elapsed.current;
    const movesForward = solveReplay.filter(
      v => elapsed.old < v.t && v.t <= elapsed.current,
    );
    if (movesForward.length == 1) {
      const move = movesForward[0].m;
      // @ts-ignore
      twistyPlayerRef.current.addMove(move);
    } else if (movesForward.length > 1 || didMoveBackward) {
      const solutionMoves = solveReplay
        .filter(v => v.t < elapsed.current)
        .map(v => v.m);
      const twistyAlg = new AlgorithmBuilder()
        .setMoves([...scrambleAlg.moves, ...solutionMoves])
        .build();
      // @ts-ignore
      twistyPlayerRef.current.setAlgorithm(twistyAlg);
    }
  }, [elapsed]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <TwistyPlayer
          ref={twistyPlayerRef}
          // @ts-ignore
          puzzle={attempt.event.puzzle}
          setupAlg={scrambleAlg}
          hintFacelets={'floating'}
          backgroundColor={theme.colors.background}
        />
      </View>
      <View style={{ flex: 3 }}>
        <Reconstruction
          scrambleAlg={scrambleAlg}
          solveReplay={solveReplay}
          atTimestamp={elapsed.current}
        />
      </View>
      <PlayerControls duration={attempt.duration} onSeek={setElapsed} />
    </View>
  );
}
