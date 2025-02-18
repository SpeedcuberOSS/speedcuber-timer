// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ColorValue, View } from 'react-native';
import {
  PUZZLE_3x3x3,
  PUZZLE_CLOCK,
  PUZZLE_MEGAMINX,
  PUZZLE_PYRAMINX,
  PUZZLE_SKEWB,
  PUZZLE_SQUARE_1,
} from '../../../lib/stif/builtins';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { STIF } from '../../../lib/stif';
import { WebView } from '@dr.pogodin/react-native-webview';

interface TwistyPlayerProps {
  algorithm?: STIF.Algorithm;
  puzzle?: STIF.Puzzle;
  visualization?: '3D' | '2D';
  hintFacelets?: 'floating';
  backView?: 'top-right' | 'side-by-side';
  backgroundColor?: ColorValue;
}

const TwistyPlayer = forwardRef(
  (
    {
      algorithm = undefined,
      puzzle = PUZZLE_3x3x3,
      visualization = '3D',
      hintFacelets = undefined,
      backView = undefined,
      backgroundColor = 'black',
    }: TwistyPlayerProps,
    ref,
  ) => {
    const webViewRef = useRef<WebView>({} as WebView);
    useImperativeHandle(ref, () => ({
      setAlgorithm: (alg: STIF.Algorithm) => {
        const moves = alg.join(' ');
        const js = `window.app.setAlgorithm("${moves}"); true;`;
        console.debug(js);
        if (webViewRef.current.injectJavaScript)
          webViewRef.current.injectJavaScript(js);
      },
      addMove: (move: string) => {
        const js = `window.app.addMove(${JSON.stringify(move)}); true;`;
        console.debug(js);
        if (webViewRef.current.injectJavaScript)
          webViewRef.current.injectJavaScript(js);
      },
    }));
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <WebView
          ref={webViewRef}
          style={{ flex: 1, backgroundColor: 'transparent' }}
          scrollEnabled={false}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          source={{ uri: 'https://twisty-player.speedcuber.org' }}
          onMessage={e => console.log("[TwistyPlayer-Webview]", e.nativeEvent)}
          injectedJavaScript={`
            window.app.setTwistyPlayer({
              algorithm: "${algorithm?.join(' ') || ''}",
              puzzle: "${stifPuzzle_To_TwistyPlayerString(puzzle)}",
              visualization: "${visualization}",
              hintFacelets: "${hintFacelets ? hintFacelets : 'none'}",
              backView: "${backView ? backView : 'none'}",
              backgroundColor: "${String(backgroundColor)}",
            });
            true;
          `}/>
      </View>
    )
  }
)

export default TwistyPlayer;

function stifPuzzle_To_TwistyPlayerString(puzzle: STIF.Puzzle): string {
  if (parseInt(puzzle)) {
    return puzzle.split('').join('x');
  }
  switch (puzzle) {
    case PUZZLE_CLOCK:
      return 'clock';
    case PUZZLE_MEGAMINX:
      return 'megaminx';
    case PUZZLE_PYRAMINX:
      return 'pyraminx';
    case PUZZLE_SKEWB:
      return 'skewb';
    case PUZZLE_SQUARE_1:
      return 'square1';
    default:
      return '3x3x3';
  }
}
