import { WrenchIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebugStore } from "@/stores/useDebugStore";

export type DebugMessageButtonProps = {
  setMessage: (message: string) => void;
};

export const DebugMessageButton = ({ setMessage }: DebugMessageButtonProps) => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const setRandomMessage = useCallback(() => {
    const names = templateNames.map(
      (name) => `${name}${Math.floor(Math.random() * 10)} #DEBUG`,
    );
    const newMessage = names
      .map((name) => `${name}がロビーに参加しました。`)
      .join("\n");
    setMessage(newMessage);
  }, [setMessage]);

  return (
    <Button
      variant="secondary"
      className={cn(!debugMode && "hidden")}
      onClick={setRandomMessage}
    >
      <WrenchIcon />
      デバッグメッセージ
    </Button>
  );
};

const templateNames = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
  "キウイ",
] as const;
