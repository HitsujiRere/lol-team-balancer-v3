import { NumberInput } from "@heroui/react";
import { useSetAtom } from "jotai";
import { summonerFamily } from "../../../stores/summoner";
import type { Summoner } from "../../../types/summoner";

export const LevelCell = ({ summoner }: { summoner: Summoner }) => {
  const setSummoner = useSetAtom(summonerFamily(summoner.name));

  return (
    <NumberInput
      aria-label="level"
      value={summoner.level}
      minValue={0}
      onValueChange={(level) =>
        setSummoner((summoner) => {
          summoner.level = level;
        })
      }
      className="max-w-32"
      isWheelDisabled
      startContent={<span>Lv.</span>}
      isClearable
    />
  );
};
