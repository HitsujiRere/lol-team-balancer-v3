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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { useActivesStore } from "@/stores/useActivesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { rankToPoint } from "@/types/rank";
import { shuffled } from "@/utils/shuffled";
import { TeamGroup } from "./components/TeamGroup";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const [blueTeamNames, setBlueTeamNames] = useState<string[]>([]);
  const [redTeamNames, setRedTeamNames] = useState<string[]>([]);

  const parameterSwitchId = useId();
  const [parameterSwitchChecked, setParameterSwitchChecked] = useState(true);
  const parameter = parameterSwitchChecked ? "rank" : "level";

  const [isSortAsc, setIsSortAsc] = useState(true);

  const sortedByParameter = (names: readonly string[]): string[] => {
    const summoners = useSummonersStore.getState().summoners;
    const point = (name: string): number => {
      if (parameter === "level") {
        return summoners[name]?.level ?? 0;
      } else {
        return rankToPoint(summoners[name]?.rank ?? "UNRANKED");
      }
    };
    return names.toSorted(
      (x, y) => (point(x) - point(y)) * (isSortAsc ? 1 : -1),
    );
  };

  const sortedBlueTeamNames = sortedByParameter(blueTeamNames);
  const sortedRedTeamNames = sortedByParameter(redTeamNames);

  return (
    <>
      <div className="flex gap-4">
        <Button
          disabled={activeNames.length !== 10}
          onClick={() => {
            setBlueTeamNames(sortedByParameter(activeNames.slice(0, 5)));
            setRedTeamNames(sortedByParameter(activeNames.slice(5, 10)));
          }}
        >
          <FlagIcon />
          メンバー更新：試合参加 {activeNames.length}/10人
        </Button>
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
            const names = shuffled([...blueTeamNames, ...redTeamNames]);
            setBlueTeamNames(sortedByParameter(names.slice(0, 5)));
            setRedTeamNames(sortedByParameter(names.slice(5, 10)));
          }}
        >
          <DicesIcon />
          ランダム
        </Button>
      </div>

      {blueTeamNames.length > 0 && redTeamNames.length > 0 && (
        <TeamGroup
          blueNames={sortedBlueTeamNames}
          redNames={sortedRedTeamNames}
        />
      )}
    </>
  );
};
