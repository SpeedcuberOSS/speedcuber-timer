// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Attempt, Penalty } from '../stif';

class AttemptAnalytics {
  private attempts: Attempt[];
  public sliding: SlidingWindowAnalytics;

  constructor(attempts: Attempt[]) {
    this.attempts = attempts;
    this.sliding = new SlidingWindowAnalytics(attempts);
  }

  count(): number {
    return this.attempts.length;
  }

  best(): Attempt {
    const attempts = this.attempts.sort(SORTS.durationAscending);
    return attempts[0];
  }

  worst(): Attempt {
    const attempts = this.attempts.sort(SORTS.durationDescending);
    return attempts[0];
  }

  totalSolveTime(): number {
    return this.attempts.reduce((acc, attempt) => acc + attempt.duration, 0);
  }

  /**
   * Computes the average of the most recent X attempts.
   *
   * "An average is a set of consecutive solves, in which 5% of the best
   * and 5% of the worst times are removed. (If the resulting number is
   * not an integer, it is rounded up. For example, in an Ao5 only the
   * best solve and the worst solve are removed because 5 * 5% rounded
   * up gives one)"
   *
   * Source: https://www.speedsolving.com/wiki/index.php/Average
   * Accessed: 2022-09-22
   *
   * @param x The number of attempts to average
   * @param bestPct The percentage of the best attempts to exclude.
   * (default: 0.05 aka 5%)
   * @param worstPct The percentage of the worst attempts to exclude.
   * (default: 0.05 aka 5%)
   * @returns The average of the most recent X attempts, or -1 if there
   * aren't enough attempts to average. Note that DNF averages come back
   * as Infinity.
   */
  AoX(x: number, bestPct: number = 0.05, worstPct: number = 0.05): number {
    if (x < 1) {
      throw new Error('Cannot compute an average of < 1 attempts.');
    }
    if (x === Infinity) {
      throw new Error('Cannot compute an average of Infinity attempts.');
    }
    if (bestPct < 0) {
      throw new Error('Cannot exclude < 0% of the best attempts.');
    }
    if (bestPct >= 1) {
      throw new Error('Cannot exclude >= 100% of the best attempts.');
    }
    if (worstPct < 0) {
      throw new Error('Cannot exclude < 0% of the worst attempts.');
    }
    if (worstPct >= 1) {
      throw new Error('Cannot exclude >= 100% of the worst attempts.');
    }
    if (bestPct + worstPct >= 1) {
      throw new Error(
        'bestPct and worstPct cannot sum to >= 100% of attempts.',
      );
    }
    return this.__safeAoX(x, bestPct, worstPct);
  }

  private __safeAoX(x: number, bestPct: number, worstPct: number): number {
    const xAttempts = this.__getMostRecentXAttemptsDurationAscending(x);
    if (xAttempts.length < x) {
      return -1;
    }
    const [best, worst] = this.__computeExcludeCounts(x, bestPct, worstPct);
    const countingAttempts = xAttempts.slice(best, xAttempts.length - worst);
    const totalDuration = countingAttempts.reduce(
      (acc, attempt) => acc + durationWithPenalties(attempt),
      0,
    );
    return Math.round(totalDuration / (x - (best + worst)));
  }

  private __getMostRecentXAttemptsDurationAscending(x: number): Attempt[] {
    const attempts = this.attempts.sort(SORTS.dateDescending);
    return attempts.slice(0, x).sort(SORTS.durationAscending);
  }

  private __computeExcludeCounts(
    x: number,
    excludeBestPercent: number,
    excludeWorstPercent: number,
  ): [number, number] {
    const excludeBestCount = Math.ceil(x * excludeBestPercent);
    const excludeWorstCount = Math.ceil(x * excludeWorstPercent);
    return [excludeBestCount, excludeWorstCount];
  }

  /**
   * Computes the mean of the most recent X attempts.
   *
   * "A mean is very similar to an average, except the best and worst
   * times are not removed. Means of 3 are usually used when a puzzle
   * takes a long time, such as 6x6 and 7x7."
   *
   * Source: https://www.speedsolving.com/wiki/index.php/Average
   * Accessed: 2022-09-22
   *
   * @param x The number of attempts of which to take the mean
   * @returns The mean of the most recent X attempts, or -1 if there
   * aren't enough attempts to mean. Note that DNF means come back as
   * Infinity.
   */
  MoX(x: number): number {
    if (x < 1) {
      throw new Error('Cannot compute a mean of < 1 attempts.');
    }
    if (x === Infinity) {
      throw new Error('Cannot compute a mean of Infinity attempts.');
    }
    return this.__safeAoX(x, 0, 0);
  }

