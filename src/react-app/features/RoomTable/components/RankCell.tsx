import { Input } from "@heroui/react";
import { useSetAtom } from "jotai";
import { summonerFamily } from "../../../stores/summoner";
import type { Rank } from "../../../types/rank";
import type { Summoner } from "../../../types/summoner";

export const RankCell = ({ summoner }: { summoner: Summoner }) => {
  const setSummoner = useSetAtom(summonerFamily(summoner.name));

  return (
    <Input
      aria-label="rank"
      value={summoner.rank}
      onValueChange={(rank) =>
        setSummoner((summoner) => {
          summoner.rank = rank as Rank;
        })
      }
      className="max-w-32"
    />
  );
};
