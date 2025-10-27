"use client";

import { WrenchIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useDebugStore } from "@/stores/useDebugStore";

export const Header = () => {
  const debugMode = useDebugStore((state) => state.debugMode);
  const switchDebugMode = useDebugStore((state) => state.switchDebugMode);

  return (
    <header className="px-4 pt-6">
      <div className="flex items-end justify-between border-primary border-b-2 px-8 pb-1">
        <h1 className="font-bold text-2xl">LoLチームバランサー</h1>

        <Toggle
          title="デバッグモードを切り替える"
          variant="ghost"
          size="default"
          className="data-[state=on]:*:[svg]:fill-blue-400 data-[state=on]:*:[svg]:stroke-blue-400"
          pressed={debugMode}
          onPressedChange={switchDebugMode}
        >
          <WrenchIcon />
        </Toggle>
      </div>
    </header>
  );
};