  /**
   * Computes the exclusive percentile rank of the given attempt.
   *
   * In other words, computes what percent of attempts provided to the
   * constructor were strictly slower than the given attempt.
   *
   * @param attempt The attempt to compare against
   * @returns The percent of attempts slower than the given attempt, as
   * a number on the domain [0, 1].
   */
  percentileRank(attempt: Attempt): number {
    const attempts = this.attempts.sort(SORTS.durationAscending);
    const idx = rightmostBinarySearch(attempts, attempt, compareByDuration);
    const betterCount = idx + 1;
    const worseCount = attempts.length - betterCount;
    return attempts.length === 0 ? 1 : worseCount / attempts.length;
  }

  /**
   * Computes the percentile score of the given percentile.
   *
   * In other words, finds the duration of the first attempt at or below
   * the given percentile.
   *
   * @param percentile The percentile to compute the time for. Must be
   * on the domain [0, 1].
   * @returns The duration of the first attempt at or below the given
   * percentile (0 if there are no attempts)
   */
  percentileScore(percentile: number): number {
    // eslint-disable-next-line yoda
    if (percentile < 0 || 1 < percentile) {
      throw new Error('Percentile must be within the domain [0, 1].');
    }
    const attempts = this.attempts.sort(SORTS.durationAscending);
    let idx = attempts.length - Math.floor(attempts.length * percentile) - 1;
    idx = Math.max(idx, 0);
    return durationWithPenalties(attempts[idx]);
  }

  percentileScores(percentiles: number[]): number[] {
    return percentiles.map(pct => this.percentileScore(pct));
  }
}

class SlidingWindowAnalytics {
  private attempts: Attempt[];

  constructor(attempts: Attempt[]) {
    this.attempts = attempts;
  }

  AoX(x: number, bestPct: number = 0.05, worstPct: number = 0.05): number[] {
    let averages: number[] = [];
    for (let i = 0; i < this.attempts.length - x + 1; i++) {
      let window = this.attempts.slice(i, i + x);
      averages.push(new AttemptAnalytics(window).AoX(x, bestPct, worstPct));
    }
    return averages;
  }
}

/**
 * Returns the index at which the value could be inserted and all items
 * to the right of it would be strictly larger than the item.
 *
 * @param items The ordered items to search
 * @param value The value to search for
 * @param compare A function that compares two items and returns a
 * negative number if the first item is less than the second, a positive
 * number if the first item is greater than the second, and 0 if the
 * items are equal.
 * @returns The rightmost index to insert the value to maintain
 * ordering.
 */
function rightmostBinarySearch<Type>(
  items: Type[],
  value: Type,
  compare: (item: Type, value: Type) => number,
): number {
  let lowIdx = 0;
  let midIdx = 0;
  let highIdx = items.length - 1;
  while (lowIdx <= highIdx) {
    midIdx = Math.floor(lowIdx + (highIdx - lowIdx) / 2);
    const comparison = compare(items[midIdx], value);
    if (comparison < 0) {
      lowIdx = midIdx + 1;
    } else if (comparison > 0) {
      highIdx = midIdx - 1;
    } else {
      while (midIdx < highIdx && compare(items[midIdx + 1], value) === 0) {
        // If there are multiple items equal to the value, return the
        // index of the last one.
        midIdx++;
        midIdx += rightmostBinarySearch(items.slice(midIdx), value, compare);
        // Repeating binary search preserves O(log n) time complexity.
        // While a step by step rightward crawl also works, it degrades
        // performance to O(n/2) = O(n) in the worst case.
      }
      return midIdx;
    }
  }
  return highIdx;
}

const SORTS = {
  dateAscending: (a: Attempt, b: Attempt) => a.unixTimestamp - b.unixTimestamp,
  dateDescending: (a: Attempt, b: Attempt) => b.unixTimestamp - a.unixTimestamp,
  durationAscending: (a: Attempt, b: Attempt) => compareByDuration(a, b),
  durationDescending: (a: Attempt, b: Attempt) => -compareByDuration(a, b),
};

function compareByDuration(a: Attempt, b: Attempt): number {
  let durA = durationWithPenalties(a);
  let durB = durationWithPenalties(b);
  if (durA === Infinity && durB === Infinity) {
    return a.duration - b.duration;
  } else {
    return durA - durB;
  }
}

function durationWithPenalties(
  attempt: Attempt,
  penaltyMap: Map<Penalty, number> = PENALTY_TO_TIME,
): number {
  const penalties = attempt.infractions.reduce((acc, infraction) => {
    return acc + penaltyMap.get(infraction.penalty)!;
  }, 0);
  return attempt.duration + penalties;
}

const PENALTY_TO_TIME: Map<Penalty, number> = new Map([
  [Penalty.NONE, 0],
  [Penalty.PLUS_2, 2000],
  [Penalty.DID_NOT_FINISH, Infinity],
  [Penalty.DID_NOT_START, Infinity],
]);

export { AttemptAnalytics };
