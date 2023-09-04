// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../STIF';
import {
  EVENT_3x3x3,
  PUZZLE_3x3x3,
  SIGNED_BEFORE_STARTING,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_WRONG_HAND_PLACEMENT,
} from '../builtins';

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
