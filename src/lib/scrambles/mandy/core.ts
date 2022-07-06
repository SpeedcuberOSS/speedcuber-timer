// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  ScrambleProvider,
  Scramble,
  ScrambleBuilder,
  Puzzle,
  AlgorithmBuilder,
} from '../../stif';

let SCRAMBLE_PROVIDER_INFO: ScrambleProvider = {
  id: 'org.speedcuber.scramblerproviders.mandy',
  url: 'https://scrambleproviders.speedcuber.org/mandy',
};

interface Face {
  label: string;
  opposite: string;
}

class Move {
  face: Face;
  rotation: string;
  depth: number;
  constructor(face: Face, rotation: string, depth: number) {
    this.face = face;
    this.rotation = rotation;
    this.depth = depth;
  }

  toString() {
    return `${this.depth > 2 ? this.depth : ''}${this.face.label}${
      this.depth > 1 ? 'w' : ''
    }${this.rotation}`;
  }
}

class Cube {
  getPuzzle(): Puzzle {
    throw 'Not Implemented';
  }
  getScrambleLength(): number {
    throw 'Not Implemented';
  }

  getFaces(): Face[] {
    throw 'Not Implemented';
  }

  getRotations(): string[] {
    throw 'Not Implemented';
  }

  getDepths(): number[] {
    throw 'Not Implemented';
  }
}

class Scrambler {
  cube: Cube;
  constructor(cube: Cube) {
    this.cube = cube;
  }

  generateScramble(): Scramble {
    let length = this.cube.getScrambleLength();
    let moveset = this.__getMoveset();
    let scramble: Move[] = [];
    for (let index = 0; index < length; index++) {
      scramble.push(this.__getNextMove(scramble, moveset));
    }
    return new ScrambleBuilder()
      .setProvider(SCRAMBLE_PROVIDER_INFO)
      .setPuzzle(this.cube.getPuzzle())
      .setAlgorithm(
        new AlgorithmBuilder()
          .setMoves(scramble.map(move => move.toString()))
          .build(),
      )
      .build();
  }

  __getMoveset(): Move[] {
    let faces = this.cube.getFaces();
    let rotations = this.cube.getRotations();
    let depths = this.cube.getDepths();
    let moveset: Move[] = [];
    faces.forEach(face => {
      rotations.forEach(rotation => {
        depths.forEach(depth => {
          moveset.push(new Move(face, rotation, depth));
        });
      });
    });
    return moveset;
  }

  __getNextMove(scramble: Move[], moveset: Move[]) {
    let lastMove = scramble[scramble.length - 1];
    if (lastMove) {
      let moves = moveset
        .filter(move => move.face.label !== lastMove.face.label)
        .filter(move => move.face.label !== lastMove.face.opposite);
      let index = Math.floor(Math.random() * moves.length);
      return moves[index];
    } else {
      let index = Math.floor(Math.random() * moveset.length);
      return moveset[index];
    }
  }
}

class NbyN extends Cube {
  n: number;
  constructor(n: number) {
    super();
    this.n = n;
  }

  getScrambleLength() {
    return Math.max(12, 20 * (this.n - 2));
  }

  getFaces(): Face[] {
    let labels = ['U', 'D', 'R', 'L', 'F', 'B'];
    let faces = [];
    for (let index = 0; index < labels.length; index++) {
      const label = labels[index];
      const opposite = labels[index + (index % 2 === 0 ? 1 : -1)];
      faces.push({
        label: label,
        opposite: opposite,
      });
    }
    return faces;
  }

  getRotations() {
    return ['', "'", '2'];
  }

  getDepths() {
    let depths = [];
    for (let index = 1; index <= Math.floor(this.n / 2); index++) {
      depths.push(index);
    }
    return depths;
  }
}

export { Scrambler, NbyN };
