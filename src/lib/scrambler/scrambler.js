// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

class Scrambler {
  constructor(puzzle) {
    this.puzzle = puzzle;
  }

  generateScramble() {
    let length = this.puzzle.getScrambleLength();
    let moveset = this.__getMoveset();
    let scramble = [];
    for (let index = 0; index < length; index++) {
      scramble.push(this.__getNextMove(scramble, moveset));
    }
    return scramble;
  }

  __getMoveset() {
    let faces = this.puzzle.getFaces();
    let rotations = this.puzzle.getRotations();
    let depths = this.puzzle.getDepths();
    let moveset = [];
    faces.forEach(face => {
      rotations.forEach(rotation => {
        depths.forEach(depth => {
          moveset.push(new Move(face, rotation, depth));
        });
      });
    });
    return moveset;
  }

  __getNextMove(scramble, moveset) {
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

class Puzzle {
  getScrambleLength() {
    throw 'Not Implemented';
  }

  getFaces() {
    throw 'Not Implemented';
  }

  getRotations() {
    throw 'Not Implemented';
  }

  getDepths() {
    throw 'Not Implemented';
  }
}

class Move {
  constructor(face, rotation, depth) {
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

class NbyN extends Puzzle {
  constructor(n) {
    super();
    this.n = n;
  }

  getScrambleLength() {
    return Math.max(12, 20 * (this.n - 2));
  }

  getFaces() {
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
