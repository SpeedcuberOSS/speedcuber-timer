// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import twistyAttempts from './fixtures/twisty2stif';
import { AttemptAnalytics } from '../AttemptAnalytics';
import {
  ALL_DNF,
  Ao5_AVG_10000,
  Ao5_AVG_10000_WITH_DNF,
  Ao5_AVG_10000_WITH_PLUS_2,
  Ao5_AVG_DNF,
} from './fixtures/attemptSets';
const twistyAnalytics = new AttemptAnalytics(twistyAttempts);
const attemptAnalytics = new AttemptAnalytics(Ao5_AVG_10000);

describe('analytics', () => {
  it('counts the number of attempts', () => {
    expect(attemptAnalytics.count()).toBe(5);
  });
  describe('best finds the fastest', () => {
    describe('attempt considering the impact of', () => {
      test('no penalties', () => {
        expect(attemptAnalytics.best().duration).toBe(8000);
      });
      test('a 2 penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_PLUS_2);
        expect(analytics.best().duration).toBe(8000);
      });
      test('a DNF penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_DNF);
        expect(analytics.best().duration).toBe(8000);
      });
    });
    it('duration if all attempts are DNFs', () => {
      const analytics = new AttemptAnalytics(ALL_DNF);
      expect(analytics.best().duration).toBe(7000);
    });
  });
  describe('worst finds the slowest', () => {
    describe('attempt considering the impact of', () => {
      test('no penalties', () => {
        expect(attemptAnalytics.worst().duration).toBe(15000);
      });
      test('a 2 penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_PLUS_2);
        expect(analytics.worst().duration).toBe(15000);
      });
      test('a DNF penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_DNF);
        expect(analytics.worst().duration).toBe(7000); // The DNF Attempt
      });
    });
    it('duration if all attempts are DNFs', () => {
      const analytics = new AttemptAnalytics(ALL_DNF);
      expect(analytics.worst().duration).toBe(8000);
    });
  });
  describe('totals the time spent solving', () => {
    test('when no penalties are present', () => {
      expect(attemptAnalytics.totalSolveTime()).toBe(53000);
    });
    test('ignoring any penalties that are present', () => {
      let analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_PLUS_2);
      expect(analytics.totalSolveTime()).toBe(51000);
      analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_DNF);
      expect(analytics.totalSolveTime()).toBe(45000);
      analytics = new AttemptAnalytics(ALL_DNF);
      expect(analytics.totalSolveTime()).toBe(15000);
    });
  });
  describe('AoX', () => {
    describe('finds the correct average of 5', () => {
      it('with no penalties', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000);
        expect(analytics.AoX(5)).toBe(10000);
      });
      it('with a plus 2 penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_PLUS_2);
        expect(analytics.AoX(5)).toBe(10000);
      });
      it('with a DNF penalty', () => {
        const analytics = new AttemptAnalytics(Ao5_AVG_10000_WITH_DNF);
        expect(analytics.AoX(5)).toBe(10000);
      });
    });
    describe('finds the correct average of 12', () => {
      test('with default exclusion percents', () => {
        expect(twistyAnalytics.AoX(12)).toBe(14289);
      });
    });
    describe('finds the correct average of 50', () => {
      test('with default exclusion percents', () => {
        expect(twistyAnalytics.AoX(50)).toBe(13613);
      });
    });
    describe('finds the correct average of 100', () => {
      test('with default exclusion percents', () => {
        expect(twistyAnalytics.AoX(100)).toBe(13483);
      });
    });
    it('returns Infinity for a DNF average', () => {
      const analytics = new AttemptAnalytics(Ao5_AVG_DNF);
      expect(analytics.AoX(5)).toBe(Infinity);
    });
    it('returns -1 if there are not enough attempts', () => {
      const analytics = new AttemptAnalytics(Ao5_AVG_10000);
      expect(analytics.AoX(12)).toBe(-1);
    });
    describe('throws an error when attempting to', () => {
      test.each([0, -1, -10, -Infinity])(
        'average less than 1 attempt (case: %p)',
        X => {
          expect(() => {
            attemptAnalytics.AoX(X);
          }).toThrow('Cannot compute an average of < 1 attempts.');
        },
      );
      test('average infinite attempts', () => {
        expect(() => {
          attemptAnalytics.AoX(Infinity);
        }).toThrow('Cannot compute an average of Infinity attempts.');
      });
      test.each([-0.05, -1, -Infinity])(
        'exlude less than 0% of the best attempts (case: %p)',
        bestPct => {
          expect(() => {
            attemptAnalytics.AoX(5, bestPct);
          }).toThrow('Cannot exclude < 0% of the best attempts.');
        },
      );
      test.each([1, 1.05, 10, Infinity])(
        'exlude >= 100% of the best attempts (case: %p)',
        bestPct => {
          expect(() => {
            attemptAnalytics.AoX(5, bestPct);
          }).toThrow('Cannot exclude >= 100% of the best attempts.');
        },
      );
      test.each([-0.05, -1, -Infinity])(
        'exlude less than 0% of the worst attempts (case: %p)',
        worstPct => {
          expect(() => {
            attemptAnalytics.AoX(5, 0.05, worstPct);
          }).toThrow('Cannot exclude < 0% of the worst attempts.');
        },
      );
      test.each([1, 1.05, 10, Infinity])(
        'exlude >= 100% of the worst attempts (case: %p)',
        worstPct => {
          expect(() => {
            attemptAnalytics.AoX(5, 0.05, worstPct);
          }).toThrow('Cannot exclude >= 100% of the worst attempts.');
        },
      );
      test.each([
        {
          bestPct: 0.5,
          worstPct: 0.5,
        },
        {
          bestPct: 0.25,
          worstPct: 0.75,
        },
        {
          bestPct: 0.8,
          worstPct: 0.3,
        },
      ])('exlude >= 100% of attempts (case: %p)', ({ bestPct, worstPct }) => {
        expect(() => {
          attemptAnalytics.AoX(5, bestPct, worstPct);
        }).toThrow('bestPct and worstPct cannot sum to >= 100% of attempts.');
      });
    });
  });
});
