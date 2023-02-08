// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AlgorithmBuilder, Attempt } from '../../../lib/stif';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import {
  SolveReplay,
  compressDoubleTurns,
  getSolveReplay,
} from '../../../lib/bluetooth-puzzle/getSolveReplay';

import PlayerControls from '../PlayerControls';
import Reconstruction from '../reconstructions/Reconstruction';
import TPSChart from '../charts/TPSChart';
import TwistyPlayer from './TwistyPlayer';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export interface AttemptPlayerProps {
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
  const [scramble] = useState(attempt.solutions[0].scramble);
  const [solveReplay, setSolveReplay] = useState<SolveReplay>([]);
  useEffect(() => {
    setSolveReplay(compressDoubleTurns(getSolveReplay(attempt)));
  }, [attempt]);

  useEffect(() => {
    const didMoveBackward = elapsed.old >= elapsed.current;
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
        .setMoves([...scramble.algorithm.moves, ...solutionMoves])
        .build();
      // @ts-ignore
      twistyPlayerRef.current.setAlgorithm(twistyAlg);
    }
  }, [elapsed]);

  const [value, setValue] = useState('reconstruction');
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <TwistyPlayer
          ref={twistyPlayerRef}
          // @ts-ignore
          puzzle={attempt.event.puzzle}
          setupAlg={scramble.algorithm}
          hintFacelets={'floating'}
          backgroundColor={theme.colors.background}
        />
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="high"
        style={{ paddingHorizontal: 20 }}
        buttons={[
          {
            label: t('reconstruction.reconstruction'),
            value: 'reconstruction',
          },
          { label: t('analytics.tps'), value: 'tps' },
        ]}
      />
      <View style={{ flex: 3 }}>
        {value == 'tps' ? (
          <TPSChart
            solveReplay={solveReplay}
            duration={attempt.duration}
            atTimestamp={elapsed.current}
          />
        ) : null}
        {value == 'reconstruction' ? (
          <Reconstruction
            scramble={scramble}
            solveReplay={solveReplay}
            duration={attempt.duration}
            atTimestamp={elapsed.current}
          />
        ) : null}
      </View>
      <PlayerControls duration={attempt.duration} onSeek={setElapsed} />
    </View>
  );
}
