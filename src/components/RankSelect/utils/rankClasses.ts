import { cn } from "@/lib/utils";
import {
  isBronze,
  isDiamond,
  isEmerald,
  isGold,
  isIron,
  isMasterPlus,
  isPlatinum,
  isSilver,
  isUnranked,
  type Rank,
} from "@/types/rank";

export const rankClasses = (rank: Rank) =>
  cn({
    "bg-background": isUnranked(rank),
    "bg-lol-iron": isIron(rank),
    "bg-lol-bronze": isBronze(rank),
    "bg-lol-silver": isSilver(rank),
    "bg-lol-gold": isGold(rank),
    "bg-lol-platinum": isPlatinum(rank),
    "bg-lol-emerald": isEmerald(rank),
    "bg-lol-diamond": isDiamond(rank),
    "bg-lol-master": isMasterPlus(rank),
  });
