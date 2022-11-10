// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BluetoothPuzzle, ConnectionStatus } from '../../lib/bluetooth-puzzle';
import React, { useRef } from 'react';

import { WebView } from 'react-native-webview';

interface TwistyPlayerProps {
  bluetoothPuzzle?: BluetoothPuzzle;
}

export default function TwistyPlayer({ bluetoothPuzzle }: TwistyPlayerProps) {
  const webViewRef = useRef<WebView>({} as WebView);
  const [width, height, scale] = [384, 256, 2];
  function sendMove(move: string) {
    const js = `
      document.getElementById("next-move").innerHTML = "${move}"
      document.getElementById("next-move").click()
      true;
    `;
    console.debug(`Sending move ${move} to twisty player`);
    webViewRef.current.injectJavaScript(js);
  }
  const reactToMoves = (p: BluetoothPuzzle) => {
    p.addMoveListener(move => {
      let moveStr = parseMove(move);
      sendMove(moveStr);
    }, 'TwistyPlayer');
  };
  if (bluetoothPuzzle?.connectionStatus() === ConnectionStatus.CONNECTED) {
    reactToMoves(bluetoothPuzzle);
  } else {
    bluetoothPuzzle?.addConnectionStatusListener(status => {
      if (status === ConnectionStatus.CONNECTED) {
        reactToMoves(bluetoothPuzzle);
      }
    });
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

function parseMove(move: string) {
  const { face, direction } = JSON.parse(move);
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
