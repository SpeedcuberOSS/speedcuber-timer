// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AttemptBuilder } from '../AttemptBuilder';
import { v4 as uuid } from 'uuid';
import {
  EVENT_3x3x3,
  INSPECTION_EXCEEDED_17_SECONDS,
  PUZZLE_3x3x3,
  TIMELIMIT_EXCEEDED,
} from '../../builtins';
import { Attempt } from '../../types';
import { SolutionBuilder } from '../SolutionBuilder';
import { ScrambleBuilder } from '../ScrambleBuilder';
import { TEST_EXTENSION, TEST_EXTENSION_ALT } from './fixtures';

let TEST_SCRAMBLE = ScrambleBuilder.buildBasic(PUZZLE_3x3x3, ['R', 'U']);
let TEST_SOLUTION = SolutionBuilder.buildBasic(TEST_SCRAMBLE, 2000);

describe("AttemptBuilder's API", () => {
  it('provides a static method for creating basic attempts', () => {
    let attempt = AttemptBuilder.buildBasic(EVENT_3x3x3, TEST_SCRAMBLE, 10000);
    expect(attempt.event).toEqual(EVENT_3x3x3);
    expect(attempt.solutions[0].scramble).toEqual(TEST_SCRAMBLE);
    expect(attempt.solutions[0].duration).toEqual(10000);
    expect(attempt.timestamp.getMilliseconds()).toBeGreaterThan(
      new Date().getMilliseconds() - 1000,
    );
    expect(attempt.timestamp.getMilliseconds()).toBeLessThan(
      new Date().getMilliseconds() + 1000,
    );
    expect(attempt.infractions).toEqual([]);
    expect(attempt.comment).toEqual('');
  });
});

describe('A new AttemptBuilder', () => {
  describe('builds successfully when', () => {
    it("is given an event and at least one solution (the 'CORE FIELDS')", () => {
      let attempt: Attempt = new AttemptBuilder()
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.event).toEqual(EVENT_3x3x3);
      expect(attempt.solutions).toEqual([TEST_SOLUTION]);
      expect(attempt.timestamp.getMilliseconds()).toBeGreaterThan(
        new Date().getMilliseconds() - 1000,
      );
      expect(attempt.timestamp.getMilliseconds()).toBeLessThan(
        new Date().getMilliseconds() + 1000,
      );
      expect(attempt.infractions).toEqual([]);
      expect(attempt.comment).toEqual('');
    });
    it("is given a custom id and the 'CORE FIELDS'", () => {
      let id = uuid();
      let attempt: Attempt = new AttemptBuilder()
        .setId(id)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.id).toEqual(id);
    });
    it("is given a custom timestamp and the 'CORE FIELDS'", () => {
      let timestamp = new Date();
      let attempt: Attempt = new AttemptBuilder()
        .setTimestamp(timestamp)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.timestamp).toEqual(timestamp);
    });
    it("is given multiple solutions and the 'CORE FIELDS'", () => {
      let attempt: Attempt = new AttemptBuilder()
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .addSolution({ ...TEST_SOLUTION, duration: 3000 })
        .build();
      expect(attempt.solutions.length).toEqual(2);
    });
    it("is given a single infraction and the 'CORE FIELDS'", () => {
      let attempt: Attempt = new AttemptBuilder()
        .addInfraction(TIMELIMIT_EXCEEDED)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.infractions.length).toEqual(1);
    });
    it("is given multiple infractions and the 'CORE FIELDS'", () => {
      let attempt: Attempt = new AttemptBuilder()
        .addInfraction(TIMELIMIT_EXCEEDED)
        .addInfraction(INSPECTION_EXCEEDED_17_SECONDS)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.infractions.length).toEqual(2);
    });
    it("is given a custom comment and the 'CORE FIELDS'", () => {
      let comment = 'what an attempt!';
      let attempt: Attempt = new AttemptBuilder()
        .setComment(comment)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.comment).toEqual(comment);
    });
    it("is given one extension and the 'CORE FIELDS'", () => {
      let attempt: Attempt = new AttemptBuilder()
        .addExtension(TEST_EXTENSION)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.extensions?.length).toBe(1);
    });
    it("is given multiple extensions and the 'CORE FIELDS'", () => {
      let attempt: Attempt = new AttemptBuilder()
        .addExtension(TEST_EXTENSION)
        .addExtension(TEST_EXTENSION_ALT)
        .setEvent(EVENT_3x3x3)
        .addSolution(TEST_SOLUTION)
        .build();
      expect(attempt.extensions?.length).toEqual(2);
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => {
        new AttemptBuilder().build();
      }).toThrow('Nothing to build!');
    });
    it('is given no `event`', () => {
      expect(() => new AttemptBuilder().setId(uuid()).build()).toThrow(
        '`event` is a required attribute.',
      );
    });
    it('is given no `solution', () => {
      expect(() => new AttemptBuilder().setEvent(EVENT_3x3x3).build()).toThrow(
        'At least one `solution` must be provided.',
      );
    });
    it('is given a duplicate extension', () => {
      expect(() =>
        new AttemptBuilder()
          .addExtension(TEST_EXTENSION)
          .addExtension(TEST_EXTENSION),
      ).toThrow('cannot add a duplicate extension');
    });
  });
});
