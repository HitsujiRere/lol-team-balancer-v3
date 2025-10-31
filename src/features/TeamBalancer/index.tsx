"use client";

import {
  DicesIcon,
  FlagIcon,
  ScaleIcon,
  SortAscIcon,
  WormIcon,
} from "lucide-react";
import { useId, useState } from "react";
import { useShallow } from "zustand/shallow";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { useActivesStore } from "@/stores/useActivesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { toOpggMultisearchLink } from "@/types/riotId";
import { shuffled } from "@/utils/shuffled";
import { TeamGroup } from "./components/TeamGroup";
import { TEAMS, type Team } from "./types/team";
import { sortedNames } from "./utils/sortedNames";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const [teamNames, setTeamNames] = useState<Record<Team, string[]>>({
    Blue: [],
    Red: [],
  });

  const parameterSwitchId = useId();
  const [parameterSwitchChecked, setParameterSwitchChecked] = useState(true);
  const sortParameter = parameterSwitchChecked ? "rank" : "level";

  const [isSortAsc, setIsSortAsc] = useState(true);

  const teamSortedNames: Record<Team, string[]> = {
    Blue: sortedNames(teamNames.Blue, sortParameter, isSortAsc),
    Red: sortedNames(teamNames.Red, sortParameter, isSortAsc),
  };

  const copyText = () => {
    const summoners = useSummonersStore.getState().summoners;
    return TEAMS.map((team) => {
      const opggLink = toOpggMultisearchLink(
        teamSortedNames[team]
          .map((name) => summoners[name])
          .map((summoner) => summoner?.riotId)
          .filter((id) => id !== undefined),
      );
      return `【${team}】\n${opggLink}\n${teamSortedNames[team].join("\n")}`;
    }).join("\n");
  };

  return (
    <>
      <div className="flex gap-4">
        <Button
          disabled={activeNames.length !== 10}
          onClick={() =>
            setTeamNames({
              Blue: activeNames.slice(0, 5),
              Red: activeNames.slice(5, 10),
            })
          }
        >
          <FlagIcon />
          メンバー更新：試合参加 {activeNames.length}/10人
        </Button>

        <div>
          <CopyButton variant="secondary" data={copyText} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Label htmlFor={parameterSwitchId} className="text-base">
            レベル
          </Label>
          <Switch
            id={parameterSwitchId}
            checked={parameterSwitchChecked}
            onCheckedChange={setParameterSwitchChecked}
          />
          <Label htmlFor={parameterSwitchId} className="text-base">
            ランク
          </Label>
        </div>
        <Toggle
          variant="outline"
          className="group/toggle"
          pressed={isSortAsc}
          onPressedChange={setIsSortAsc}
        >
          <div className="relative">
            <SortAscIcon className="transition-transform group-data-[state=off]/toggle:rotate-x-180" />
          </div>
          ソート({isSortAsc ? "昇順" : "降順"})
        </Toggle>
        <Button>
          <ScaleIcon />
          平均
        </Button>
        <Button>
          <WormIcon />
          蛇行
        </Button>
        <Button
          onClick={() => {
            const names = shuffled([...teamNames.Blue, ...teamNames.Red]);
            setTeamNames({ Blue: names.slice(0, 5), Red: names.slice(5, 10) });
          }}
        >
          <DicesIcon />
          ランダム
        </Button>
      </div>

      {teamNames.Blue.length > 0 && teamNames.Red.length > 0 && (
        <TeamGroup
          blueNames={teamSortedNames.Blue}
          redNames={teamSortedNames.Red}
        />
      )}
    </>
  );
};
