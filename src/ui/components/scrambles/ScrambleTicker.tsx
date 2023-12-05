// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Scramble from "./Scramble";
import { ScramblesProps } from "./Scrambles";
import Ticker from "../ticker/Ticker";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ScrambleTicker({ scrambles = [], layoutHeightLimit }: ScramblesProps) {
  const { t } = useTranslation();
  const [_, setIdx] = useState(0);
  function mapToAlgorithm(idx: number) {
    return idx < scrambles.length ? (
      <Scramble
        puzzle={scrambles[idx].puzzle}
        algorithm={scrambles[idx].algorithm}
        positioning={[idx + 1, scrambles.length]}
        layoutHeightLimit={layoutHeightLimit}
      />
    ) : (
      t('scramble.hand')
    );
  }
  return (
    <Ticker
      min={0}
      max={Math.max(scrambles.length - 1, 0)}
      orientation="horizontal"
      onChange={setIdx}
      valueStyle={{ maxWidth: '80%' }}
      iconOrientation="horizontal"
      transform={mapToAlgorithm}
    />
  );
}