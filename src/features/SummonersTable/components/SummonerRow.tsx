import { MicIcon, MicOff, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { RankSelect } from "@/components/RankSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import type { Rank } from "@/types/rank";

export type SummonerRowProps = {
  name: string;
};

export const SummonerRow = ({ name }: SummonerRowProps) => {
  const [rank, setRank] = useState<Rank>("UNRANKED");

  return (
    <TableRow className="hover:bg-muted/35">
      <TableCell>
        <Checkbox defaultChecked />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <RankSelect rank={rank} onChangeRank={setRank} />
      </TableCell>
      <TableCell>
        <Toggle title="聞き専を切り替える" variant="ghost" size="sm">
          <MicIcon className="transition-opacity group-data-[state=on]/toggle:opacity-0" />
          <MicOff className="absolute transition-opacity group-data-[state=off]/toggle:opacity-0" />
        </Toggle>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon-sm">
          <Trash2Icon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
