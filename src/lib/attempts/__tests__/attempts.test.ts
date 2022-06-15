// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { v4 as uuid } from 'uuid';
import { InMemoryAttemptLibrary as AttemptLibrary } from '../InMemoryAttemptLibrary';

describe('AttemptLibrary', () => {
  test(' should successfully store a new Attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    expect(library.add({ id: attempt_id })).toBeTruthy();
  });
  test('should fail to store a duplicate attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    library.add({ id: attempt_id });
    expect(library.add({ id: attempt_id })).toBeFalsy();
  });
  test('should fail to remove a non-existent Attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    expect(library.remove(attempt_id)).toBeFalsy();
  });
  test('should successfully remove an existing Attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    library.add({ id: attempt_id });
    expect(library.remove(attempt_id)).toBeTruthy();
  });
  test('should fail to update a non-existent Attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    expect(library.update(attempt_id, { id: attempt_id })).toBeFalsy();
  });
  test('should successfully update an existing attempt', () => {
    const library = new AttemptLibrary();
    let attempt_id = uuid();
    library.add({ id: attempt_id });
    expect(library.update(attempt_id, { id: attempt_id })).toBeTruthy();
  });
});
