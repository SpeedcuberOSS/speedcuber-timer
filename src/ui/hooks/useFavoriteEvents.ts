// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@favorite_events';

export function useFavoriteEvents() {
  const [favoriteEventIds, setFavoriteEventIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          try {
            setFavoriteEventIds(JSON.parse(value));
          } catch {
            setFavoriteEventIds([]);
          }
        }
      })
      .catch(() => {
        setFavoriteEventIds([]);
      });
  }, []);

  const toggleFavorite = useCallback(
    (eventId: string) => {
      const updated = favoriteEventIds.includes(eventId)
        ? favoriteEventIds.filter(id => id !== eventId)
        : [...favoriteEventIds, eventId];
      setFavoriteEventIds(updated);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {
        setFavoriteEventIds(favoriteEventIds);
      });
    },
    [favoriteEventIds],
  );

  const isFavorite = useCallback(
    (eventId: string) => favoriteEventIds.includes(eventId),
    [favoriteEventIds],
  );

  return { favoriteEventIds, toggleFavorite, isFavorite };
}
