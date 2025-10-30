import { GripVerticalIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { SummonerAvatar } from "@/components/SummonerAvatar";
import { Button } from "@/components/ui/button";
import { useSummonersStore } from "@/stores/useSummonersStore";

export type MemberItemProps = {
  name: string;
};

export const MemberItem = ({ name }: MemberItemProps) => {
  const summoner = useSummonersStore(
    useShallow((state) => state.summoners[name]),
  );
  const changeSummoner = useSummonersStore((state) => state.changeSummoner);

  if (summoner === undefined) {
    return <div />;
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-border p-4">
      <div className="flex items-center">
        <Button variant="ghost" className="cursor-grab">
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
