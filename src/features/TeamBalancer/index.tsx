"use client";

import { DicesIcon, FlagIcon, ScaleIcon, WormIcon } from "lucide-react";
import { useId, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useActivesStore } from "@/stores/useActivesStore";
import { TeamGroup } from "./components/TeamGroup";

export const TeamBalancer = () => {
  const activeNames = useActivesStore(
    useShallow((state) => state.getActiveNames()),
  );

  const [teamNames, setTeamNames] = useState<string[]>([]);

  const parameterSwitchId = useId();

  return (
    <>
      <div className="flex gap-4">
        <Button
          disabled={activeNames.length !== 10}
          onClick={() => setTeamNames(activeNames)}
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
        <Button>
          <DicesIcon />
          ランダム
        </Button>
      </div>

      <div>
        <TeamGroup members={teamNames.map((name) => ({ name, team: "Red" }))} />
      </div>
    </>
  );
};
