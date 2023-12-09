// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { GeneratedScramble } from "../components/scrambles/types";
import { STIF } from "../../lib/stif";
import { getScrambler } from "../../lib/scrambles/mandy";
import { useEffect } from "react";
import { useGlobalState } from "./useGlobalState";

/**
 * Generates scrambles for the given `event` every time the `key` changes.
 */
export function useScrambles(event: STIF.CompetitiveEvent, key: string) {
  const [scrambles, setScrambles] = useGlobalState("scrambles");
  useEffect(() => {
    const newScrambles = event.puzzles.map(
      puzzle =>
        ({
          puzzle,
          algorithm: getScrambler(puzzle).generateScramble(),
        } as GeneratedScramble),
    );
    newScrambles.forEach((newScramble, idx) => {
      if (newScramble.puzzle === scrambles[idx]?.puzzle) {
        newScramble.smartPuzzle = scrambles[idx]?.smartPuzzle;
      }
    });
    setScrambles(newScrambles);
  }, [key]);
  return scrambles;
}