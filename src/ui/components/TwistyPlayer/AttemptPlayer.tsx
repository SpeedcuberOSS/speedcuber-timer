// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AlgorithmBuilder,
  Attempt,
  MESSAGE_STREAM_TEMPLATE,
  MessageStream,
  SmartPuzzle,
} from '../../../lib/stif';
import { IconButton, Text, useTheme } from 'react-native-paper';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Slider from '@react-native-community/slider';
import TwistyPlayer from './TwistyPlayer';
import { parseMessage } from '../../../lib/bluetooth-puzzle/RubiksConnected';

interface AttemptPlayerProps {
  attempt: Attempt;
}

const FRAME_RATE = 60;
const INTERVAL = 1000 / FRAME_RATE;

export default function AttemptPlayer({ attempt }: AttemptPlayerProps) {
  const theme = useTheme();
  const twistyPlayerRef = useRef({});
  const [sliderValue, setSliderValue] = useState(0);
  const [playing, setPlaying] = useState<Date | null>(null);
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        const elapsedMillies = new Date().getTime() - playing.getTime();
        if (elapsedMillies >= attempt.duration) {
          setPlaying(null);
        }
        setSliderValue(elapsedMillies);
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [playing, sliderValue]);

  const scrambleAlg = attempt.solutions[0].scramble.algorithm;
  const solveReplay = getSolveReplay(attempt);
  const solutionMoves = solveReplay
    .filter(v => v.t < sliderValue)
    .sort((a, b) => a.t - b.t)
    .map(v => v.m);

  useEffect(() => {
    const twistyAlg = new AlgorithmBuilder()
      .setMoves([...scrambleAlg.moves, ...solutionMoves])
      .build();
    // @ts-ignore
    twistyPlayerRef.current.setAlgorithm(twistyAlg);
  }, [sliderValue]);

  function togglePlaying() {
    if (playing) {
      setPlaying(null);
    } else if (sliderValue >= attempt.duration) {
      setSliderValue(0);
      setPlaying(new Date());
    } else {
      startPlayingFromTimestamp(sliderValue);
    }
  }

  function startPlayingFromTimestamp(timestamp: number) {
    setSliderValue(timestamp);
    setPlaying(new Date(new Date().getTime() - timestamp));
  }

  return (
    <View style={{ flex: 1 }}>
      <TwistyPlayer
        ref={twistyPlayerRef}
        // @ts-ignore
        puzzle={attempt.event.puzzle}
        algorithm={scrambleAlg}
        backgroundColor={theme.colors.background}
      />
      <Slider
        maximumValue={attempt.duration}
        value={sliderValue}
        onValueChange={value => startPlayingFromTimestamp(value)}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.onBackground}
      />
      <View style={styles.playerControls}>
        <IconButton icon={playing ? 'stop' : 'play'} onPress={togglePlaying} />
      </View>
      <Text>{solutionMoves.join(' ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type SolveReplay = { t: number; m: string }[];

export function getSolveReplay(attempt: Attempt): SolveReplay {
  const messageStream = getMessageStream(attempt);
  const timestampedMoves = parseMoves(messageStream);
  const solveReplay = adjustTimestampsRelativeToInspectionComplete(
    timestampedMoves,
    attempt.inspectionCompleteTimestamp ?? 0,
  );
  return solveReplay;
}

export function getMessageStream(attempt: Attempt): MessageStream {
  const messageStreamExtensions = attempt.extensions?.filter(
    ext => ext.id === MESSAGE_STREAM_TEMPLATE.id,
  );
  const messageStream = messageStreamExtensions?.[0] as MessageStream;
  return messageStream ?? MESSAGE_STREAM_TEMPLATE;
}

export function parseMoves(messageStream: MessageStream) {
  const parser = getMessageParserForSmartPuzzle(messageStream.data.smartPuzzle);
  const moves = messageStream.data.stream.map(({ t, m }) => {
    const message = parser(m);
    return {
      t,
      m: convertParticulaRotationMessageToAlgMove(message),
    };
  });
  return moves;
}

function convertParticulaRotationMessageToAlgMove(message: any) {
  const { face, direction } = message;
  let moveStr = '';
  moveStr += face === 'White' ? 'U' : '';
  moveStr += face === 'Yellow' ? 'D' : '';
  moveStr += face === 'Red' ? 'R' : '';
  moveStr += face === 'Orange' ? 'L' : '';
  moveStr += face === 'Green' ? 'F' : '';
  moveStr += face === 'Blue' ? 'B' : '';
  moveStr += direction === 'clockwise' ? '' : "'";
  return moveStr;
}

function getMessageParserForSmartPuzzle(smartPuzzle: SmartPuzzle) {
  // TODO return different parsers based on smartPuzzle type.
  return parseMessage;
}

export function adjustTimestampsRelativeToInspectionComplete(
  timestampedMoves: { t: number; m: string }[],
  inspectionCompleteTimestamp: number,
) {
  return timestampedMoves.map(({ t, m }) => ({
    t: t - inspectionCompleteTimestamp,
    m,
  }));
}
