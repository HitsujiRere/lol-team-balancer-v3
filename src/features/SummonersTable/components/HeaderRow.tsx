import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { useActivesStore } from "@/stores/useActivesStore";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { toOpggMultisearchLink } from "@/types/riotId";

export const HeaderRow = () => {
  const isActive = useActivesStore((state) => state.isAllActive());
  const switchAllActive = useActivesStore((state) => state.switchAllActive);

  const roomRiotIds = useRoomNamesStore(useShallow((state) => state.riotIds()));

  return (
    <TableRow>
      <TableHead>
        <Checkbox
          checked={isActive}
          onCheckedChange={(active) => switchAllActive(active)}
        />
      </TableHead>
      <TableHead>
        <div className="flex items-center gap-2">
          サモナー名
          <a
            href={toOpggMultisearchLink(roomRiotIds)}
            target="_blank"
            rel="noopener"
          >
            <Button variant="link" size="sm">
              [OP.GGマルチサーチ]
            </Button>
          </a>
        </div>
      </TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
      <TableHead>削除</TableHead>
    </TableRow>
  );
};
