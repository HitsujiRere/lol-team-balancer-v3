"use client";

import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import {
  DicesIcon,
  FlagIcon,
  ScaleIcon,
  SortAscIcon,
  WormIcon,
} from "lucide-react";
import { useId, useState } from "react";
import { useMutative } from "use-mutative";
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
import { MemberView } from "./components/MemberView";
import { TeamGroup } from "./components/TeamGroup";
import { useSort } from "./hooks/useSort";
import { TEAMS, type Team } from "./types/team";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const [teamNames, setTeamNames] = useMutative<Record<Team, string[]>>({
    Blue: [],
    Red: [],
  });

  const parameterSwitchId = useId();
  const [parameterSwitchChecked, setParameterSwitchChecked] = useState(true);
  const [isSortAsc, setIsSortAsc] = useState(true);
  const sortedNames = useSort(
    parameterSwitchChecked ? "rank" : "level",
    isSortAsc,
  );

  const copyText = () => {
    const summoners = useSummonersStore.getState().summoners;
    return TEAMS.map((team) => {
      const opggLink = toOpggMultisearchLink(
        teamNames[team]
          .map((name) => summoners[name])
          .map((summoner) => summoner?.riotId)
          .filter((id) => id !== undefined),
      );
      return `【${team}】\n${opggLink}\n${teamNames[team].join("\n")}`;
    }).join("\n");
  };

  const dndId = useId();
  const [activeTeam, setActiveTeam] = useState<Team | undefined>(undefined);
  const [activeName, setActiveName] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="flex gap-4">
        <Button
          disabled={activeNames.length !== 10}
          onClick={() =>
            setTeamNames((teamNames) => {
              teamNames.Blue = sortedNames(activeNames.slice(0, 5));
              teamNames.Red = sortedNames(activeNames.slice(5, 10));
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
      </div>

      <div className="flex items-center gap-4">
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
            setTeamNames((teamNames) => {
              const names = shuffled([...teamNames.Blue, ...teamNames.Red]);
              teamNames.Blue = sortedNames(names.slice(0, 5));
              teamNames.Red = sortedNames(names.slice(5, 10));
            });
          }}
        >
          <DicesIcon />
          ランダム
        </Button>
      </div>

      {teamNames.Blue.length > 0 && teamNames.Red.length > 0 && (
        <DndContext
          id={dndId}
          collisionDetection={pointerWithin}
          onDragStart={({ active }) => {
            setActiveName(active.id as string);
            setActiveTeam(active.data.current?.team as Team);
          }}
          onDragOver={({ active, over }) => {
            if (over == null || active.id === over.id) {
              return;
            }
            const activeName = active.id as string;
            const activeTeam = active.data.current?.team as Team;
            const overName = over.id as string;
            const overTeam = over.data.current?.team as Team;
            setTeamNames((teamNames) => {
              const activeIndex = teamNames[activeTeam].indexOf(activeName);
              const overIndex = teamNames[overTeam].indexOf(overName);
              teamNames[activeTeam][activeIndex] = overName;
              teamNames[overTeam][overIndex] = activeName;
            });
            setActiveTeam(overTeam);
          }}
          onDragEnd={() => {
            setActiveName(undefined);
          }}
        >
          <TeamGroup
            // blueNames={teamSortedNames.Blue}
            // redNames={teamSortedNames.Red}
            blueNames={teamNames.Blue}
            redNames={teamNames.Red}
            disabledFlip={!!activeName}
          />

          <DragOverlay>
            {activeName && activeTeam && (
              <MemberView name={activeName} team={activeTeam} />
            )}
          </DragOverlay>
        </DndContext>
      )}
    </>
  );
};
