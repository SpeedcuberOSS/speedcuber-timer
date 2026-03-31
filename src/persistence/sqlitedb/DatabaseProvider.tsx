// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppDataSource } from './index';
import { DataSource } from 'typeorm';

const DatabaseContext = createContext<DataSource | null>(null);

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!AppDataSource.isInitialized) {
      AppDataSource.initialize()
        .then(ds => setDataSource(ds))
        .catch((err: Error) => setError(err));
    } else {
      setDataSource(AppDataSource);
    }
  }, []);

  if (error) {
    throw error;
  }

  if (!dataSource) {
    return null;
  }

  return (
    <DatabaseContext.Provider value={dataSource}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase(): DataSource {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
