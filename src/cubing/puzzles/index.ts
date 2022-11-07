export { eventInfo, wcaEventInfo, wcaEvents, twizzleEvents } from "./events";
export type { PuzzleLoader };
export { cube2x2x2, cube3x3x3 };

import { CubePGPuzzleLoader, PGPuzzleLoader } from "./async/async-pg3d";
import { cube2x2x2 } from "./implementations/2x2x2";
import { cube3x3x3 } from "./implementations/3x3x3";
import { clock } from "./implementations/clock";
import { fto } from "./implementations/fto";
import { megaminx } from "./implementations/megaminx";
import { pyraminx } from "./implementations/pyraminx";
import { square1 } from "./implementations/square1";
import { kilominx } from "./implementations/kilominx";
import type { PuzzleLoader } from "./PuzzleLoader";
import { rediCube } from "./implementations/redi-cube";
import { cube4x4x4 } from "./implementations/4x4x4";
import { melindas2x2x2x2 } from "./implementations/melindas2x2x2x2";

/** @category All Puzzles */
export const puzzles: Record<string, PuzzleLoader> = {
  /******** Start of WCA Puzzles *******/
  "3x3x3": cube3x3x3,
  "2x2x2": cube2x2x2,
  "4x4x4": cube4x4x4,
  "5x5x5": new CubePGPuzzleLoader({ id: "5x5x5", fullName: "5×5×5 Cube" }),
  "6x6x6": new CubePGPuzzleLoader({ id: "6x6x6", fullName: "6×6×6 Cube" }),
  "7x7x7": new CubePGPuzzleLoader({ id: "7x7x7", fullName: "7×7×7 Cube" }),
  "40x40x40": new CubePGPuzzleLoader({
    id: "40x40x40",
    fullName: "40×40×40 Cube",
  }),
  // 3x3x3 Blindfolded
  // 3x3x3 Fewest Moves
  // 3x3x3 One-Handed
  clock,
  megaminx: megaminx,
  pyraminx,
  skewb: new PGPuzzleLoader({
    id: "skewb",
    fullName: "Skewb",
    inventedBy: ["Tony Durham"], // https://www.jaapsch.net/puzzles/skewb.htm
    // inventionYear: 1982, // 1982 is actually the year of Hofstadter's column.
  }),
  square1,
  // 4x4x4 Blindfolded
  // 5x5x5 Blindfolded
  /******** End of WCA puzzles ********/
  fto: fto,
  gigaminx: new PGPuzzleLoader({
    id: "gigaminx",
    fullName: "Gigaminx",
    inventedBy: ["Tyler Fox"],
    inventionYear: 2006, // Earliest date from https://www.twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1475
  }),
  master_tetraminx: new PGPuzzleLoader({
    pgID: "master tetraminx",
    id: "master_tetraminx",
    fullName: "Master Tetraminx",
    inventedBy: ["Katsuhiko Okamoto"], // Using master pyraminx: https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1352
    inventionYear: 2002, // Using master pyraminx: https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1352
  }),
  kilominx,
  redi_cube: rediCube,
  melindas2x2x2x2,
};
