import { useSetAtom } from "jotai";
import type { Key } from "react";
import { LevelInput } from "../../../components/LevelInput";
import { MuteToggle } from "../../../components/MuteToggle";
import { RankSelect } from "../../../components/RankSelect";
import { SummonerInfo } from "../../../components/SummonerInfo";
import { summonerFamily } from "../../../stores/summoner";
import { lockedRole } from "../../../types/priority";
import { ROLES } from "../../../types/role";
import type { Summoner } from "../../../types/summoner";
import { PrioritySelect } from "./PrioritySelect";
import { TeamTabs } from "./TeamTabs";

export const SummonerCell = ({
  summoner,
  column,
}: {
  summoner: Summoner;
  column: Key;
}) => {
  const setSummoner = useSetAtom(summonerFamily(summoner.name));

  if (column === "name") {
    return (
      <SummonerInfo
        name={summoner.name}
        riotId={summoner.riotId}
        iconId={summoner.iconId}
        fetchStatus={summoner.fetchStatus}
      />
    );
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
        wins={summoner.rankWins}
        losses={summoner.rankLosses}
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

  if (column.toString().startsWith("priorities")) {
    const locked = lockedRole(summoner.priorities);

    for (const role of ROLES) {
      if (column === `priorities.${role}`) {
        return (
          <PrioritySelect
            priority={summoner.priorities[role]}
            onChange={(priority) =>
              setSummoner((summoner) => {
                summoner.priorities[role] = priority;
              })
            }
            disabled={!!locked && locked !== role}
          />
        );
      }
    }
  }

  if (column === "fixedTeam") {
    return (
      <TeamTabs
        team={summoner.fixedTeam}
        onChange={(team) =>
          setSummoner((summoner) => {
            summoner.fixedTeam = team;
          })
        }
      />
    );
  }
};
