// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  PUZZLE_3x3x3,
  PUZZLE_CLOCK,
  PUZZLE_MEGAMINX,
  PUZZLE_PYRAMINX,
  PUZZLE_SKEWB,
  PUZZLE_SQUARE_1,
} from '../../../lib/stif/builtins';
import { STIF } from '../../../lib/stif';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { ColorValue } from 'react-native';
import { WebView } from 'react-native-webview';

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
    const [width, height, scale] = [384, 256, 2];
    function sendMove(move: string) {
      const js = `
        addMoveButton = document.getElementById("add-move")
        if (addMoveButton) {
          addMoveButton.innerHTML = "${move}"
          addMoveButton.click()
        }
        true;
      `;
      console.debug(`Sending move ${move} to twisty player`);
      if (webViewRef.current.injectJavaScript)
        webViewRef.current.injectJavaScript(js);
    }
    useImperativeHandle(ref, () => ({
      setAlgorithm: (alg: STIF.Algorithm) => {
        const moves = alg.join(' ');
        console.debug('Setting alg:', moves);
        const js = `
          setAlgButton = document.getElementById("set-algorithm")
          if (setAlgButton) {
            setAlgButton.innerHTML = "${moves}"
            setAlgButton.click()
          }
          true;
        `;
        if (webViewRef.current.injectJavaScript)
          webViewRef.current.injectJavaScript(js);
      },
      addMove: (move: string) => {
        console.debug('Adding move:', move);
        const js = `
          addMoveButton = document.getElementById("add-move")
          if (addMoveButton) {
            addMoveButton.innerHTML = "${move}"
            addMoveButton.click()
          }
          true;
        `;
        if (webViewRef.current.injectJavaScript)
          webViewRef.current.injectJavaScript(js);
      },
    }));

    return (
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        scrollEnabled={false}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        source={{
          html: `
            <script type="module">
              import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
              import { Move } from "https://cdn.cubing.net/js/cubing/alg";

              const player = new TwistyPlayer({
                puzzle: "${stifPuzzle_To_TwistyPlayerString(puzzle)}",
                visualization: "${visualization}",
                hintFacelets: "${hintFacelets ? hintFacelets : 'none'}",
                backView: "${backView ? backView : 'none'}",
                background: "none",
                controlPanel: "none",
              });
              player.style = "width: ${width * scale}; height: ${
            height * scale
          };"
              player.alg = "${algorithm?.join(' ') || ''}",
              document.body.appendChild(player);
              document.getElementById("add-move").addEventListener("click", () => {
                var move = document.getElementById("add-move").innerHTML
                player.experimentalAddAlgLeaf(new Move(move));
              })
              document.getElementById("set-algorithm").addEventListener("click", () => {
                var alg = document.getElementById("set-algorithm").innerHTML
                player.alg = alg;
              })
            </script>

            <body
              style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: ${String(
                backgroundColor,
              )}">
              <button hidden id="add-move">U</button>
              <button hidden id="set-algorithm"></button>
            </body>
          `,
        }}
      />
    );
  },
);

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
