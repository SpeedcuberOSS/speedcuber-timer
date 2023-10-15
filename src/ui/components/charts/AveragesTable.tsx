// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Attempt } from '../../../lib/stif/wrappers';
import { AttemptAnalytics } from '../../../lib/analytics/AttemptAnalytics';
import { DataTable } from 'react-native-paper';
import formatElapsedTime from '../../utils/formatElapsedTime';

interface Average {
  type: 'mean' | 'trimmed';
  size: number;
}

interface AveragesTableProps {
  averages?: Average[];
  attempts?: Attempt[];
  perPage?: number;
  // onPressAverage: (value: number, attempts: Attempt[], average: Average) => {}
}

const Label: { [key: string]: (size: number) => string } = {
  mean: (size: number) => `Mo${size}`,
  trimmed: (size: number) => `Ao${size}`,
};

const DEFAULT_AVERAGES: Average[] = [
  { type: 'mean', size: 3 },
  { type: 'trimmed', size: 5 },
  { type: 'trimmed', size: 12 },
];

export default function AveragesTable({
  averages = DEFAULT_AVERAGES,
  attempts = [],
  perPage,
}: AveragesTableProps) {
  const [page, setPage] = useState<number>(0);
  const displayAverages = useMemo(() => {
    return perPage
      ? averages.slice(page * perPage, page * perPage + perPage)
      : averages;
  }, [averages, page, perPage]);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title numeric>Current</DataTable.Title>
        <DataTable.Title numeric>Record</DataTable.Title>
        <DataTable.Title numeric>Worst</DataTable.Title>
      </DataTable.Header>
      {displayAverages
        .sort((a, b) => a.size - b.size)
        .map(average => (
          <AveragesRow
            key={Label[average.type](average.size)}
            average={average}
            attempts={attempts}
          />
        ))}
      {perPage ? (
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(averages.length / perPage)}
          onPageChange={page => setPage(page)}
        />
      ) : null}
    </DataTable>
  );
}

interface AveragesRowProps {
  average: Average;
  attempts: Attempt[];
  onLoaded?: (average: Average) => void;
}
const UNKNOWN = '';
const UNAVAILABLE = '-';
function AveragesRow({
  average,
  attempts,
  onLoaded = () => {},
}: AveragesRowProps) {
  const { type, size } = average;
  const [current, setCurrent] = useState(UNKNOWN);
  const [best, setBest] = useState(UNKNOWN);
  const [worst, setWorst] = useState(UNKNOWN);
  const pretty = useCallback(
    (value: number) => {
      if (attempts.length < average.size) return UNAVAILABLE;
      else if (value === Infinity) return 'DNF';
      else return formatElapsedTime(value);
    },
    [attempts.length, average.size],
  );
  useEffect(() => {
    setTimeout(() => {
      const sliding = new AttemptAnalytics(attempts).sliding.AoX(
        average.size,
      );
      setCurrent(pretty(sliding[sliding.length - 1]));
      setBest(pretty(Math.min(...sliding)));
      setWorst(pretty(Math.max(...sliding)));
      onLoaded(average);
    });
  }, [attempts, average, pretty]);
  return (
    <DataTable.Row>
      <DataTable.Cell>{Label[type](size)}</DataTable.Cell>
      <DataTable.Cell numeric>{current}</DataTable.Cell>
      <DataTable.Cell numeric>{best}</DataTable.Cell>
      <DataTable.Cell numeric>{worst}</DataTable.Cell>
    </DataTable.Row>
  );
}
