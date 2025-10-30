"use client";

import { DicesIcon, FlagIcon, ScaleIcon, WormIcon } from "lucide-react";
import { useId, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useActivesStore } from "@/stores/useActivesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { shuffled } from "@/utils/shuffled";
import { TeamGroup } from "./components/TeamGroup";
import type { Member } from "./types/member";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const [blueTeamNames, setBlueTeamNames] = useState<string[]>([]);
  const [redTeamNames, setRedTeamNames] = useState<string[]>([]);

  const sortedByLevel = (names: readonly string[]): string[] => {
    const summoners = useSummonersStore.getState().summoners;
    return names.toSorted(
      (x, y) => (summoners[x]?.level ?? 0) - (summoners[y]?.level ?? 0),
    );
  };

  const parameterSwitchId = useId();

  return (
    <>
      <div className="flex gap-4">
        <Button
          disabled={activeNames.length !== 10}
          onClick={() => {
            setBlueTeamNames(sortedByLevel(activeNames.slice(0, 5)));
            setRedTeamNames(sortedByLevel(activeNames.slice(5, 10)));
          }}
        >
          <FlagIcon />
          メンバー更新：試合参加 {activeNames.length}/10人
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Label htmlFor={parameterSwitchId} className="text-base">
            レベル
          </Label>
          <Switch id={parameterSwitchId} />
          <Label htmlFor={parameterSwitchId} className="text-base">
            ランク
          </Label>
        </div>
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
            setBlueTeamNames(sortedByLevel(names.slice(0, 5)));
            setRedTeamNames(sortedByLevel(names.slice(5, 10)));
          }}
        >
          <DicesIcon />
          ランダム
        </Button>
      </div>

      <div>
        <TeamGroup
          members={[
            ...blueTeamNames.map<Member>((name) => ({ name, team: "Blue" })),
            ...redTeamNames.map<Member>((name) => ({ name, team: "Red" })),
          ]}
        />
      </div>
    </>
  );
};
