import { cn } from "@/lib/utils";
import { formatRank, RANKS, type Rank } from "@/types/rank";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { rankClasses } from "./utils/rankClasses";

export type RankSelectProps = {
  rank: Rank;
  onChange: (rank: Rank) => void;
};

export const RankSelect = ({ rank, onChange }: RankSelectProps) => {
  return (
    <NativeSelect
      value={rank}
      className={cn(rankClasses(rank), "w-34")}
      onChange={(event) => onChange(event.target.value as Rank)}
    >
      {RANKS.map((optionRank) => (
        <NativeSelectOption
          key={optionRank}
          value={optionRank}
          className={rankClasses(optionRank)}
        >
          {formatRank(optionRank)}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
