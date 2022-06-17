// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Infraction } from '../types/Infraction';
import { Penalty } from '../types/Penalty';

/**
 * All possible infractions specified in the Official WCA Regulations.
 */
// Article A1 - Time Limits
const TIMELIMIT_EXCEEDED: Infraction = {
  id: 'A1a4',
  penalty: Penalty.DID_NOT_FINISH,
};

// Article A3 - Inspection
const INSPECTION_STARTED_LATE_ONE_MINUTE: Infraction = {
  id: 'A3b1',
  penalty: Penalty.DID_NOT_START,
};
const INSPECTION_APPLIED_MOVES: Infraction = {
  id: 'A3c1',
  penalty: Penalty.DID_NOT_FINISH,
};
const STARTED_WRONG_PUZZLE_PLACEMENT: Infraction = {
  id: 'A3d',
  penalty: Penalty.PLUS_2,
};

// Article A4 - Starting the solve
const STARTED_WRONG_HAND_PLACEMENT: Infraction = {
  id: 'A4b',
  penalty: Penalty.PLUS_2,
};
const STARTED_TOUCHED_PUZZLE: Infraction = {
  id: 'A4b1',
  penalty: Penalty.PLUS_2,
};
const INSPECTION_EXCEEDED_15_SECONDS: Infraction = {
  id: 'A4d1',
  penalty: Penalty.PLUS_2,
};
const INSPECTION_EXCEEDED_17_SECONDS: Infraction = {
  id: 'A4d2',
  penalty: Penalty.DID_NOT_FINISH,
};

// Article A5 - During the solve
const UNAUTHORIZED_COMMUNICATION: Infraction = {
  id: 'A5a',
  penalty: Penalty.DID_NOT_FINISH,
};
const UNAUTHORIZED_ASSISTANCE: Infraction = {
  id: 'A5b',
  penalty: Penalty.DID_NOT_FINISH,
};

// Article A6 - Stopping the solve
const STOPPED_PUZZLE_UNSOLVED: Infraction = {
  id: 'A6b2',
  penalty: Penalty.DID_NOT_FINISH,
};
const STOPPED_PUZZLE_HELD: Infraction = {
  id: 'A6c',
  penalty: Penalty.DID_NOT_FINISH,
};
const STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE: Infraction = {
  id: 'A6c-override',
  penalty: Penalty.PLUS_2,
};
const STOPPED_WRONG_HAND_PLACEMENT: Infraction = {
  id: 'A6d',
  penalty: Penalty.PLUS_2,
};
const STOPPED_APPLIED_MOVES: Infraction = {
  id: 'A6e1',
  penalty: Penalty.DID_NOT_FINISH,
};
const STOPPED_TOUCHED_PUZZLE: Infraction = {
  id: 'A6e2',
  penalty: Penalty.PLUS_2,
};
const STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE: Infraction = {
  id: 'A6e2-override',
  penalty: Penalty.NONE,
};
const RESET_TIMER_BEFORE_SIGNATURES: Infraction = {
  id: 'A6f',
  penalty: Penalty.DID_NOT_FINISH,
};
const RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE: Infraction = {
  id: 'A6f-override',
  penalty: Penalty.NONE,
};
const RESET_TIMER_BEFORE_RESULT_RECORDED: Infraction = {
  id: 'A6f1',
  penalty: Penalty.DID_NOT_FINISH,
};

// Article A7 - Recording results
const SIGNED_BEFORE_STARTING: Infraction = {
  id: 'A7c2',
  penalty: Penalty.DID_NOT_START,
};
const SIGNED_BEFORE_JUDGE: Infraction = {
  id: 'A7c3',
  penalty: Penalty.DID_NOT_FINISH,
};
const SIGNATURE_MISSING: Infraction = {
  id: 'A7c4',
  penalty: Penalty.DID_NOT_FINISH,
};

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

const PreSolveInfractions: Infraction[] = [
  INSPECTION_STARTED_LATE_ONE_MINUTE,
  INSPECTION_APPLIED_MOVES,
  STARTED_WRONG_PUZZLE_PLACEMENT,
  STARTED_WRONG_HAND_PLACEMENT,
  STARTED_TOUCHED_PUZZLE,
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
];

const PostSolveInfractions: Infraction[] = [
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
  STARTED_WRONG_PUZZLE_PLACEMENT,
  STARTED_WRONG_HAND_PLACEMENT,
  STARTED_TOUCHED_PUZZLE,
  UNAUTHORIZED_ASSISTANCE,
  UNAUTHORIZED_COMMUNICATION,
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
