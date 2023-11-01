// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  EVENT_3x3x3,
  EVENT_RELAY_234,
  EVENT_RELAY_2345,
  EVENT_RELAY_23456,
  EVENT_RELAY_234567,
  PUZZLE_2x2x2,
  PUZZLE_3x3x3,
  PUZZLE_4x4x4,
  PUZZLE_5x5x5,
  PUZZLE_6x6x6,
  PUZZLE_7x7x7,
  SIGNED_BEFORE_STARTING,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_WRONG_HAND_PLACEMENT,
} from '../builtins';

import { STIF } from '../STIF';

export const ATTEMPT_3x3x3_BASIC: STIF.Attempt = {
  id: 'b9e74e18-cdb0-4a26-9d27-a9d611546741',
  event: EVENT_3x3x3,
  inspectionStart: 1693848712000,
  timerStart: 1693848721234,
  timerStop: 1693848732782,
  comment: '',
  infractions: [],
  solutions: [
    {
      id: 'afba4d94-c69c-48cb-ab74-f49e5387c771',
      puzzle: PUZZLE_3x3x3,
      scramble: "R U R' U' R' F R2 U' R' U' R U R' F'".split(' '),
      reconstruction: [],
    },
  ],
};

export const ATTEMPT_3x3x3_LONG_COMMENT: STIF.Attempt = {
  ...ATTEMPT_3x3x3_BASIC,
  id: 'a8f3a66a-d155-4c1a-8232-efbe1b5646de',
  comment: `Ex occaecat nostrud aliqua anim consectetur amet labore consequat. Cupidatat enim dolor anim occaecat minim ut ea consectetur et ullamco ad. Ex anim nisi officia tempor in ea culpa mollit minim qui. Anim culpa aliquip velit enim sunt ut sit aliquip in qui id Lorem. Pariatur nostrud qui dolor quis voluptate sunt anim laborum occaecat pariatur cillum. Est aliquip labore pariatur aute.

  Cupidatat officia aute elit sunt dolore sunt anim tempor enim. Ad in in reprehenderit amet eu exercitation amet ullamco excepteur Lorem. Qui reprehenderit quis aliqua ut sint elit ea. Minim non magna ullamco fugiat sunt et esse incididunt veniam ea exercitation aliquip esse incididunt. Ut mollit consectetur aliqua pariatur. Aliquip officia ut commodo commodo eiusmod labore cillum in quis nisi culpa laborum. Dolore voluptate excepteur reprehenderit incididunt pariatur.
  
  Esse do velit aute est aute anim ipsum aliquip consequat velit minim. Cillum cupidatat aute quis incididunt laboris duis fugiat sint sunt est. Ad esse qui qui duis consectetur non dolor duis. Laboris non deserunt minim duis pariatur culpa magna aute. Cillum consequat ad adipisicing in sint culpa consequat in non dolore.`,
};

export const ATTEMPT_3x3x3_DNF: STIF.Attempt = {
  ...ATTEMPT_3x3x3_BASIC,
  id: 'c88fcaa3-7eba-4c01-b570-30c63fbfbc50',
  infractions: [STOPPED_PUZZLE_UNSOLVED],
};

export const ATTEMPT_3x3x3_DNS: STIF.Attempt = {
  ...ATTEMPT_3x3x3_BASIC,
  id: 'a8400a0f-b2ef-42cd-aa82-f1f90944d691',
  infractions: [SIGNED_BEFORE_STARTING],
};

export const ATTEMPT_3x3x3_PLUS_2: STIF.Attempt = {
  ...ATTEMPT_3x3x3_BASIC,
  id: '78b44dc2-e5a9-4b13-ad1d-8f86dcef1c48',
  infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING],
};

export const ATTEMPT_3x3x3_PLUS_4: STIF.Attempt = {
  ...ATTEMPT_3x3x3_BASIC,
  id: 'e62ae089-5d74-4ba8-b63b-747101ab9c1a',
  infractions: [STOPPED_PUZZLE_ONE_MOVE_REMAINING, STOPPED_WRONG_HAND_PLACEMENT],
};

