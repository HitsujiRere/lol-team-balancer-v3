import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { RANKS, type Rank } from "#domain/rank";
import { debugModeAtom } from "../../../stores/debugModeAtom";
import { summonersAtom } from "../../../stores/summonersAtom";
import { choice } from "../../../utils/choice";
import { randomInt } from "../../../utils/random";

export const DebugActions = () => {
  const debugMode = useAtomValue(debugModeAtom);

  const setSummoners = useSetAtom(summonersAtom);

  const randomizeLevel = () => {
    setSummoners((summoners) => {
      Object.keys(summoners).forEach((name) => {
        summoners[name].level = randomInt(1, 100);
      });
    });
  };

  const randomizeRank = (min: Rank = "UNRANKED", max: Rank = "CHALLENGER") => {
    setSummoners((summoners) => {
      Object.keys(summoners).forEach((name) => {
        summoners[name].rank = choice(
          RANKS.slice(RANKS.indexOf(min), RANKS.indexOf(max) + 1),
        );
      });
    });
  };

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
