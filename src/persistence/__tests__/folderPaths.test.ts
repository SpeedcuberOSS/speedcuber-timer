// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { EVENT_3x3x3_OH } from '../../lib/stif/builtins';
import { ATTEMPT_3x3x3_BASIC } from '../../lib/stif/demo';
import * as library from '../library';

describe('Folder Paths', () => {
  describe('For Events', () => {
    it('nests data inside a unique event-specific folder', () => {
      const paths = library.pathsForEvent(EVENT_3x3x3_OH);
      expect(paths.baseFolder).toEqual('DocumentDirectoryPath/library/333oh');
      expect(paths.resultsFile).toEqual(
        'DocumentDirectoryPath/library/333oh/results.csv',
      );
      expect(paths.detailsFolder).toEqual(
        'DocumentDirectoryPath/library/333oh/details',
      );
      expect(paths.recordingsFolder).toEqual(
        'DocumentDirectoryPath/library/333oh/recordings',
      );
    });
  });

  describe('For Attempts', () => {
    it('provides paths to each persisted file related to the attempt', () => {
      const paths = library.pathsForAttempt(ATTEMPT_3x3x3_BASIC);
      expect(paths.resultsFile).toEqual(
        'DocumentDirectoryPath/library/333/results.csv',
      );
      expect(paths.detailsFile).toEqual(
        `DocumentDirectoryPath/library/333/details/${ATTEMPT_3x3x3_BASIC.id}.json`,
      );
      expect(paths.recordingFile).toEqual(
        `DocumentDirectoryPath/library/333/recordings/${ATTEMPT_3x3x3_BASIC.id}.json`,
      );
    });
  });
});
