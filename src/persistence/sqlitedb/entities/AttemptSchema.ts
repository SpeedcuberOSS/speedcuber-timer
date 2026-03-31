// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { EntitySchema } from 'typeorm';
import { STIF } from '../../../lib/stif';

export interface AttemptRow {
  id: string;
  eventId: string;
  eventJson: string;
  inspectionStart: number;
  timerStart: number;
  timerStop: number;
  comment: string;
  solutionsJson: string;
  infractionsJson: string;
}

export const AttemptSchema = new EntitySchema<AttemptRow>({
  name: 'Attempt',
  tableName: 'attempts',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
    },
    eventId: {
      type: 'varchar',
    },
    eventJson: {
      type: 'text',
    },
    inspectionStart: {
      type: 'integer',
    },
    timerStart: {
      type: 'integer',
    },
    timerStop: {
      type: 'integer',
    },
    comment: {
      type: 'text',
      nullable: true,
    },
    solutionsJson: {
      type: 'text',
    },
    infractionsJson: {
      type: 'text',
    },
  },
  indices: [
    { columns: ['eventId'] },
    { columns: ['inspectionStart'] },
  ],
});

export function rowToAttempt(row: AttemptRow): STIF.Attempt {
  return {
    id: row.id,
    event: JSON.parse(row.eventJson),
    inspectionStart: row.inspectionStart,
    timerStart: row.timerStart,
    timerStop: row.timerStop,
    comment: row.comment ?? '',
    solutions: JSON.parse(row.solutionsJson),
    infractions: JSON.parse(row.infractionsJson),
  };
}

export function attemptToRow(attempt: STIF.Attempt): AttemptRow {
  return {
    id: attempt.id,
    eventId: attempt.event.id,
    eventJson: JSON.stringify(attempt.event),
    inspectionStart: attempt.inspectionStart,
    timerStart: attempt.timerStart,
    timerStop: attempt.timerStop,
    comment: attempt.comment ?? '',
    solutionsJson: JSON.stringify(attempt.solutions),
    infractionsJson: JSON.stringify(attempt.infractions),
  };
}