export const ATTEMPT_3x3x3_RECONSTRUCTED: STIF.Attempt = {
  id: '6d2a9eaf-2f1e-4797-879b-a525142cf8fc',
  inspectionStart: 1675142895723,
  timerStart: 1675142907090,
  timerStop: 1675142918923,
  event: EVENT_3x3x3,
  solutions: [
    {
      id: '552d6a5e-b58d-4f0e-ae68-8a2b77d7596a',
      puzzle: PUZZLE_3x3x3,
      scramble: [
        'L2',
        'B',
        'L2',
        "D'",
        'F2',
        'D',
        "B'",
        'R',
        "D'",
        'F2',
        'R',
        'B2',
        'U',
        'R2',
        "D'",
        "B'",
        'L2',
        'F',
        'U',
        'B',
      ],
      reconstruction: [
        {
          label: 'cross',
          moves: [
            { m: "B'", t: 298 },
            { m: 'L', t: 409 },
            { m: 'B', t: 617 },
            { m: "D'", t: 779 },
            { m: "U'", t: 1050 },
          ],
        },
        {
          label: '1st pair',
          moves: [
            { m: "B'", t: 1651 },
            { m: 'D', t: 1745 },
            { m: 'B', t: 2015 },
          ],
        },
        {
          label: '2nd pair',
          moves: [
            { m: "F'", t: 2669 },
            { m: 'D', t: 2772 },
            { m: 'D', t: 2931 },
            { m: 'F', t: 3000 },
            { m: 'D', t: 3179 },
            { m: "F'", t: 3301 },
            { m: "D'", t: 3417 },
            { m: 'F', t: 3576 },
          ],
        },
        {
          label: '3rd pair',
          moves: [
            { m: "D'", t: 3931 },
            { m: 'B', t: 4027 },
            { m: "D'", t: 4292 },
            { m: "D'", t: 4394 },
            { m: "B'", t: 4509 },
            { m: 'D', t: 4587 },
            { m: 'D', t: 4680 },
            { m: 'B', t: 4833 },
            { m: "D'", t: 4977 },
            { m: 'B', t: 5235 },
            { m: "B'", t: 5309 },
            { m: "B'", t: 5397 },
          ],
        },
        {
          label: '4th pair',
          moves: [
            { m: 'F', t: 5646 },
            { m: "D'", t: 5698 },
            { m: "F'", t: 5848 },
            { m: 'D', t: 5910 },
            { m: "R'", t: 6719 },
            { m: "D'", t: 6864 },
            { m: "D'", t: 6901 },
            { m: 'R', t: 7018 },
            { m: 'D', t: 7137 },
            { m: "R'", t: 7172 },
            { m: "D'", t: 7259 },
            { m: "D'", t: 7381 },
            { m: 'R', t: 7437 },
          ],
        },
        {
          label: 'OLLCP',
          moves: [
            { m: "D'", t: 8010 },
            { m: "D'", t: 8324 },
            { m: 'B', t: 8591 },
            { m: 'R', t: 8703 },
            { m: 'D', t: 8787 },
            { m: "R'", t: 8823 },
            { m: "D'", t: 8910 },
            { m: 'R', t: 9027 },
            { m: 'D', t: 9087 },
            { m: "R'", t: 9157 },
            { m: "D'", t: 9207 },
            { m: "B'", t: 9327 },
          ],
        },
        {
          label: 'EPLL',
          moves: [
            { m: "D'", t: 9960 },
            { m: "D'", t: 10114 },
            { m: "R'", t: 10259 },
            { m: 'D', t: 10319 },
            { m: "R'", t: 10365 },
            { m: "D'", t: 10482 },
            { m: "R'", t: 10648 },
            { m: "D'", t: 10678 },
            { m: "R'", t: 10767 },
            { m: 'D', t: 10860 },
            { m: 'R', t: 11038 },
            { m: 'D', t: 11127 },
            { m: 'R', t: 11355 },
            { m: 'R', t: 11428 },
          ],
        },
        {
          label: 'AUF',
          moves: [
            { m: "D'", t: 11496 },
            { m: "D'", t: 11653 },
          ],
        },
      ],
    },
  ],
  infractions: [],
  comment: 'What a solve!',
};

export const ATTEMPT_RELAY_234: STIF.Attempt = {
  id: 'b9e74e18-cdb0-4a26-9d27-a9d611546741',
  event: EVENT_RELAY_234,
  inspectionStart: 1693848712000,
  timerStart: 1693848721234,
  timerStop: 1693848732782,
  comment: '',
  infractions: [],
  solutions: [
    {
      id: 'afba4d94-c69c-48cb-ab74-f49e5387c770',
      puzzle: PUZZLE_2x2x2,
      scramble: "R2 F' R' U R' F' R U' R U2 R'".split(' '),
      reconstruction: [],
    },
    {
      id: 'afba4d94-c69c-48cb-ab74-f49e5387c771',
      puzzle: PUZZLE_3x3x3,
      scramble: "F D2 F2 D2 L2 U2 F L2 D2 B2 D2 L' B' R2 D L U L D' L U".split(' '),
      reconstruction: [],
    },
    {
      id: 'afba4d94-c69c-48cb-ab74-f49e5387c772',
      puzzle: PUZZLE_4x4x4,
      scramble: "B R2 B2 F' R2 U2 F2 R2 D2 F2 R B U B2 D B F D B' U' Uw2 Fw2 L B R2 Uw2 F' U2 L F2 R Uw2 L2 Uw' Fw2 U2 F R Fw' U L Uw Fw' D2 U B2".split(' '),
      reconstruction: [],
    },
  ],
};

