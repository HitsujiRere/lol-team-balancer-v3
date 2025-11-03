import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useDebugStore } from "@/stores/useDebugStore";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { randomBetween } from "@/utils/random";

export const DebugLevelButton = () => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const changeSummoner = useSummonersStore((state) => state.changeSummoner);

  const handleSetLevel = (min: number, max: number) => {
    const names = useRoomNamesStore.getState().names();
    names.forEach((name) => {
      changeSummoner(name, { level: randomBetween(min, max + 1) });
    });
  };

  if (!debugMode) {
    return <div />;
  }

  return (
    <ButtonGroup>
      <Button variant="destructive" onClick={() => handleSetLevel(1, 1000)}>
        <WrenchIcon />
        レベル設定：1 ~ 1000
      </Button>
      <Button variant="destructive" onClick={() => handleSetLevel(1, 50)}>
        1 ~ 50
      </Button>
      <Button variant="destructive" onClick={() => handleSetLevel(1, 200)}>
        1 ~ 200
      </Button>
    </ButtonGroup>
  );
};
