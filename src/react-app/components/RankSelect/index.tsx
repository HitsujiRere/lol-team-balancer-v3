import { cn, Select, SelectItem, type Selection } from "@heroui/react";
import { useEffect, useState } from "react";
import { formatRank, formatShortRank, RANKS, type Rank } from "#domain/rank";
import { RankIcon } from "./components/RankIcon";

const Items = RANKS.map((rank) => ({ rank }));

export const RankSelect = ({
  rank,
  wins,
  losses,
  onChange,
}: {
  rank: Rank;
  wins?: number;
  losses?: number;
  onChange: (rank: Rank) => void;
}) => {
  const [value, setValue] = useState<Selection>(new Set([rank]));

  useEffect(() => {
    setValue(new Set([rank]));
  }, [rank]);

  return (
    <div className="flex items-center gap-2">
      <Select
        aria-label="Rank"
        placeholder="ランクを選択"
        items={Items}
        selectedKeys={value}
        onSelectionChange={(x) => {
          setValue(x);
          onChange((x.currentKey as Rank | undefined) ?? "UNRANKED");
        }}
        className="w-40"
        classNames={{
          popoverContent: "w-80",
        }}
        listboxProps={{
          classNames: {
            list: "grid grid-cols-4 gap-0",
          },
        }}
        maxListboxHeight={512}
        renderValue={(items) => {
          return items.map((item) => (
            <div key={item.key}>
              <div className="flex items-center gap-1">
                <RankIcon rank={item.data?.rank} />
                <div>{formatRank(item.data?.rank)}</div>
              </div>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem
            key={item.rank}
            textValue={formatRank(item.rank)}
            className={cn(item.rank === "UNRANKED" && "col-span-4")}
          >
            <div className="flex items-center gap-1">
              <RankIcon rank={item.rank} />
              <div>
                {item.rank === "UNRANKED"
                  ? formatRank(item.rank)
                  : formatShortRank(item.rank)}
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      {wins && losses && (
        <div className="flex flex-col items-end text-tiny">
          <div>{wins}勝</div>
          <div>{losses}負</div>
        </div>
      )}
    </div>
  );
};
