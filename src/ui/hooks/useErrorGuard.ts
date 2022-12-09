// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useState } from 'react';

/**
 * Elegantly guard against and capture errors of a given type.
 *
 * The captured errors can easily be shown to the user with the help of
 * {@link ErrorDialog}.
 *
 * @param ErrorType The type of Error to guard against.
 * @returns the latest caught error and a function to guard against
 * errors of the given type.
 */
export default function useErrorGuard<T extends Error>(
  ErrorType: new (...args: any[]) => T,
) {
  const [error, setError] = useState<T>();
  async function guard(operation: Function, finally_?: Function) {
    try {
      await operation();
    } catch (error) {
      if (error instanceof ErrorType) {
        setError(error);
        return;
      } else {
        throw error;
      }
    } finally {
      if (finally_) {
        await finally_();
      }
    }
  }
  return { error, guard };
}