export const ATTEMPT_RELAY_2345: STIF.Attempt = {
  id: 'e87757c8-92ac-4214-8437-ab7d5123598b',
  event: EVENT_RELAY_2345,
  inspectionStart: 1693848712000,
  timerStart: 1693848721234,
  timerStop: 1693848735782,
  comment: '',
  infractions: [],
  solutions: [
    {
      id: '971b0158-df39-4a64-94d0-875fcfb70827',
      puzzle: PUZZLE_2x2x2,
      scramble: "R2 F' R' U R' F' R U' R U2 R'".split(' '),
      reconstruction: [],
    },
    {
      id: 'b4cd5d52-9a35-4e0a-a19e-8f059e9b3025',
      puzzle: PUZZLE_3x3x3,
      scramble: "F D2 F2 D2 L2 U2 F L2 D2 B2 D2 L' B' R2 D L U L D' L U".split(' '),
      reconstruction: [],
    },
    {
      id: '84655768-d928-4933-83f3-acadf35cfa19',
      puzzle: PUZZLE_4x4x4,
      scramble: "B R2 B2 F' R2 U2 F2 R2 D2 F2 R B U B2 D B F D B' U' Uw2 Fw2 L B R2 Uw2 F' U2 L F2 R Uw2 L2 Uw' Fw2 U2 F R Fw' U L Uw Fw' D2 U B2".split(' '),
      reconstruction: [],
    },
    {
      id: 'f959a6ea-36ed-4932-92e1-efe16a73a74b',
      puzzle: PUZZLE_5x5x5,
      scramble: "B' Rw' Lw Uw Rw F' L' U Lw' D' L2 D Lw2 Rw R B' F' Dw Uw Fw2 Lw2 Fw' Lw' F U R U2 Bw' R Fw D' Dw U Fw2 Lw2 L' R2 Fw' B' F R F2 L2 Uw Fw Dw2 Fw2 L2 F' Dw2 Fw Bw B' Rw' Dw2 D Fw' D Dw' Lw'".split(' '),
      reconstruction: [],
    },
  ],
};

export const ATTEMPT_RELAY_23456: STIF.Attempt = {
  id: 'a1f23c76-2553-4018-adbc-b10757da43f9',
  event: EVENT_RELAY_23456,
  inspectionStart: 1693848712000,
  timerStart: 1693848721234,
  timerStop: 1693848735782,
  comment: '',
  infractions: [],
  solutions: [
    {
      id: 'ca892767-159a-442d-bbcc-2c16c16fbefb',
      puzzle: PUZZLE_2x2x2,
      scramble: "R2 F' R' U R' F' R U' R U2 R'".split(' '),
      reconstruction: [],
    },
    {
      id: '8397cf5a-68a4-4c40-9120-9896cfb42aa4',
      puzzle: PUZZLE_3x3x3,
      scramble: "F D2 F2 D2 L2 U2 F L2 D2 B2 D2 L' B' R2 D L U L D' L U".split(' '),
      reconstruction: [],
    },
    {
      id: '4d6a4fc0-bb38-49f4-a23b-af45072e384f',
      puzzle: PUZZLE_4x4x4,
      scramble: "B R2 B2 F' R2 U2 F2 R2 D2 F2 R B U B2 D B F D B' U' Uw2 Fw2 L B R2 Uw2 F' U2 L F2 R Uw2 L2 Uw' Fw2 U2 F R Fw' U L Uw Fw' D2 U B2".split(' '),
      reconstruction: [],
    },
    {
      id: 'e6cec1a4-32bb-4014-932d-db2f150f7520',
      puzzle: PUZZLE_5x5x5,
      scramble: "B' Rw' Lw Uw Rw F' L' U Lw' D' L2 D Lw2 Rw R B' F' Dw Uw Fw2 Lw2 Fw' Lw' F U R U2 Bw' R Fw D' Dw U Fw2 Lw2 L' R2 Fw' B' F R F2 L2 Uw Fw Dw2 Fw2 L2 F' Dw2 Fw Bw B' Rw' Dw2 D Fw' D Dw' Lw'".split(' '),
      reconstruction: [],
    },
    {
      id: 'd5154806-e001-4565-9667-4dde1c42e95c',
      puzzle: PUZZLE_6x6x6,
      scramble: "Dw' 3Uw' F 3Uw' 3Rw2 Lw F' 3Uw Bw 3Uw' Lw Fw Rw 3Rw' B' 3Rw Rw Fw' B 3Uw U 3Fw' U' R Dw' F' Bw' R D R2 Dw' Fw Lw F2 Fw2 Rw Lw2 L' 3Rw2 F' Rw' Uw R2 U Dw Fw' 3Fw2 R Uw' L' U' F' Rw' Uw Rw' B 3Fw2 3Uw Dw' B L Dw' Fw B' F' L 3Rw2 Uw' Fw2 Dw2 D' Bw B Dw2 Uw2 D' 3Uw Bw' Rw' B'".split(' '),
      reconstruction: [],
    },
  ],
};

