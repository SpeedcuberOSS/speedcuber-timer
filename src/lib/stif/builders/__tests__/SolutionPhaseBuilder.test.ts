// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { SolutionPhaseBuilder } from '../SolutionPhaseBuilder';
import { STIF } from '../../STIF';

describe('A new SolutionPhaseBuilder', () => {
  describe('builds successfully when', () => {
    it('is given its required fields (`label`, `moves`)', () => {
      let solution: STIF.SolutionPhase = new SolutionPhaseBuilder()
        .setLabel('solve')
        .addMove({ t: 500, m: "U'" })
        .addMove({ t: 750, m: "R'" })
        .build();
      expect(solution.label).toEqual('solve');
      expect(solution.moves).toEqual([
        { t: 500, m: "U'" },
        { t: 750, m: "R'" },
      ]);
    });
    it('is given no `moves`', () => {
      let solution: STIF.SolutionPhase = new SolutionPhaseBuilder().setLabel("test").build();
      expect(solution.label).toEqual('test');
      expect(solution.moves).toEqual([]);
    });
    it('is given an empty `moves` array', () => {
      let solution: STIF.SolutionPhase = new SolutionPhaseBuilder({label: "test", moves: []}).build();
      expect(solution.label).toEqual('test');
      expect(solution.moves).toEqual([]);
    });
  });
  describe('fails to build when', () => {
    it('is given no additional attributes', () => {
      expect(() => new SolutionPhaseBuilder().build()).toThrow(
        /required attribute/,
      );
    });
    it('is given no `label`', () => {
      expect(() =>
        new SolutionPhaseBuilder().addMove({ t: 500, m: 'U' }).build(),
      ).toThrow('`label` is a required attribute.');
    });
  });
});
