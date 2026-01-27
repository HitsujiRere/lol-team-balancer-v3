import { Button, cn } from "@heroui/react";
import { useAtom } from "jotai";
import { GripVerticalIcon } from "lucide-react";
import { LevelInput } from "../../../components/LevelInput";
import { MuteToggle } from "../../../components/MuteToggle";
import { RankSelect } from "../../../components/RankSelect";
import { SummonerInfo } from "../../../components/SummonerInfo";
import { summonerFamily } from "../../../stores/summonersAtom";
import type { Role } from "../../../types/role";
import type { TeamName } from "../../../types/teamName";

export const SummonerCard = ({
  name,
  team,
}: {
  name: string;
  team: TeamName;
  role: Role;
}) => {
  const [summoner, setSummoner] = useAtom(summonerFamily(name));

  return (
    <div
      className={cn(
        "box-border grid gap-2 rounded-medium border-medium bg-background px-4 py-2",
        team === "blue"
          ? "col-start-1 border-blue-400"
          : "col-start-3 border-red-400",
      )}
    >
      <div className="flex items-center gap-4">
        <Button size="sm" variant="light" isIconOnly>
          <GripVerticalIcon />
        </Button>
        <SummonerInfo
          name={summoner.name}
          riotId={summoner.riotId}
          iconId={summoner.iconId}
          fetchStatus={summoner.fetchStatus}
        />
      </div>

      <div className="flex items-center justify-between">
        <LevelInput
          level={summoner.level}
          onChange={(level) =>
            setSummoner((summoner) => {
              summoner.level = level;
            })
          }
        />

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

        <MuteToggle
          isMute={summoner.isMute}
          onChange={(isMute) =>
            setSummoner((summoner) => {
              summoner.isMute = isMute;
            })
          }
        />
      </div>
    </div>
  );
};
