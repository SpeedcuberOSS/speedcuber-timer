// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { STIF, UUID, UnixTimestamp } from '../stif';
import { GIIKER_PUZZLE, HEYKUBE, PARTICULA_PUZZLE } from '../stif/builtins';

import { parseMessage as parseGiiKERMessage } from './GiiKER';
import { parseMessage as parseHeyKubeMessage } from './HeyKube';
import { parseMessage as parseParticulaMessage } from './Particula';

export function parseTimestampedMoves(
  recording: STIF.SolveRecording,
  startTime: number = 0,
): STIF.TimestampedMove[] {
  return adjustTimestamps(parseMoves(recording))
    .relativeTo(startTime)
    .sort((a, b) => a.t - b.t);
}

/**
 * Compresses individual turns into double turns if they occur within a
 * given window.
 *
 * @param moves The move sequence to compress
 * @returns The compressed solve replay
 */
export function compressDoubleTurns(
  moves: STIF.TimestampedMove[],
): STIF.TimestampedMove[] {
  const window = moves[moves.length - 1].t / moves.length;

  const movesMatch = (m1: string | null, m2: string | null) =>
    m1 && m2 && m1 === m2;
  const withinWindow = (t1: number, t2: number) => Math.abs(t1 - t2) < window;
  const isDoubleTurn = (m1: STIF.TimestampedMove, m2: STIF.TimestampedMove) =>
    movesMatch(m1.m, m2.m) && withinWindow(m1.t, m2.t) && !m1.m.endsWith('2');

  const compressedSolveReplay = moves.reduce((acc, move) => {
    const lastMove = acc[acc.length - 1] ?? { t: 0, m: '' };
    return isDoubleTurn(lastMove, move)
      ? [...acc.slice(0, -1), { t: lastMove.t, m: `${lastMove.m[0]}2` }]
      : [...acc, move];
  }, [] as STIF.TimestampedMove[]);

  return compressedSolveReplay;
}

function parseMoves(recording: STIF.SolveRecording): STIF.TimestampedMove[] {
  const parser = getMessageParserForSmartPuzzle(recording.smartPuzzle);
  const moves = recording.stream
    .map(({ t, m }) => ({ t, m: parser(m) }))
    .filter(({ m }) => m !== '');
  return moves;
}

function getMessageParserForSmartPuzzle(
  smartPuzzle: STIF.SmartPuzzle,
): (message: string) => string {
  const uuid = smartPuzzle.uuids.trackingService;
  const parsers: Map<UUID, (message: string) => string> = new Map([
    [PARTICULA_PUZZLE.uuids.trackingService, parseParticulaMessage],
    [HEYKUBE.uuids.trackingService, parseHeyKubeMessage],
    [GIIKER_PUZZLE.uuids.trackingService, parseGiiKERMessage],
  ]);
  return parsers.get(uuid) ?? ((message: string) => message);
}

function adjustTimestamps(moves: STIF.TimestampedMove[]) {
  return {
    relativeTo: (time: UnixTimestamp): STIF.TimestampedMove[] =>
      moves.map(({ t, m }) => ({
        t: t - time,
        m,
      })),
  };
}
