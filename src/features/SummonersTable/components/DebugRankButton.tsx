import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useDebugStore } from "@/stores/useDebugStore";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { RANKS, type Rank } from "@/types/rank";
import { choice } from "@/utils/choice";

export const DebugRankButton = () => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const changeSummoner = useSummonersStore((state) => state.changeSummoner);

  const handleSetRank = (min: Rank, max: Rank) => {
    const names = useRoomNamesStore.getState().names();
    const ranks = RANKS.slice(RANKS.indexOf(min), RANKS.indexOf(max) + 1);
    names.forEach((name) => {
      changeSummoner(name, { rank: choice(ranks) });
    });
  };

  if (!debugMode) {
    return <div />;
  }

  return (
    <ButtonGroup>
      <Button
        variant="destructive"
        onClick={() => handleSetRank("IRON_IV", "CHALLENGER")}
      >
        <WrenchIcon />
        ランク設定：Iron4 ~ Challenger
      </Button>
      <Button
        variant="destructive"
        onClick={() => handleSetRank("IRON_IV", "BRONZE_I")}
      >
        Iron4 ~ Bronze1
      </Button>
      <Button
        variant="destructive"
        onClick={() => handleSetRank("IRON_IV", "GOLD_I")}
      >
        Iron4 ~ Gold1
      </Button>
    </ButtonGroup>
  );
};
