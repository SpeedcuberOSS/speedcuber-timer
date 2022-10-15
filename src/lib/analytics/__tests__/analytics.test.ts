// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import twistyAttempts from '../demo/twisty2stif';
import { AttemptAnalytics } from '../AttemptAnalytics';
import {
  ALL_DNF,
  Ao5_AVG_10000,
  Ao5_AVG_10000_WITH_DNF,
  Ao5_AVG_10000_WITH_PLUS_2,
  Ao5_AVG_DNF,
  attemptFixtureWithTime,
  Mo3_MEAN_10000,
  Mo3_MEAN_10000_WITH_PLUS_2,
  Mo3_MEAN_DNF,
  PERCENTILE_STANDARD_100_ATTEMPTS,
} from '../demo/attemptSets';
import {
  INSPECTION_EXCEEDED_15_SECONDS,
  INSPECTION_EXCEEDED_17_SECONDS,
} from '../../stif';
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
  describe('MoX', () => {
    describe('finds the correct mean of 3', () => {
      it('with no penalties', () => {
        const analytics = new AttemptAnalytics(Mo3_MEAN_10000);
        expect(analytics.MoX(3)).toBe(10000);
      });
      it('with a plus 2 penalty', () => {
        const analytics = new AttemptAnalytics(Mo3_MEAN_10000_WITH_PLUS_2);
        expect(analytics.MoX(3)).toBe(10000);
      });
      it('with a DNF penalty', () => {
        const analytics = new AttemptAnalytics(Mo3_MEAN_DNF);
        expect(analytics.MoX(3)).toBe(Infinity);
      });
    });
    describe('throws an error when attempting to', () => {
      test.each([0, -1, -10, -Infinity])(
        'average less than 1 attempt (case: %p)',
        X => {
          expect(() => {
            attemptAnalytics.MoX(X);
          }).toThrow('Cannot compute a mean of < 1 attempts.');
        },
      );
      test('average infinite attempts', () => {
        expect(() => {
          attemptAnalytics.MoX(Infinity);
        }).toThrow('Cannot compute a mean of Infinity attempts.');
      });
    });
  });
  describe('percentile', () => {
    describe('computes the percent of attempts slower than a given attempt', () => {
      let percentileAnalytics = new AttemptAnalytics(
        PERCENTILE_STANDARD_100_ATTEMPTS,
      );
      test.each([1_000, 10_000, 50_000, 90_000, 100_000])(
        'for attempts with a duration within the test range [1_000, 100_000] (case: %p)',
        duration => {
          let percentileOracle = (d: number) => (100 - d / 1000) / 100;
          let attempt = attemptFixtureWithTime(duration);
          expect(percentileAnalytics.percentileRank(attempt)).toBe(
            percentileOracle(duration),
          );
        },
      );
      test('for an attempt faster than all other attempts', () => {
        let attempt = attemptFixtureWithTime(0);
        expect(percentileAnalytics.percentileRank(attempt)).toBe(1);
      });
      test('for an attempt slower than all other attempts', () => {
        let attempt = attemptFixtureWithTime(101_000);
        expect(percentileAnalytics.percentileRank(attempt)).toBe(0);
      });
      test('for an attempt with a +2 penalty', () => {
        let attempt = {
          ...attemptFixtureWithTime(50_000),
          infractions: [INSPECTION_EXCEEDED_15_SECONDS],
        };
        expect(percentileAnalytics.percentileRank(attempt)).toBe(0.48);
      });
      test('for an attempt with a DNF penalty', () => {
        let attempt = {
          ...attemptFixtureWithTime(50_000),
          infractions: [INSPECTION_EXCEEDED_17_SECONDS],
        };
        expect(percentileAnalytics.percentileRank(attempt)).toBe(0);
      });
      test('when multiple attempts have the same duration', () => {
        let analytics = new AttemptAnalytics([
          attemptFixtureWithTime(10),
          attemptFixtureWithTime(50),
          attemptFixtureWithTime(50),
          attemptFixtureWithTime(50),
          attemptFixtureWithTime(60),
        ]);
        let attempt = attemptFixtureWithTime(50);
        expect(analytics.percentileRank(attempt)).toBe(0.2);
      });
      test('when all attempts have the same duration', () => {
        let analytics = new AttemptAnalytics([
          attemptFixtureWithTime(50),
          attemptFixtureWithTime(50),
          attemptFixtureWithTime(50),
        ]);
        let attempt = attemptFixtureWithTime(50);
        expect(analytics.percentileRank(attempt)).toBe(0.0);
      });
      test('when there are no attempts to compare against', () => {
        let analytics = new AttemptAnalytics([]);
        let attempt = attemptFixtureWithTime(50);
        expect(analytics.percentileRank(attempt)).toBe(1);
      });
    });
    describe('computes the time required to achieve a specific percentile', () => {
      let percentileAnalytics = new AttemptAnalytics(
        PERCENTILE_STANDARD_100_ATTEMPTS,
      );
      test('when requesting a score', () => {
        expect(percentileAnalytics.percentileScore(0.5)).toBe(50_000);
      });
      test('when requesting the 100th percentile', () => {
        expect(percentileAnalytics.percentileScore(1)).toBe(1_000);
      });
      test('when requesting the 0th percentile', () => {
        expect(percentileAnalytics.percentileScore(0)).toBe(100_000);
      });
      test('when requesting multiple scores', () => {
        expect(percentileAnalytics.percentileScores([0.25, 0.5, 0.75])).toEqual(
          [75_000, 50_000, 25_000],
        );
      });
      test('in the presence of a +2 penalty', () => {
        let analytics = new AttemptAnalytics([
          attemptFixtureWithTime(48_000),
          {
            ...attemptFixtureWithTime(48_000),
            infractions: [INSPECTION_EXCEEDED_15_SECONDS],
          },
          attemptFixtureWithTime(52_000),
        ]);
        expect(analytics.percentileScore(0.5)).toBe(50_000);
      });
      test('in the presence of a DNF penalty', () => {
        let analytics = new AttemptAnalytics([
          attemptFixtureWithTime(48_000),
          attemptFixtureWithTime(52_000),
          {
            ...attemptFixtureWithTime(48_000),
            infractions: [INSPECTION_EXCEEDED_17_SECONDS],
          },
        ]);
        expect(analytics.percentileScore(0)).toBe(Infinity);
      });
    });
    describe('throws an error when attempting to', () => {
      test.each([-Infinity, -1, -0.01, 1.01, 10, Infinity])(
        'compute the score of a percentile outside the domain [0, 1] (case: %p)',
        percentile => {
          expect(() => {
            attemptAnalytics.percentileScore(percentile);
          }).toThrow('Percentile must be within the domain [0, 1].');
        },
      );
    });
  });
  describe('AoXForecast', () => {
    // Given X-1 solves, what time is needed to achieve an AoX of X.XX?
    // Will be used for messages like "you only need < X.XX to beat your
    // record AoX"
  });
  describe('MoXForecast', () => {
    // Given X-1 solves, what time is needed to achieve an MoX of X.XX?
    // Will be used for messages like "you only need < X.XX to beat your
    // record MoX"
  });
  describe('Standard Deviation', () => {
    // Just the typical standard deviation
    // Would be good to offer an "of X" option...
  });
  describe('sessions', () => {
    // Find the logical break points between different solve sessions
    // and return a list of lists, where each sublist is a session.
    // A session is defined as a set of solves with similar start times
    // to each other, but very different start times to other solves.
  });
  describe('sliding windows', () => {
    // compute any of the statistics across a sliding window of size X
    // solves.
    // Returns a list of numbers, where each number is the statistic for
    // the window.
  });
  describe('expanding windows', () => {
    // compute any of the statistics across an expanding window.
    // An expanding window starts with just the first attempt, then
    // grows to include the second, then the third, etc.
    // -> Use a step increment to control how quickly the window expands.
    // Returns a list of numbers, where each number is the statistic for
    // the expanding window.
  });
});
