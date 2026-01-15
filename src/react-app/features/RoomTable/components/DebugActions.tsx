import { Button } from "@heroui/react";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { RANKS, type Rank } from "#models/rank";
import { debugModeAtom } from "../../../stores/debugMode";
import { summonersAtom } from "../../../stores/summoner";
import { choice } from "../../../utils/choice";
import { randomInt } from "../../../utils/random";

export const DebugActions = () => {
  const debugMode = useAtomValue(debugModeAtom);

  const randomizeLevel = useAtomCallback(
    useCallback((_get, set) => {
      set(summonersAtom, (summoners) => {
        Object.keys(summoners).forEach((name) => {
          summoners[name].level = randomInt(1, 100);
        });
      });
    }, []),
  );

  const randomizeRank = useAtomCallback(
    useCallback(
      (_get, set, min: Rank = "UNRANKED", max: Rank = "CHALLENGER") => {
        set(summonersAtom, (summoners) => {
          Object.keys(summoners).forEach((name) => {
            summoners[name].rank = choice(
              RANKS.slice(RANKS.indexOf(min), RANKS.indexOf(max) + 1),
            );
          });
        });
      },
      [],
    ),
  );

  if (!debugMode) return undefined;

  return (
    <div className="flex gap-8">
      <Button color="danger" onPress={randomizeLevel}>
        レベルランダム1~99
      </Button>
      <Button color="danger" onPress={() => randomizeRank()}>
        ランクランダム
      </Button>
      <Button
        color="danger"
        onPress={() => randomizeRank("IRON_IV", "SILVER_I")}
      >
        ランクランダムI4~S1
      </Button>
    </div>
  );
};
