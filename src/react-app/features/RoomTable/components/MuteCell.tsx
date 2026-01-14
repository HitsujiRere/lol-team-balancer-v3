import { Button, cn } from "@heroui/react";
import { useSetAtom } from "jotai";
import { MicIcon, MicOffIcon } from "lucide-react";
import { summonerFamily } from "../../../stores/summoner";
import type { Summoner } from "../../../types/summoner";

export const MuteCell = ({ summoner }: { summoner: Summoner }) => {
  const setSummoner = useSetAtom(summonerFamily(summoner.name));

  return (
    <Button
      aria-label="is-mute"
      onPress={() => {
        setSummoner((summoner) => {
          summoner.isMute = !summoner.isMute;
        });
      }}
      size="sm"
      isIconOnly
      variant={summoner.isMute ? "flat" : "light"}
    >
      <MicIcon className={cn("size-5", summoner.isMute && "opacity-0")} />
      <MicOffIcon
        className={cn("absolute size-5", !summoner.isMute && "opacity-0")}
      />
    </Button>
  );
};
