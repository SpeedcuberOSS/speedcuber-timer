import { expect } from "../../test/chai-workarounds";

import { Alg, Move } from "../alg";
import { KPuzzle } from "../kpuzzle";
import { PGPuzzles } from "./PGPuzzles";
import { getPuzzleGeometryByDesc, PGNotation } from "./PuzzleGeometry";
/**
 *   Test basic things about puzzles created by puzzle
 *   geometry.  We check stickers per face, face count
 *   (and thus total stickers), move count, orbit
 *   count, and cubie count.
 */
const expectedData: { [nam: string]: string } = {
  "2x2x2": "2x2x2, 6, 4, 8, 1, 6, 12",
  "3x3x3": "3x3x3, 6, 9, 26, 3, 9, 120",
  "4x4x4": "4x4x4, 6, 16, 56, 3, 12, 420",
  "5x5x5": "5x5x5, 6, 25, 98, 6, 15, 840",
  "6x6x6": "6x6x6, 6, 36, 152, 7, 18, 420",
  "7x7x7": "7x7x7, 6, 49, 218, 11, 21, 840",
  "8x8x8": "8x8x8, 6, 64, 296, 13, 24, 420",
  "9x9x9": "9x9x9, 6, 81, 386, 18, 27, 840",
  "10x10x10": "10x10x10, 6, 100, 488, 21, 30, 420",
  "11x11x11": "11x11x11, 6, 121, 602, 27, 33, 840",
  "12x12x12": "12x12x12, 6, 144, 728, 31, 36, 420",
  "13x13x13": "13x13x13, 6, 169, 866, 38, 39, 840",
  "20x20x20": "20x20x20, 6, 400, 2168, 91, 60, 420",
  "30x30x30": "30x30x30, 6, 900, 5048, 211, 90, 420",
  "40x40x40": "40x40x40, 6, 1600, 9128, 381, 120, 420",
  skewb: "skewb, 6, 5, 14, 3, 8, 9",
  "master skewb": "master skewb, 6, 13, 50, 6, 12, 2520",
  "professor skewb": "professor skewb, 6, 25, 110, 11, 16, 360",
  "compy cube": "compy cube, 6, 9, 26, 4, 12, 42",
  helicopter: "helicopter, 6, 8, 32, 2, 18, 18",
  "curvy copter": "curvy copter, 6, 13, 50, 4, 18, 18",
  dino: "dino, 6, 4, 12, 1, 12, 7",
  "little chop": "little chop, 6, 4, 24, 1, 12, 5",
  pyramorphix: "pyramorphix, 4, 4, 8, 2, 6, 1",
  mastermorphix: "mastermorphix, 4, 10, 26, 8, 9, 2",
  pyraminx: "pyraminx, 4, 9, 14, 3, 12, 9",
  tetraminx: "tetraminx, 4, 6, 10, 2, 8, 30",
  "master pyraminx": "master pyraminx, 4, 16, 30, 5, 16, 99",
  "master tetraminx": "master tetraminx, 4, 13, 26, 4, 12, 33",
  "professor pyraminx": "professor pyraminx, 4, 25, 54, 7, 20, 198",
  "professor tetraminx": "professor tetraminx, 4, 22, 50, 6, 16, 264",
  "Jing pyraminx": "Jing pyraminx, 4, 7, 14, 3, 8, 30",
  "master pyramorphix": "master pyramorphix, 4, 10, 26, 8, 9, 2",
  megaminx: "megaminx, 12, 11, 62, 3, 18, 702",
  gigaminx: "gigaminx, 12, 31, 242, 6, 30, 18181800",
  teraminx: "teraminx, 12, 61, 542, 11, 42, 18181800",
  petaminx: "petaminx, 12, 101, 962, 18, 54, 18181800",
  examinx: "examinx, 12, 151, 1502, 27, 66, 18181800",
  zetaminx: "zetaminx, 12, 211, 2162, 38, 78, 18181800",
  yottaminx: "yottaminx, 12, 281, 2942, 51, 90, 18181800",
  pentultimate: "pentultimate, 12, 6, 32, 2, 12, 132",
  "master pentultimate": "master pentultimate, 12, 16, 122, 4, 18, 1741740",
  "elite pentultimate": "elite pentultimate, 12, 31, 272, 6, 24, 6832980",
  starminx: "starminx, 12, 11, 62, 3, 30, 660",
  "starminx 2": "starminx 2, 12, 11, 102, 3, 18, 158340",
  "pyraminx crystal": "pyraminx crystal, 12, 10, 50, 2, 18, 9828",
  chopasaurus: "chopasaurus, 12, 11, 92, 3, 20, 63954",
  "big chop": "big chop, 12, 10, 120, 2, 30, 24633",
  "skewb diamond": "skewb diamond, 8, 4, 14, 3, 8, 6",
  FTO: "FTO, 8, 9, 42, 4, 12, 990",
  "master FTO": "master FTO, 8, 16, 86, 9, 16, 330",
  "Christopher's jewel": "Christopher's jewel, 8, 6, 18, 2, 9, 24",
  octastar: "octastar, 8, 6, 24, 1, 12, 117",
  "Trajber's octahedron": "Trajber's octahedron, 8, 7, 26, 3, 9, 120",
  "radio chop": "radio chop, 20, 10, 92, 3, 20, 41580",
  icosamate: "icosamate, 20, 4, 32, 2, 12, 720",
  "icosahedron 2": "icosahedron 2, 20, 9, 102, 3, 18, 432630",
  "icosahedron 3": "icosahedron 3, 20, 18, 360, 6, 48, 1615854240",
  "icosahedron static faces": "icosahedron static faces, 20, 7, 62, 3, 18, 180",
  "icosahedron moving faces": "icosahedron moving faces, 20, 7, 62, 3, 18, 180",
  "Eitan's star": "Eitan's star, 20, 13, 152, 4, 30, 384560",
  "2x2x2 + dino": "2x2x2 + dino, 6, 8, 24, 1, 18, 70",
  "2x2x2 + little chop": "2x2x2 + little chop, 6, 8, 48, 2, 18, 168",
  "dino + little chop": "dino + little chop, 6, 4, 24, 1, 24, 280",
  "2x2x2 + dino + little chop":
    "2x2x2 + dino + little chop, 6, 8, 48, 2, 30, 2340",
  "megaminx + chopasaurus": "megaminx + chopasaurus, 12, 11, 92, 3, 38, 13860",
  "starminx combo": "starminx combo, 12, 11, 102, 3, 48, 2520",
};
describe("PuzzleGeometry-Puzzles", () => {
  for (const [name, desc] of Object.entries(PGPuzzles)) {
    it(`testpuzzles ${name}`, () => {
      const pg = getPuzzleGeometryByDesc(desc, {});
      const kpuzzleDefinition = pg.getKPuzzleDefinition(false);
      const sep = ", ";
      const seq = Object.getOwnPropertyNames(kpuzzleDefinition.moves)
        .sort()
        .join(" ");
      let algo = Alg.fromString(seq);
      // TODO:  likely a temporary hack until we resolve how notations are
      // added or set in puzzle geometry.
      const bms = [];
      for (const move of algo.childAlgNodes()) {
        bms.push(pg.notationMapper.notationToExternal(move as Move) as Move);
      }
      // console.log(algo.toString(), bms);
      algo = new Alg(bms);
      const o = new KPuzzle(kpuzzleDefinition, {
        experimentalPGNotation: new PGNotation(pg, pg.getOrbitsDef(true)),
      })
        .algToTransformation(algo)
        .repetitionOrder();
      const dat = [
        name,
        sep,
        pg.baseplanerot.length,
        sep,
        pg.stickersperface,
        sep,
        pg.cubies.length,
        sep,
        Object.getOwnPropertyNames(kpuzzleDefinition.orbits).length,
        sep,
        Object.getOwnPropertyNames(kpuzzleDefinition.moves).length,
        sep,
        o,
      ].join("");
      const exp = expectedData[name];
      expect(dat).to.equal(exp);
    });
  }
});
