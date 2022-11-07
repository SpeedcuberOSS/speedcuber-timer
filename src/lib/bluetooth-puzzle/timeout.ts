// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// The contents of this file are heavily inspired by the following
// blog post by Tamás Sallai:
// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/

export const timeout = (
  promise: Promise<any>,
  milliseconds: number,
  timeoutException: Error,
) => {
  let timer: NodeJS.Timeout;
  let timeoutPromise = new Promise(
    (_resolve, reject) =>
      (timer = setTimeout(reject, milliseconds, timeoutException)),
  );
  return Promise.race([promise, timeoutPromise])
    .catch()
    .then(() => clearTimeout(timer));
};
