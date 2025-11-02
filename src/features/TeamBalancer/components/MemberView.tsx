import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVerticalIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { SummonerAvatar } from "@/components/SummonerAvatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSummonersStore } from "@/stores/useSummonersStore";
import type { Team } from "../types/team";

export type MemberViewProps = {
  name: string;
  team: Team;
  handle?: {
    ref: (element: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
  };
};

export const MemberView = ({ name, team, handle }: MemberViewProps) => {
  const summoner = useSummonersStore(
    useShallow((state) => state.summoners[name]),
  );
  const changeSummoner = useSummonersStore((state) => state.changeSummoner);

  if (summoner === undefined) {
    return <div />;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md border-2 bg-background p-4",
        {
          "border-blue-400": team === "Blue",
          "border-red-400": team === "Red",
        },
      )}
    >
      <div className="flex items-center gap-1 overflow-auto">
        <Button
          variant="ghost"
          size="icon"
          ref={handle?.ref}
          className={handle ? "cursor-grabbing" : "cursor-grab"}
          {...handle?.attributes}
          {...handle?.listeners}
        >
          <GripVerticalIcon />
        </Button>
        <SummonerAvatar
          name={name}
          riotId={summoner.riotId}
          iconId={summoner.iconId}
        />
      </div>
      <div className="flex items-center gap-4">
        <LevelInput
          level={summoner.level}
          onChange={(level) => changeSummoner(name, { level })}
        />
        <RankSelect
          rank={summoner.rank}
          onChange={(rank) => changeSummoner(name, { rank })}
        />
        <MuteToggle
          isMute={summoner.isMute}
          onChange={(isMute) => changeSummoner(name, { isMute })}
        />
      </div>
    </div>
  );
};
