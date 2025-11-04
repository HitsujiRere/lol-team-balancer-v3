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
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useActivesStore } from "@/stores/useActivesStore";
import { MemberView } from "./components/MemberView";
import { TeamGroup } from "./components/TeamGroup";
import { useSortTeamNames } from "./hooks/useSortTeamNames";
import type { Team } from "./types/team";
import { balancedAverage } from "./utils/balancedAverage";
import { balancedMeander } from "./utils/balancedMeander";
import { balancedRandomly } from "./utils/balancedRandomly";

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

  const [averageRange, setAverageRange] = useState(10);

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

        <div className="flex items-center gap-1 rounded-md border px-2">
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
      </div>

      <div className="flex items-center gap-4">
        <ButtonGroup>
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
          <Button onClick={() => setIsSortAsc(!isSortAsc)}>
            <div className="relative">
              <SortDescIcon
                className={cn("transition-transform", {
                  "rotate-x-180": isSortAsc,
                })}
              />
            </div>
            {isSortAsc ? "昇順" : "降順"}
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            onClick={() =>
              setTeamNames((teamNames) =>
                balancedAverage(teamNames, sortParameter, averageRange * 0.01),
              )
            }
          >
            <ScaleIcon />
            平均
          </Button>
          <div className="flex flex-col items-center justify-evenly rounded-md border px-2">
            <div className="text-sm">許容平均ランク差上位{averageRange}%</div>
            <Slider
              className="w-44"
              step={1}
              max={30}
              min={1}
              value={[averageRange]}
              onValueChange={(values) => setAverageRange(values[0] ?? 0)}
            />
          </div>
        </ButtonGroup>
        <Button
          onClick={() =>
            setTeamNames((teamNames) =>
              balancedMeander(teamNames, sortParameter),
            )
          }
        >
          <WormIcon />
          蛇行
        </Button>
        <Button
          onClick={() =>
            setTeamNames((teamNames) => balancedRandomly(teamNames))
          }
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
