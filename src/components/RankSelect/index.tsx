import { formatRank, RANKS, type Rank } from "@/types/rank";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { rankClasses } from "./utils/rankClasses";

export type RankSelectProps = {
  rank: Rank;
  onChangeRank: (rank: Rank) => void;
};

export const RankSelect = ({ rank, onChangeRank }: RankSelectProps) => {
  return (
    <NativeSelect
      value={rank}
      className={rankClasses(rank)}
      onChange={(event) => onChangeRank(event.target.value as Rank)}
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
