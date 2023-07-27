// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export function sliding(nums: number[], bestPct: number = 0.05, worstPct: number = 0.05) {
  return {
    AoX: (x: number) => {
      // Heavily inspired by: https://stackoverflow.com/a/52136129/14765128
      if (nums.length < x) return [];
      else {
        const best = Math.ceil(x * bestPct);
        const worst = Math.ceil(x * worstPct);
        let averages = [];
        let vals = nums.slice(0, x).sort((a, b) => a - b);
        for (let i = x; i <= nums.length; i++) {
          const avg =
            vals.slice(best, -worst).reduce((acc, val) => acc + val, 0) / (x - best - worst);
          averages.push(Math.round(avg));
          let idx_old = binarySearch(vals, nums[i - x]);
          vals.splice(idx_old, 1);
          let idx_new = binarySearch(vals, nums[i]);
          vals.splice(idx_new, 0, nums[i]);
        }
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
