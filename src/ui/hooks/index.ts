// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { useState, useEffect } from 'react';

import { Timer } from '../../lib/timers';

function useTimer() {
  const [timer] = useState(new Timer());
  const [elapsed, setElapsed] = useState(new Date(0));
  useEffect(() => {
    if (!timer.isStarted()) {
      timer.start();
    }
    if (timer.isRunning()) {
      const interval = setInterval(() => {
        setElapsed(new Date(timer.elapsedMilliseconds()));
      }, 20);
      return () => clearInterval(interval);
    }
  });
  return { timer, elapsed };
}

export { useTimer };
