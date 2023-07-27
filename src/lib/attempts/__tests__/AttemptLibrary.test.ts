// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { v4 as uuid } from 'uuid';
import { EVENT_3x3x3, PUZZLE_3x3x3 } from '../../stif/builtins';
import { Attempt } from '../../stif/wrappers';
import { AttemptBuilder } from '../../stif/builders';
import { STIF } from '../../stif';
import { InMemoryAttemptLibrary as AttemptLibrary } from '../InMemoryAttemptLibrary';

const now = Date.now();
const TEST_SCRAMBLE: STIF.Algorithm = ['R', 'U'];
const TEST_ATTEMPT: Attempt = new AttemptBuilder()
  .setEvent(EVENT_3x3x3)
  .addSolution({
    puzzle: PUZZLE_3x3x3,
    scramble: TEST_SCRAMBLE,
    reconstruction: [],
  })
  .setInspectionStart(now - 23000)
  .setTimerStart(now - 10000)
  .setTimerStop(now)
  .wrapped()
  .build();
let TEST_ATTEMPT2: Attempt = new AttemptBuilder()
  .setEvent(EVENT_3x3x3)
  .addSolution({
    puzzle: PUZZLE_3x3x3,
    scramble: TEST_SCRAMBLE,
    reconstruction: [],
  })
  .setInspectionStart(now - 23000)
  .setTimerStart(now - 12000)
  .setTimerStop(now)
  .wrapped()
  .build();

describe('AttemptLibrary', () => {
  it('successfully stores a new Attempt', () => {
    const library = new AttemptLibrary();
    expect(library.add(TEST_ATTEMPT)).toBeTruthy();
    expect(library.count()).toBe(1);
  });
  it('successfully stores multiple Attempts', () => {
    const library = new AttemptLibrary();

    expect(library.add(TEST_ATTEMPT)).toBeTruthy();
    expect(library.count()).toBe(1);
    expect(library.get(TEST_ATTEMPT.id())).toBe(TEST_ATTEMPT);

    expect(library.add(TEST_ATTEMPT2)).toBeTruthy();
    expect(library.count()).toBe(2);
    expect(library.get(TEST_ATTEMPT2.id())).toBe(TEST_ATTEMPT2);
  });
  it('fails to store a duplicate attempt', () => {
    const library = new AttemptLibrary();
    library.add(TEST_ATTEMPT);
    expect(library.count()).toBe(1);

    expect(library.add(TEST_ATTEMPT)).toBeFalsy();
    expect(library.count()).toBe(1);
  });
  it('successfully removes an existing Attempt', () => {
    const library = new AttemptLibrary();
    library.add(TEST_ATTEMPT);
    expect(library.count()).toBe(1);

    expect(library.remove(TEST_ATTEMPT.id())).toBeTruthy();
    expect(library.count()).toBe(0);
  });
  it('fails to remove a non-existent Attempt', () => {
    const library = new AttemptLibrary();
    library.add(TEST_ATTEMPT);
    expect(library.count()).toBe(1);

    expect(library.remove(uuid())).toBeFalsy();
    expect(library.count()).toBe(1);
  });
  it('successfully updates an existing attempt', () => {
    const library = new AttemptLibrary();
    library.add(TEST_ATTEMPT);
    expect(library.get(TEST_ATTEMPT.id())?.duration()).toEqual(
      TEST_ATTEMPT.duration(),
    );

    let NEW_ATTEMPT = new Attempt({
      ...TEST_ATTEMPT.stif(),
      timerStart: now - 8000,
      timerStop: now,
    });
    expect(library.update(TEST_ATTEMPT.id(), NEW_ATTEMPT)).toBeTruthy();
    expect(library.get(TEST_ATTEMPT.id())?.duration()).toEqual(8000);
  });
  it('fails to update a non-existent Attempt', () => {
    const library = new AttemptLibrary();
    library.add(TEST_ATTEMPT);
    expect(library.get(TEST_ATTEMPT.id())?.duration()).toEqual(
      TEST_ATTEMPT.duration(),
    );

    let NEW_ATTEMPT = new Attempt({
      ...TEST_ATTEMPT.stif(),
      timerStart: now - 8000,
      timerStop: now,
    });
    expect(library.update(uuid(), NEW_ATTEMPT)).toBeFalsy();
    expect(library.get(TEST_ATTEMPT.id())?.duration()).toEqual(
      TEST_ATTEMPT.duration(),
    );
  });
});
