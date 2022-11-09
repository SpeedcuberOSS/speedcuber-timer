// Copyright (c) 2022 Joseph Hale <me@jhale.dev>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, ConnectionStatus } from '../../lib/bluetooth-puzzle';
import React, { useRef } from 'react';

import { WebView } from 'react-native-webview';
import useSmartPuzzles from '../utils/bluetooth/useSmartPuzzles';

export default function LearnScreen() {
  const { puzzles } = useSmartPuzzles();
  console.log('Learn: ' + puzzles.length);
  const webViewRef = useRef({});
  const width = 384;
  const height = 256;
  const scale = 2;
  const reactToMoves = (cube: BluetoothPuzzle) => {
    cube.addMoveListener(move => {
      const { face, direction } = JSON.parse(move);
      let moveStr = '';
      moveStr += face === 'White' ? 'U' : '';
      moveStr += face === 'Yellow' ? 'D' : '';
      moveStr += face === 'Red' ? 'R' : '';
      moveStr += face === 'Orange' ? 'L' : '';
      moveStr += face === 'Green' ? 'F' : '';
      moveStr += face === 'Blue' ? 'B' : '';
      moveStr += direction === 'clockwise' ? '' : "'";
      sendMove(moveStr);
    }, 'LearnScreen');
  };
  puzzles.forEach(cube => {
    if (cube.connectionStatus() === ConnectionStatus.CONNECTED) {
      console.log("Reacting to cube's moves:" + cube.name());
      reactToMoves(cube);
    } else {
      cube.addConnectionStatusListener(status => {
        console.log('Watching connection status:' + cube.name());
        if (status === ConnectionStatus.CONNECTED) {
          console.log("Reacting to cube's moves:" + cube.name());
          reactToMoves(cube);
        }
      });
    }
  });

  function sendMove(move: string) {
    const js = `
      document.getElementById("next-move").innerHTML = "${move}"
      document.getElementById("next-move").click()
      true;
    `;
    console.log(js);
    webViewRef.current.injectJavaScript(js);
  }
  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      style={{ flex: 1 }}
      source={{
        html: `
        <script type="module">
          import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
          import { Move } from "https://cdn.cubing.net/js/cubing/alg";

          const player = new TwistyPlayer({
            puzzle: "3x3x3",
            alg: "",
            hintFacelets: "none",
            backView: "none",
            background: "none",
            controlPanel: "none",
          });
          player.style = "width: ${width * scale}; height: ${height * scale};"
          document.body.appendChild(player);
          document.player = player
          document.getElementById("next-move").addEventListener("click", () => {
            var move = document.getElementById("next-move").innerHTML
            player.experimentalAddAlgLeaf(new Move(move));
          })
        </script>

        <body
          style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: black">
          <button hidden id="next-move">U</button>
        </body>
      `,
      }}
    />
  );
}
