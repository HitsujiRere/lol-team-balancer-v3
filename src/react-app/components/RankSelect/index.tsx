import { Input } from "@heroui/react";
import type { Rank } from "../../types/rank";

export const RankSelect = ({
  rank,
  onChange,
}: {
  rank: Rank;
  onChange: (rank: Rank) => void;
}) => {
  return (
    <Input
      aria-label="rank"
      value={rank}
      onValueChange={(rank) => onChange(rank as Rank)}
      className="max-w-32"
    />
  );
};
