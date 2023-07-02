// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF } from '../STIF';

/**
 * All possible infractions specified in the Official WCA Regulations.
 */
// Article A1 - Time Limits
const TIMELIMIT_EXCEEDED: STIF.Infraction = Object.freeze({
  id: 'A1a4',
  penalty: 'DNF',
});

// Article A3 - Inspection
const INSPECTION_STARTED_LATE_ONE_MINUTE: STIF.Infraction = Object.freeze({
  id: 'A3b1',
  penalty: 'DNS',
});
const INSPECTION_APPLIED_MOVES: STIF.Infraction = Object.freeze({
  id: 'A3c1',
  penalty: 'DNF',
});
const STARTED_PUZZLE_PLACED_OUTSIDE_MAT: STIF.Infraction = Object.freeze({
  id: 'A3d',
  penalty: '+2',
});

// Article A4 - Starting the solve
const STARTED_WRONG_HAND_PLACEMENT: STIF.Infraction = Object.freeze({
  id: 'A4b',
  penalty: '+2',
});
const STARTED_WHILE_TOUCHING_PUZZLE: STIF.Infraction = Object.freeze({
  id: 'A4b1',
  penalty: '+2',
});
const INSPECTION_EXCEEDED_15_SECONDS: STIF.Infraction = Object.freeze({
  id: 'A4d1',
  penalty: '+2',
});
const INSPECTION_EXCEEDED_17_SECONDS: STIF.Infraction = Object.freeze({
  id: 'A4d2',
  penalty: 'DNF',
});

// Article A5 - During the solve
const UNAUTHORIZED_COMMUNICATION: STIF.Infraction = Object.freeze({
  id: 'A5a',
  penalty: 'DNF',
});
const UNAUTHORIZED_ASSISTANCE: STIF.Infraction = Object.freeze({
  id: 'A5b',
  penalty: 'DNF',
});

// Article A6 - Stopping the solve
const STOPPED_PUZZLE_ONE_MOVE_REMAINING: STIF.Infraction = Object.freeze({
  id: '10e3',
  penalty: '+2',
});
const STOPPED_PUZZLE_UNSOLVED: STIF.Infraction = Object.freeze({
  id: '10e4',
  penalty: 'DNF',
});
const STOPPED_PUZZLE_HELD: STIF.Infraction = Object.freeze({
  id: 'A6c',
  penalty: 'DNF',
});
const STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE: STIF.Infraction = Object.freeze({
  id: 'A6c-override',
  penalty: '+2',
});
const STOPPED_WRONG_HAND_PLACEMENT: STIF.Infraction = Object.freeze({
  id: 'A6d',
  penalty: '+2',
});
const STOPPED_APPLIED_MOVES: STIF.Infraction = Object.freeze({
  id: 'A6e1',
  penalty: 'DNF',
});
const STOPPED_TOUCHED_PUZZLE: STIF.Infraction = Object.freeze({
  id: 'A6e2',
  penalty: '+2',
});
const STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE: STIF.Infraction = Object.freeze({
  id: 'A6e2-override',
  penalty: '',
});
const RESET_TIMER_BEFORE_SIGNATURES: STIF.Infraction = Object.freeze({
  id: 'A6f',
  penalty: 'DNF',
});
const RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE: STIF.Infraction = Object.freeze({
  id: 'A6f-override',
  penalty: '',
});
const RESET_TIMER_BEFORE_RESULT_RECORDED: STIF.Infraction = Object.freeze({
  id: 'A6f1',
  penalty: 'DNF',
});

// Article A7 - Recording results
const SIGNED_BEFORE_STARTING: STIF.Infraction = Object.freeze({
  id: 'A7c2',
  penalty: 'DNS',
});
const SIGNED_BEFORE_JUDGE: STIF.Infraction = Object.freeze({
  id: 'A7c3',
  penalty: 'DNF',
});
const SIGNATURE_MISSING: STIF.Infraction = Object.freeze({
  id: 'A7c4',
  penalty: 'DNF',
});

// Article B - Blindfolded Solving
// TODO Add BLD penalties

// Article C - One-Handed Solving
// TODO Add penaltiex

// Article E - Fewest Moves Solving
// TODO

// Article F - Clock Solving
// TODO

// Article H - Multi-Blind Solving
// TODO

const PreSolveInfractions: STIF.Infraction[] = [
  INSPECTION_STARTED_LATE_ONE_MINUTE,
  INSPECTION_APPLIED_MOVES,
  STARTED_PUZZLE_PLACED_OUTSIDE_MAT,
  STARTED_WRONG_HAND_PLACEMENT,
  STARTED_WHILE_TOUCHING_PUZZLE,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
];

const PostSolveInfractions: STIF.Infraction[] = [
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_PUZZLE_HELD,
  STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE,
  STOPPED_WRONG_HAND_PLACEMENT,
  STOPPED_APPLIED_MOVES,
  STOPPED_TOUCHED_PUZZLE,
  STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE,
  RESET_TIMER_BEFORE_SIGNATURES,
  RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE,
  RESET_TIMER_BEFORE_RESULT_RECORDED,
];

export {
  PreSolveInfractions,
  PostSolveInfractions,
  TIMELIMIT_EXCEEDED,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
  INSPECTION_STARTED_LATE_ONE_MINUTE,
  INSPECTION_APPLIED_MOVES,
  STARTED_PUZZLE_PLACED_OUTSIDE_MAT,
  STARTED_WRONG_HAND_PLACEMENT,
  STARTED_WHILE_TOUCHING_PUZZLE,
  UNAUTHORIZED_ASSISTANCE,
  UNAUTHORIZED_COMMUNICATION,
  STOPPED_PUZZLE_ONE_MOVE_REMAINING,
  STOPPED_PUZZLE_UNSOLVED,
  STOPPED_PUZZLE_HELD,
  STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE,
  STOPPED_WRONG_HAND_PLACEMENT,
  STOPPED_APPLIED_MOVES,
  STOPPED_TOUCHED_PUZZLE,
  STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE,
  RESET_TIMER_BEFORE_SIGNATURES,
  RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE,
  RESET_TIMER_BEFORE_RESULT_RECORDED,
  SIGNED_BEFORE_STARTING,
  SIGNED_BEFORE_JUDGE,
  SIGNATURE_MISSING,
};
