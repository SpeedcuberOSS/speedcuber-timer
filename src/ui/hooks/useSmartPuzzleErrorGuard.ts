// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { SmartPuzzleError } from '../utils/bluetooth/SmartPuzzleError';
import { useState } from 'react';

export default function useSmartPuzzleErrorGuard() {
  const [smartPuzzleError, setSmartPuzzleError] = useState<SmartPuzzleError>();
  async function guard(operation: Function, finally_?: Function) {
    try {
      await operation();
    } catch (error) {
      if (error instanceof SmartPuzzleError) {
        setSmartPuzzleError(error);
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
  return { smartPuzzleError, guard };
}
