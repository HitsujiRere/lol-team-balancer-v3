import { CopyIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { formatRank, pointToRank, rankToPoint } from "@/types/rank";
import { average } from "@/utils/average";
import type { Team } from "../types/team";

export type TeamTagProps = {
  team: Team;
  names: string[];
};

export const TeamTag = ({ team, names }: TeamTagProps) => {
  const summoners = useSummonersStore(
    useShallow((state) =>
      names
        .map((name) => state.summoners[name])
        .filter((summoner) => summoner !== undefined),
    ),
  );

  const aveLevel = average(summoners.map((summoner) => summoner.level));
  const aveRank = pointToRank(
    average(summoners.map((summoner) => rankToPoint(summoner.rank))),
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 place-self-stretch rounded-md border-2 p-4",
        {
          "border-blue-400 bg-blue-100": team === "Blue",
          "border-red-400 bg-red-100": team === "Red",
        },
      )}
    >
      <div className="font-bold text-lg">{team} Team</div>
      <div className="flex items-center gap-4">
        <div>平均ランク: {formatRank(aveRank)}</div>
        <div>平均レベル: {aveLevel}</div>
      </div>
      <div>
        <Button variant="outline">
          <CopyIcon />
          コピー
        </Button>
      </div>
    </div>
  );
};
