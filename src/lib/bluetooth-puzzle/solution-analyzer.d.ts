// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

declare module 'solution-analyzer' {
  export function analyzeSolution(
    scramble: string,
    solution: string,
    method: Method,
  ): SolutionAnalysis;
}

type Method = 'CFOP' | 'ZZ' | 'Roux';

interface SolutionStep {
  label: string;
  moves: string[];
}

interface SolutionAnalysis {
  solved: boolean;
  steps: SolutionStep[];
}
