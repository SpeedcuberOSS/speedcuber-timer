// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Realm from 'realm';

import { STIF, UUID, UnixTimestamp } from '../../lib/stif';

export class RealmInfraction extends Realm.Object<RealmInfraction> {
  id!: string;
  penalty!: STIF.Penalty;

  static schema = {
    name: 'Infraction',
    properties: {
      id: 'string',
      penalty: 'string',
    },
  };
}

export class RealmTimestampedMove extends Realm.Object<RealmTimestampedMove> {
  t!: UnixTimestamp
  m!: STIF.Move

  static schema = {
    name: 'TimestampedMove',
    properties: {
      t: 'int',
      m: 'string',
    },
  };
}

export class RealmSolutionPhase extends Realm.Object<RealmSolutionPhase> {
  label!: string;
  moves!: RealmTimestampedMove[];

  static schema = {
    name: 'SolutionPhase',
    properties: {
      label: 'string',
      moves: 'TimestampedMove[]',
    },
  };
}

export class RealmSolution extends Realm.Object<RealmSolution> {
  id!: UUID;
  puzzle!: STIF.Puzzle;
  scramble!: STIF.Algorithm;
  reconstruction!: RealmSolutionPhase[];

  static schema = {
    name: 'Solution',
    properties: {
      id: 'string',
      puzzle: 'string',
      scramble: 'string[]',
      reconstruction: 'SolutionPhase[]',
    },
  };
}

export class RealmCompetitiveEvent extends Realm.Object<RealmCompetitiveEvent> {
  id!: string;
  type!: 'official' | 'retired' | 'unofficial';
  puzzles!: STIF.Puzzle[];

  static schema = {
    name: 'CompetitiveEvent',
    properties: {
      id: 'string',
      type: 'string',
      puzzles: 'string[]',
    },
  };
}

export class RealmAttempt extends Realm.Object<RealmAttempt> {
  id!: UUID;
  event!: RealmCompetitiveEvent;
  inspectionStart!: UnixTimestamp;
  timerStart!: UnixTimestamp;
  timerStop!: UnixTimestamp;
  solutions!: RealmSolution[];
  infractions!: RealmInfraction[];
  comment!: string;

  static schema = {
    name: 'Attempt',
    properties: {
      id: 'string',
      event: 'CompetitiveEvent',
      inspectionStart: 'int',
      timerStart: 'int',
      timerStop: 'int',
      solutions: 'Solution[]',
      infractions: 'Infraction[]',
      comment: 'string',
    },
    primaryKey: 'id',
  };
}

export class RealmSmartPuzzleUUIDs extends Realm.Object<RealmSmartPuzzleUUIDs> {
  trackingService!: UUID;
  trackingCharacteristic!: UUID;
  batteryService?: UUID;
  batteryCharacteristic?: UUID;

  static schema = {
    name: 'SmartPuzzleUUIDs',
    properties: {
      trackingService: 'string',
      trackingCharacteristic: 'string',
      batteryService: 'string?',
      batteryCharacteristic: 'string?',
    },
  };
}

export class RealmSmartPuzzle extends Realm.Object<RealmSmartPuzzle> {
  prefix!: string;
  name?: string;
  brand!: string;
  puzzle!: STIF.Puzzle;
  uuids!: RealmSmartPuzzleUUIDs;

  static schema = {
    name: 'SmartPuzzle',
    properties: {
      prefix: 'string',
      name: 'string',
      brand: 'string',
      puzzle: 'string',
      uuids: 'SmartPuzzleUUIDs',
    },
  };
}

export class RealmMessage extends Realm.Object<RealmMessage> {
  t!: UnixTimestamp;
  m!: string;

  static schema = {
    name: 'Message',
    properties: {
      t: 'int',
      m: 'string',
    },
  };
}

export class RealmSolveRecording extends Realm.Object<RealmSolveRecording> {
  solutionId!: UUID;
  smartPuzzle!: RealmSmartPuzzle;
  stream!: RealmMessage[];

  static schema = {
    name: 'SolveRecording',
    properties: {
      solutionId: 'string',
      smartPuzzle: 'SmartPuzzle',
      stream: 'Message[]',
    },
  };
}
