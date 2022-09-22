// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { Attempt, Penalty } from '../stif';

class AttemptAnalytics {
  private attempts: Attempt[];

  constructor(attempts: Attempt[]) {
    this.attempts = attempts;
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
    const countingAttempts = xAttempts.slice(best, -worst);
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
}

const SORTS = {
  dateAscending: (a: Attempt, b: Attempt) =>
    a.timestamp.getTime() - b.timestamp.getTime(),
  dateDescending: (a: Attempt, b: Attempt) =>
    b.timestamp.getTime() - a.timestamp.getTime(),
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
