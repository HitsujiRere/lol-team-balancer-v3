"use client";

import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import {
  ArrowDownUpIcon,
  DicesIcon,
  FlagIcon,
  ScaleIcon,
  SortDescIcon,
  WormIcon,
} from "lucide-react";
import { useId, useState } from "react";
import { useShallow } from "zustand/shallow";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useActivesStore } from "@/stores/useActivesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { toOpggMultisearchLink } from "@/types/riotId";
import { shuffled } from "@/utils/shuffled";
import { MemberView } from "./components/MemberView";
import { TeamGroup } from "./components/TeamGroup";
import { useSortTeamNames } from "./hooks/useSortTeamNames";
import { TEAMS, type Team } from "./types/team";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const parameterSwitchId = useId();
  const {
    teamNames,
    setTeamNames,
    isSorting,
    sortTeamNames,
    sortParameter,
    setSortParameter,
    isSortAsc,
    setIsSortAsc,
    swapMember,
  } = useSortTeamNames();

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
          <CopyButton data={copyText} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button disabled={isSorting} onClick={() => sortTeamNames()}>
          <div className="relative">
            <SortDescIcon
              className={cn("transition-opacity", {
                "opacity-0": !isSorting,
              })}
            />
            <ArrowDownUpIcon
              className={cn("absolute inset-0 transition-opacity", {
                "opacity-0": isSorting,
              })}
            />
          </div>
          {isSorting ? "ソート中" : "ソート！"}
        </Button>
        <div className="flex items-center gap-1">
          <Label htmlFor={parameterSwitchId} className="text-base">
            レベル
          </Label>
          <Switch
            side="both"
            id={parameterSwitchId}
            checked={sortParameter === "rank"}
            onCheckedChange={(checked) =>
              setSortParameter(checked ? "rank" : "level")
            }
          />
          <Label htmlFor={parameterSwitchId} className="text-base">
            ランク
          </Label>
        </div>
        <Button onClick={() => setIsSortAsc(!isSortAsc)}>
          <div className="relative">
            <SortDescIcon
              className={cn("transition-transform", {
                "rotate-x-180": isSortAsc,
              })}
            />
          </div>
          ソート({isSortAsc ? "昇順" : "降順"})
        </Button>
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
              return { Blue: names.slice(0, 5), Red: names.slice(5, 10) };
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
            swapMember(activeTeam, activeName, overTeam, overName);
            setActiveTeam(overTeam);
          }}
          onDragEnd={() => {
            setActiveName(undefined);
          }}
        >
          <TeamGroup
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
