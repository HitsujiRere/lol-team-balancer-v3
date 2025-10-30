import { Trash2Icon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { SummonerAvatar } from "@/components/SummonerAvatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useActivesStore } from "@/stores/useActivesStore";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { FetchStatus } from "./FetchStatus";

export type SummonerRowProps = {
  name: string;
};

export const SummonerRow = ({ name }: SummonerRowProps) => {
  const isActive = useActivesStore((state) => state.isActive(name));
  const switchActive = useActivesStore((state) => state.switchActive);

  const summoner = useSummonersStore(
    useShallow((state) => state.getSummoner(name)),
  );
  const changeSummoner = useSummonersStore((state) => state.changeSummoner);

  const removeFromRoom = useRoomNamesStore((state) => state.remove);

  return (
    <TableRow className="hover:bg-muted/35">
      <TableCell>
        <Checkbox
          checked={isActive}
          onCheckedChange={(active) => switchActive(name, active)}
        />
      </TableCell>
      <TableCell>
        <SummonerAvatar
          name={summoner.name}
          riotId={summoner.riotId}
          iconId={summoner.iconId}
        />
      </TableCell>
      <TableCell>
        <FetchStatus fetchStatus={summoner.fetchStatus} />
      </TableCell>
      <TableCell>
        <LevelInput
          level={summoner.level}
          onChange={(level) => changeSummoner(name, { level })}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <RankSelect
            rank={summoner.rank}
            onChange={(rank) => changeSummoner(name, { rank })}
          />
          {summoner.rankWins && summoner.rankLosses && (
            <div className="flex flex-col leading-[1.2]">
              <div>{summoner.rankWins + summoner.rankLosses}戦</div>
              <div>{summoner.rankWins}勝</div>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <MuteToggle
          isMute={summoner.isMute}
          onChange={(isMute) => changeSummoner(name, { isMute })}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromRoom(name)}
        >
          <Trash2Icon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
