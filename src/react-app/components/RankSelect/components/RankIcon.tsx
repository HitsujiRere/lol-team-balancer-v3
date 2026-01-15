import { cn } from "@heroui/react";
import { CircleIcon, CircleQuestionMarkIcon } from "lucide-react";
import {
  isBronze,
  isDiamond,
  isEmerald,
  isGold,
  isIron,
  isMasterPlus,
  isPlatinum,
  isSilver,
  type Rank,
} from "#models/rank";

export const RankIcon = ({ rank }: { rank?: Rank }) => {
  if (!rank || rank === "UNRANKED") {
    return <CircleQuestionMarkIcon className="size-4" />;
  }

  return (
    <CircleIcon
      className={cn("size-4 stroke-none", {
        "fill-lol-iron": isIron(rank),
        "fill-lol-bronze": isBronze(rank),
        "fill-lol-silver": isSilver(rank),
        "fill-lol-gold": isGold(rank),
        "fill-lol-platinum": isPlatinum(rank),
        "fill-lol-emerald": isEmerald(rank),
        "fill-lol-diamond": isDiamond(rank),
        "fill-lol-master": isMasterPlus(rank),
      })}
    />
  );
};
