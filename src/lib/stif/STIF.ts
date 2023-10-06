// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export type UUID = string;
export type UnixTimestamp = number;
export type Milliseconds = number;

export namespace STIF {
  export type Algorithm = string[];
  export type Puzzle = string;
  export type Move = string;
  export type Penalty = '' | '+2' | 'DNF' | 'DNS';

  export interface Infraction {
    id: string;
    penalty: Penalty;
  }

  export interface TimestampedMove {
    t: UnixTimestamp;
    m: Move;
  }
  export interface SolutionPhase {
    label: string;
    moves: TimestampedMove[];
  }

  export interface Solution {
    id: UUID;
    puzzle: Puzzle;
    scramble: Algorithm;
    reconstruction: SolutionPhase[];
  }

  export interface CompetitiveEvent {
    id: string;
    type: 'official' | 'retired' | 'unofficial';
    puzzles: Puzzle[];
  }

  export interface Attempt {
    id: UUID;
    event: CompetitiveEvent;
    inspectionStart: UnixTimestamp;
    timerStart: UnixTimestamp;
    timerStop: UnixTimestamp;
    solutions: Solution[];
    infractions: Infraction[];
    comment: string;
  }

  export interface SmartPuzzleUUIDs {
    trackingService: UUID;
    trackingCharacteristic: UUID;
    batteryService?: UUID;
    batteryCharacteristic?: UUID;
  }

  export interface SmartPuzzle {
    prefix: string;
    name?: string;
    brand: string;
    puzzle: Puzzle;
    uuids: SmartPuzzleUUIDs;
  }
  
  export interface Message {
    t: UnixTimestamp;
    m: string;
  }
  export interface SolveRecording {
    smartPuzzle: SmartPuzzle;
    stream: Message[];
  }
}
