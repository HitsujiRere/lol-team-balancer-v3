import { Button } from "@heroui/react";
import { useAtom } from "jotai";
import { ScaleIcon } from "lucide-react";
import { debugModeAtom } from "../../stores/debugModeAtom";

export const Header = () => {
  const [debugMode, setDebugMode] = useAtom(debugModeAtom);

  return (
    <header className="flex justify-between border-separator border-b-2 p-4">
      <div className="flex gap-2">
        <ScaleIcon className="size-8" />
        <h1 className="font-bold text-2xl">LoLチーム調整くん</h1>
      </div>
      <div>
        <Button
          color="secondary"
          variant={debugMode ? "solid" : "ghost"}
          onPress={() => setDebugMode((mode) => !mode)}
        >
          デバッグモード
        </Button>
      </div>
    </header>
  );
};