export const ATTEMPT_RELAY_234567: STIF.Attempt = {
  id: '5e89efce-559e-47bf-b845-30d9fc723988',
  event: EVENT_RELAY_234567,
  inspectionStart: 1693848712000,
  timerStart: 1693848721234,
  timerStop: 1693848735782,
  comment: '',
  infractions: [],
  solutions: [
    {
      id: '00a38600-0d14-4773-a4ff-523ce1407d0e',
      puzzle: PUZZLE_2x2x2,
      scramble: "R2 F' R' U R' F' R U' R U2 R'".split(' '),
      reconstruction: [],
    },
    {
      id: 'b4845ca5-8138-4035-8c0b-56a693d1ab84',
      puzzle: PUZZLE_3x3x3,
      scramble: "F D2 F2 D2 L2 U2 F L2 D2 B2 D2 L' B' R2 D L U L D' L U".split(' '),
      reconstruction: [],
    },
    {
      id: '0ba076cc-fdd8-4cfe-89ae-50c9a0982d55',
      puzzle: PUZZLE_4x4x4,
      scramble: "B R2 B2 F' R2 U2 F2 R2 D2 F2 R B U B2 D B F D B' U' Uw2 Fw2 L B R2 Uw2 F' U2 L F2 R Uw2 L2 Uw' Fw2 U2 F R Fw' U L Uw Fw' D2 U B2".split(' '),
      reconstruction: [],
    },
    {
      id: '16de4446-88dc-46b4-bd3a-e5cb98a5c995',
      puzzle: PUZZLE_5x5x5,
      scramble: "B' Rw' Lw Uw Rw F' L' U Lw' D' L2 D Lw2 Rw R B' F' Dw Uw Fw2 Lw2 Fw' Lw' F U R U2 Bw' R Fw D' Dw U Fw2 Lw2 L' R2 Fw' B' F R F2 L2 Uw Fw Dw2 Fw2 L2 F' Dw2 Fw Bw B' Rw' Dw2 D Fw' D Dw' Lw'".split(' '),
      reconstruction: [],
    },
    {
      id: '6bce63e9-4a13-45e0-82d8-16a4c6d624e9',
      puzzle: PUZZLE_6x6x6,
      scramble: "Dw' 3Uw' F 3Uw' 3Rw2 Lw F' 3Uw Bw 3Uw' Lw Fw Rw 3Rw' B' 3Rw Rw Fw' B 3Uw U 3Fw' U' R Dw' F' Bw' R D R2 Dw' Fw Lw F2 Fw2 Rw Lw2 L' 3Rw2 F' Rw' Uw R2 U Dw Fw' 3Fw2 R Uw' L' U' F' Rw' Uw Rw' B 3Fw2 3Uw Dw' B L Dw' Fw B' F' L 3Rw2 Uw' Fw2 Dw2 D' Bw B Dw2 Uw2 D' 3Uw Bw' Rw' B'".split(' '),
      reconstruction: [],
    },
    {
      id: '39a0fb4c-1c00-45de-a93b-695d8d43184d',
      puzzle: PUZZLE_7x7x7,
      scramble: "3Rw2 3Lw2 3Dw2 Fw R' Rw2 U' Bw' 3Fw U2 B2 Bw U Fw2 3Rw D2 3Lw 3Bw D F 3Lw2 Rw' Dw D2 B Fw2 3Fw 3Lw' Dw' Bw F 3Lw 3Uw2 3Lw' U2 3Fw2 3Dw2 3Rw2 Fw L' Fw Lw Rw L2 D' R2 U2 Lw2 R B2 3Bw U2 B 3Dw' D Uw B Uw U Rw 3Lw2 D 3Fw' L2 Dw' 3Fw 3Uw2 D2 B2 3Uw Bw 3Lw2 Bw' Rw2 3Fw 3Dw2 3Lw' Uw U 3Rw Dw2 3Uw2 Uw2 Fw' Rw' 3Fw2 Uw2 D2 3Rw2 Bw2 Dw D' Fw' Lw' 3Fw D' Rw L2 B U'".split(' '),
      reconstruction: [],
    },
  ],
};