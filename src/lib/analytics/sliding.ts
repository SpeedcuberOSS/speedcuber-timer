// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export function sliding(
  nums: number[],
  bestPct: number = 0.05,
  worstPct: number = 0.05,
) {
  const bools = (idx: number, best_: number, worst_: number) => ({
    best: idx <= best_,
    counting: idx > best_ && idx < worst_,
    worst: idx >= worst_,
  });
  return {
    AoX: (x: number) => {
      // Heavily inspired by: https://stackoverflow.com/a/52136129/14765128
      if (nums.length < x) return [];
      else {
        const bestCount = Math.ceil(x * bestPct);
        const bestIdx = bestCount - 1;
        const worstCount = Math.ceil(x * worstPct);
        const worstIdx = x - worstCount;
        const counting = x - bestCount - worstCount;
        let sortedWindow = nums.slice(0, x).sort((a, b) => a - b);
        let countingSum = sortedWindow
          .slice(bestCount, -worstCount)
          .reduce((acc, val) => acc + val, 0);
        let averages = [countingSum / counting];
        for (let i = x; i <= nums.length; i++) {
          const removedVal = nums[i - x];
          const insertedVal = nums[i];
          const oldBest = sortedWindow[bestIdx];
          const oldTouchingBest = sortedWindow[bestIdx + 1];
          const oldWorst = sortedWindow[worstIdx];
          const oldTouchingWorst = sortedWindow[worstIdx - 1];
          const idx_old = binarySearch(sortedWindow, removedVal);
          sortedWindow.splice(idx_old, 1);
          const idx_new = binarySearch(sortedWindow, insertedVal);
          sortedWindow.splice(idx_new, 0, insertedVal);
          const newBest = sortedWindow[bestIdx];
          const newTouchingBest = sortedWindow[bestIdx + 1];
          const newWorst = sortedWindow[worstIdx];
          const newTouchingWorst = sortedWindow[worstIdx - 1];
          
          // Update countingSum
          if (newWorst == Infinity) {
            countingSum = sortedWindow
              .slice(bestCount, -worstCount)
              .reduce((acc, val) => acc + val, 0);  
          } else {
            const removing = bools(idx_old, bestIdx, worstIdx);
            const inserting = bools(idx_new, bestIdx, worstIdx);
            if (removing.best && inserting.best) {
              // No change
            } else if (removing.best && inserting.counting) {
              countingSum -= newBest;
              countingSum += insertedVal;
            } else if (removing.best && inserting.worst) {
              countingSum -= newBest;
              countingSum += newTouchingWorst;
            } else if (removing.counting && inserting.best) {
              countingSum -= removedVal;
              countingSum += newTouchingBest;
            } else if (removing.counting && inserting.counting) {
              countingSum -= removedVal;
              countingSum += insertedVal;
            } else if (removing.counting && inserting.worst) {
              countingSum -= removedVal;
              countingSum += newTouchingWorst;
            } else if (removing.worst && inserting.best) {
              countingSum -= oldTouchingWorst;
              countingSum += newTouchingBest;
            } else if (removing.worst && inserting.counting) {
              countingSum -= oldTouchingWorst;
              countingSum += insertedVal;
            } else if (removing.worst && inserting.worst) {
              // No change
            } else {
              console.error('I thought these conditions were exhaustive...');
            }
          }

          // Update averages
          averages.push(countingSum / counting);
        }
        averages.splice(-1, 1);
        return averages;
      }
    },
  };
}

function binarySearch(arr: number[], x: number) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    let mid = Math.floor(lo + (hi - lo) / 2);
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
