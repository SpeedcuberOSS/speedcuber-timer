// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Algorithm, { AlgorithmDialog } from "./Algorithm";
import { useEffect, useState } from "react";

import { Button } from "react-native-paper";
import { STIF } from "../../../lib/stif";
import ScrambleHeader from "./ScrambleHeader";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export interface ScrambleHeaderProps {
  puzzle?: STIF.Puzzle;
  smartPuzzle?: STIF.SmartPuzzle;
  positioning?: [idx: number, total: number];
  layoutHeightLimit?: number;
}
export interface ScrambleProps extends ScrambleHeaderProps {
  algorithm: STIF.Algorithm;
}

export default function Scramble({
  puzzle,
  smartPuzzle,
  algorithm,
  positioning,
  layoutHeightLimit,
}: ScrambleProps) {
  const scrambleIdx = positioning?.[0] ?? 0;

  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();

  const [containerHeight, setContainerHeight] = useState(0);
  const [overflows, setOverflows] = useState<number[]>([]);
  useEffect(() => {
    const isOverflowing =
      containerHeight > (layoutHeightLimit ?? containerHeight);
    if (isOverflowing) setOverflows([...overflows, scrambleIdx]);
  }, [containerHeight]);

  return (
    <View
      onLayout={event => setContainerHeight(event.nativeEvent.layout.height)}>
      {(puzzle || smartPuzzle || positioning) && (
        <ScrambleHeader {...{ puzzle, smartPuzzle, positioning }} />
      )}
      <Algorithm algorithm={algorithm} layoutHeightLimit={layoutHeightLimit}/>
      {/* {overflows.includes(scrambleIdx) ? (
        <Button onPress={() => setShowDialog(true)}>
          {t('scramble.show')}
        </Button>
      ) : (
        <Algorithm algorithm={algorithm} />
      )}
      <AlgorithmDialog
        algorithm={algorithm}
        isVisible={showDialog}
        onDismiss={() => setShowDialog(false)}
      /> */}
    </View>
  );
}