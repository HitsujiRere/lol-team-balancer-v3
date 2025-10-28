import { MicIcon, MicOff, Trash2Icon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { RankSelect } from "@/components/RankSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useActivesStore } from "@/stores/useActivesStore";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { toOpggLink } from "@/types/riotId";

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
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/${summoner.iconId}.png`}
              alt="サモナーアイコン"
            />
            <AvatarFallback />
          </Avatar>
          {summoner.riotId ? (
            <a href={toOpggLink(summoner.riotId)} target="_blank">
              <Button variant="link">{name} [OP.GG]</Button>
            </a>
          ) : (
            <div className="px-4">{name}</div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <LevelInput
          level={summoner.level}
          onChange={(level) => changeSummoner(name, { level })}
        />
      </TableCell>
      <TableCell>
        <RankSelect
          rank={summoner.rank}
          onChangeRank={(rank) => changeSummoner(name, { rank })}
        />
      </TableCell>
      <TableCell>
        <Toggle
          title="聞き専を切り替える"
          variant="ghost"
          pressed={summoner.isMute}
          onPressedChange={(isMute) => changeSummoner(name, { isMute })}
        >
          <MicIcon className="transition-opacity group-data-[state=on]/toggle:opacity-0" />
          <MicOff className="absolute transition-opacity group-data-[state=off]/toggle:opacity-0" />
        </Toggle>
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
