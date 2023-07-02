// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SolutionPhaseBuilder } from '../../builders/SolutionPhaseBuilder';
import { SolutionPhase } from '../SolutionPhase';

const BASE_BUILD = () =>
  new SolutionPhaseBuilder().setLabel('solve').addMove({ t: 500, m: 'R' });

describe('[Wrapper] SolutionPhase', () => {
  it('rejects invalid STIF.SolutionPhases', () => {
    expect(() => new SolutionPhase({} as any)).toThrow();
  });
  it('provides access to all STIF.SolutionPhase fields', () => {
    let phase = new SolutionPhase(BASE_BUILD().build());
    expect(phase.stif().label).toEqual('solve');
    expect(phase.stif().moves).toEqual([{ t: 500, m: 'R' }]);
  });
  describe('start', () => {
    it('returns the start time if provided', () => {
      let phase = new SolutionPhase(
        {
          label: 'solve',
          moves: [{ t: 1000, m: 'U' }],
        },
        {
          start: 500,
        },
      );
      expect(phase.start()).toEqual(500);
    });
    it('returns the timestamp of the first move if start time not provided', () => {
      let phase = new SolutionPhase(BASE_BUILD().build());
      expect(phase.start()).toEqual(500);
    });
    it('works for given start times at the Unix Epoch', () => {
      let phase = new SolutionPhase(BASE_BUILD().build(), { start: 0 });
      expect(phase.start()).toEqual(0);
    })
  });
  describe('end', () => {
    it('returns the timestamp of the final move', () => {
      let phase = new SolutionPhase(
        BASE_BUILD()
          .addMove({ t: 1000, m: 'U' })
          .addMove({ t: 1500, m: 'R' })
          .build(),
      );
      expect(phase.end()).toEqual(1500);
    });
  });
  describe('recognition', () => {
    it('is the time between the start and the timestamp of the first move', () => {
      let phase = new SolutionPhase(
        {
          label: 'solve',
          moves: [{ t: 1000, m: 'U' }],
        },
        {
          start: 500,
        },
      );
      expect(phase.recognition()).toEqual(500);
    })
    it('is zero if the start time is not provided', () => {
      let phase = new SolutionPhase(BASE_BUILD().build());
      expect(phase.recognition()).toEqual(0);
    });
  })
  describe('duration', () => {
    it('computes the duration as the difference between the first and last moves', () => {
      let phase = new SolutionPhase(
        BASE_BUILD()
          .addMove({ t: 1000, m: 'U' })
          .addMove({ t: 1500, m: 'R' })
          .build(),
      );
      expect(phase.duration()).toEqual(1000);
    });
    it('handles unsorted moves', () => {
      let phase = new SolutionPhase(
        BASE_BUILD()
          .addMove({ t: 1500, m: 'R' })
          .addMove({ t: 1000, m: 'U' })
          .build(),
      );
      expect(phase.duration()).toEqual(1000);
    });
    it('is zero for a phase with only one move', () => {
      let phase = new SolutionPhase(BASE_BUILD().build());
      expect(phase.duration()).toEqual(0);
    });
    it('includes recognition time if start time provided', () => {
      let phase = new SolutionPhase(
        {
          label: 'solve',
          moves: [{ t: 1000, m: 'U' }],
        },
        {
          start: 500,
        },
      );
      expect(phase.duration()).toEqual(500);
    });
  });
  describe('tps', () => {
    it('is undefined for single move phases with no recognition time', () => {
      let phase = new SolutionPhase(BASE_BUILD().build());
      expect(phase.tps()).toBeUndefined();
    });
    it('is the number of moves divided by the duration for multi-move phases', () => {
      let phase = new SolutionPhase({
        label: 'solve',
        moves: [
          { t: 500, m: 'R' },
          { t: 1000, m: 'U' },
          { t: 1500, m: 'R' },
        ],
      })
      expect(phase.tps()).toEqual(3);
    });
    it('includes recognition time', () => {
      let phase = new SolutionPhase(BASE_BUILD().build(), {start: 0});
      expect(phase.tps()).toEqual(2);
    })
  });
  describe('moveCount', () => {
    it('can be read from the `moves` method', () => {
      let phase = new SolutionPhase(BASE_BUILD().build());
      expect(phase.moves().length).toEqual(1);
    })
  });
});
