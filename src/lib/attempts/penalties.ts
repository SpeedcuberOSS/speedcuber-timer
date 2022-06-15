// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

enum Penalty {
  NONE,
  PLUS_2,
  DID_NOT_FINISH,
  DID_NOT_START,
}

enum Infraction {
  // Article A1 - Time Limits
  TIMELIMIT_EXCEEDED = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A1a4

  // Article A3 - Inspection
  INSPECTION_STARTED_LATE_ONE_MINUTE = Penalty.DID_NOT_START, // https://www.worldcubeassociation.org/regulations/#A3b1
  INSPECTION_APPLIED_MOVES = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A3c1
  STARTED_WRONG_PUZZLE_PLACEMENT = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A3d

  // Article A4 - Starting the solve
  STARTED_WRONG_HAND_PLACEMENT = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A4b
  STARTED_TOUCHED_PUZZLE = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A4b1
  INSPECTION_EXCEEDED_15_SECONDS = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A4d1
  INSPECTION_EXCEEDED_17_SECONDS = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A4d2

  // Article A5 - During the solve
  UNAUTHORIZED_COMMUNICATION = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A5a
  UNAUTHORIZED_ASSISTANCE = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A5b

  // Article A6 - Stopping the solve
  STOPPED_PUZZLE_UNSOLVED = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A6b2
  STOPPED_PUZZLE_HELD = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A6c
  STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A6c
  STOPPED_WRONG_HAND_PLACEMENT = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A6d
  STOPPED_APPLIED_MOVES = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A6e1
  STOPPED_TOUCHED_PUZZLE = Penalty.PLUS_2, // https://www.worldcubeassociation.org/regulations/#A6e2
  STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE = Penalty.NONE, // https://www.worldcubeassociation.org/regulations/#A6e2
  RESET_TIMER_BEFORE_SIGNATURES = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A6f
  RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE = Penalty.NONE, // https://www.worldcubeassociation.org/regulations/#A6f
  RESET_TIMER_BEFORE_RESULT_RECORDED = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A6f1

  // Article A7 - Recording results
  SIGNED_BEFORE_STARTING = Penalty.DID_NOT_START, // https://www.worldcubeassociation.org/regulations/#A7c2
  SIGNED_BEFORE_JUDGE = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A7c3
  SIGNATURE_MISSING = Penalty.DID_NOT_FINISH, // https://www.worldcubeassociation.org/regulations/#A7c4

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
}

const PreSolveInfractions = [
  Infraction.INSPECTION_STARTED_LATE_ONE_MINUTE,
  Infraction.INSPECTION_APPLIED_MOVES,
  Infraction.STARTED_WRONG_PUZZLE_PLACEMENT,
  Infraction.STARTED_WRONG_HAND_PLACEMENT,
  Infraction.STARTED_TOUCHED_PUZZLE,
  Infraction.INSPECTION_EXCEEDED_15_SECONDS,
  Infraction.INSPECTION_EXCEEDED_17_SECONDS,
];

const PostSolveInfractions = [
  Infraction.STOPPED_PUZZLE_UNSOLVED,
  Infraction.STOPPED_PUZZLE_HELD,
  Infraction.STOPPED_PUZZLE_HELD_JUDGE_OVERRIDE,
  Infraction.STOPPED_WRONG_HAND_PLACEMENT,
  Infraction.STOPPED_APPLIED_MOVES,
  Infraction.STOPPED_TOUCHED_PUZZLE,
  Infraction.STOPPED_TOUCHED_PUZZLE_JUDGE_OVERRIDE,
  Infraction.RESET_TIMER_BEFORE_SIGNATURES,
  Infraction.RESET_TIMER_BEFORE_SIGNATURES_JUDGE_OVERRIDE,
  Infraction.RESET_TIMER_BEFORE_RESULT_RECORDED,
];

export { Penalty, Infraction, PreSolveInfractions, PostSolveInfractions };
