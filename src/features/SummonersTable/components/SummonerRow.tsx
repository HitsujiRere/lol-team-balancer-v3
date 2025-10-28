import { MicIcon, MicOff, Trash2Icon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { RankSelect } from "@/components/RankSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { toOpggLink } from "@/types/riotId";

export type SummonerRowProps = {
  name: string;
};

export const SummonerRow = ({ name }: SummonerRowProps) => {
  const summoner = useSummonersStore(
    useShallow((state) => state.getSummoner(name)),
  );
  const changeSummoner = useSummonersStore((state) => state.changeSummoner);
  const removeFromRoom = useRoomNamesStore((state) => state.remove);

  return (
    <TableRow className="hover:bg-muted/35">
      <TableCell>
        <Checkbox defaultChecked />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-between">
          {summoner.riotId ? (
            <a href={toOpggLink(summoner.riotId)} target="_blank">
              <Button className="px-0!" variant="link">
                {name} [OP.GG]
              </Button>
            </a>
          ) : (
            <div>{name}</div>
          )}
        </div>
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
