import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { randomInt } from "../../../utils/random";
import { isOpenMatchupEditorAtom } from "../stores/isOpenMatchupEditorAtom";
import { goodMatchupsAtom } from "../stores/matchupsAtom";
import { rosterAtom } from "../stores/rosterAtom";
import { useRandomizeMatchup } from "./useRandomizeMatchup";

export const useCreateMatchups = () => {
  const randomizeMatchup = useRandomizeMatchup();

  return useAtomCallback(
    useCallback(
      (_get, set, roster: string[]) => {
        if (roster.length !== 10) {
          return;
        }

        set(rosterAtom, roster);

        const newMatchups = [...Array(100)].map(() => {
          const shuffledRoster = shuffled(roster);

          return {
            // biome-ignore-start lint/style/noNonNullAssertion: shuffledRoster.length === 10
            blue: {
              top: shuffledRoster[0]!,
              jg: shuffledRoster[1]!,
              mid: shuffledRoster[2]!,
              bot: shuffledRoster[3]!,
              sup: shuffledRoster[4]!,
            },
            red: {
              top: shuffledRoster[5]!,
              jg: shuffledRoster[6]!,
              mid: shuffledRoster[7]!,
              bot: shuffledRoster[8]!,
              sup: shuffledRoster[9]!,
            },
            // biome-ignore-end lint/style/noNonNullAssertion: shuffledRoster.length === 10
          };
        });

        set(goodMatchupsAtom, newMatchups);

        randomizeMatchup();

        set(isOpenMatchupEditorAtom, true);
      },
      [randomizeMatchup],
    ),
  );
};

const shuffled = <T>(array: readonly T[]): T[] => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    // biome-ignore lint/style/noNonNullAssertion: i,jは常に配列の範囲内
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!];
  }

  return newArray;
};
