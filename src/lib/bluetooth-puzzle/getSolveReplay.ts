// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Attempt,
  MESSAGE_STREAM_TEMPLATE,
  MessageStream,
  SmartPuzzle,
} from '../stif';
import { GiiKERPuzzle, HeyKube, ParticulaPuzzle } from '../smart-puzzles';

import { parseMessage as parseGiiKERMessage } from './GiiKER';
import { parseMessage as parseHeyKubeMessage } from './HeyKube';
import { parseMessage as parseParticulaMessage } from './ParticulaPuzzle';

export type SolveReplay = { t: number; m: string }[];

export function getSolveReplay(attempt: Attempt): SolveReplay {
  const messageStream = getMessageStream(attempt);
  const timestampedMoves = parseMoves(messageStream);
  const offsetTimestampedMoves = adjustTimestampsRelativeToInspectionComplete(
    timestampedMoves,
    attempt.inspectionCompleteTimestamp ?? 0,
  );
  const solveReplay = offsetTimestampedMoves.sort((a, b) => a.t - b.t);
  return solveReplay;
}

/**
 * Compresses individual turns into double turns if they occur within a
 * given window.
 *
 * @param solveReplay The solve replay to compress
 * @param window The maximum time in milliseconds between two moves to
 * be considered a double turn
 * @returns The compressed solve replay
 */
export function compressDoubleTurns(solveReplay: SolveReplay): SolveReplay {
  const window = solveReplay[solveReplay.length - 1].t / solveReplay.length;
  const compressedSolveReplay = solveReplay.reduce((acc, move) => {
    const lastMove = acc[acc.length - 1];
    if (lastMove && lastMove.m === move.m && move.t - lastMove.t < window) {
      return [...acc.slice(0, -1), { t: lastMove.t, m: `${lastMove.m[0]}2` }];
    }
    return [...acc, move];
  }, [] as SolveReplay);
  return compressedSolveReplay;
}

function getMessageStream(attempt: Attempt): MessageStream {
  const messageStreamExtensions = attempt.extensions?.filter(
    ext => ext.id === MESSAGE_STREAM_TEMPLATE.id,
  );
  const messageStream = messageStreamExtensions?.[0] as MessageStream;
  return messageStream ?? MESSAGE_STREAM_TEMPLATE;
}

function parseMoves(messageStream: MessageStream) {
  const parser = getMessageParserForSmartPuzzle(messageStream.data.smartPuzzle);
  const moves = messageStream.data.stream
    .map(({ t, m }) => {
      return {
        t,
        m: parser(m),
      };
    })
    .filter(({ m }) => m !== '');
  return moves;
}

function convertParticulaRotationMessageToAlgMove(message: any) {
  const { face, direction } = message;
  let moveStr = '';
  moveStr += face === 'White' ? 'U' : '';
  moveStr += face === 'Yellow' ? 'D' : '';
  moveStr += face === 'Red' ? 'R' : '';
  moveStr += face === 'Orange' ? 'L' : '';
  moveStr += face === 'Green' ? 'F' : '';
  moveStr += face === 'Blue' ? 'B' : '';
  moveStr += direction === 'clockwise' ? '' : "'";
  return moveStr;
}

function getMessageParserForSmartPuzzle(
  smartPuzzle: SmartPuzzle,
): (message: string) => string {
  const uuid = smartPuzzle.uuids.trackingService;
  if (ParticulaPuzzle.uuids.trackingService === uuid) {
    return (message: string) => {
      let parsedMove = '';
      let parsedMessage = parseParticulaMessage(message);
      if (!parsedMessage?.hasOwnProperty('x')) {
        parsedMove = convertParticulaRotationMessageToAlgMove(parsedMessage);
      }
      return parsedMove;
    };
  } else if (HeyKube.uuids.trackingService === uuid) {
    return parseHeyKubeMessage;
  } else if (GiiKERPuzzle.uuids.trackingService === uuid) {
    return parseGiiKERMessage;
  } else {
    return (message: string) => message;
  }
}

function adjustTimestampsRelativeToInspectionComplete(
  timestampedMoves: { t: number; m: string }[],
  inspectionCompleteTimestamp: number,
) {
  return timestampedMoves.map(({ t, m }) => ({
    t: t - inspectionCompleteTimestamp,
    m,
  }));
}
