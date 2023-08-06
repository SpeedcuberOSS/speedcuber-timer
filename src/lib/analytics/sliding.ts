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
    best: idx < best_,
    counting: idx >= best_ && idx <= worst_,
    worst: idx > worst_,
  });
  return {
    AoX: (x: number) => {
      // Heavily inspired by: https://stackoverflow.com/a/52136129/14765128
      if (nums.length < x) return [];
      else {
        const bestCount = Math.ceil(x * bestPct);
        const bestIdx = bestCount;
        const worstCount =Math.ceil(x * worstPct);
        const worstIdx = x - worstCount;
        const counting = x - bestCount - worstCount;
        let vals = nums.slice(0, x).sort((a, b) => a - b);
        let averages = [
          vals.slice(bestCount, -worstCount).reduce((acc, val) => acc + val, 0) /
            counting,
        ];
        for (let i = x; i <= nums.length; i++) {
          let idx_old = binarySearch(vals, nums[i - x]);
          vals.splice(idx_old, 1);
          let idx_new = binarySearch(vals, nums[i]);
          vals.splice(idx_new, 0, nums[i]);

          const removing = bools(idx_old, bestIdx, worstIdx);
          const inserting = bools(idx_new, bestIdx, worstIdx);
          if (removing.best && inserting.best) {
            averages.push(averages[averages.length - 1]);
          // } else if (removing.best && inserting.counting) {
          //   const newbest = vals[best -  1];
          //   const a = averages[averages.length - 1] - newbest / counting;
          //   const avg = a + nums[i] / counting;
          //   averages.push(avg);
          // } else if (removing.best && inserting.worst) {
          // } else if (removing.counting && inserting.best) {
          // } else if (removing.counting && inserting.counting) {
          // } else if (removing.counting && inserting.worst) {
          // } else if (removing.worst && inserting.best) {
          // } else if (removing.worst && inserting.counting) {
          } else if (removing.worst && inserting.worst) {
            averages.push(averages[averages.length - 1]);
          } else {
            console.log('I thought these conditions were exhaustive...');
            const avg =
              vals.slice(bestCount, -worstCount).reduce((acc, val) => acc + val, 0) /
              (counting);
            averages.push(avg);
          }
        }
        averages.splice(-1, 1);
        return averages.map(avg => Math.round(avg));
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
