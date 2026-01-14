import { useSetAtom } from "jotai";
import type { Key } from "react";
import { LevelInput } from "../../../components/LevelInput";
import { MuteToggle } from "../../../components/MuteToggle";
import { RankSelect } from "../../../components/RankSelect";
import { summonerFamily } from "../../../stores/summoner";
import type { Summoner } from "../../../types/summoner";

export const SummonerCell = ({
  summoner,
  column,
}: {
  summoner: Summoner;
  column: Key;
}) => {
  const setSummoner = useSetAtom(summonerFamily(summoner.name));

  if (column === "name") {
    return <div>{summoner.name}</div>;
  }

  if (column === "level") {
    return (
      <LevelInput
        level={summoner.level}
        onChange={(level) =>
          setSummoner((summoner) => {
            summoner.level = level;
          })
        }
      />
    );
  }

  if (column === "rank") {
    return (
      <RankSelect
        rank={summoner.rank}
        onChange={(rank) =>
          setSummoner((summoner) => {
            summoner.rank = rank;
          })
        }
      />
    );
  }

  if (column === "isMute") {
    return (
      <MuteToggle
        isMute={summoner.isMute}
        onChange={(isMute) =>
          setSummoner((summoner) => {
            summoner.isMute = isMute;
          })
        }
      />
    );
  }
};
