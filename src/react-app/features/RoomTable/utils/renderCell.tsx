import { Button, cn, Input, NumberInput } from "@heroui/react";
import { MicIcon, MicOffIcon } from "lucide-react";
import type { Key } from "react";
import type { Summoner } from "../../../types/summoner";

export const renderCell = (summoner: Summoner, columnKey: Key) => {
  if (columnKey === "name") {
    return <div>{summoner.name}</div>;
  }

  if (columnKey === "level") {
    return (
      <NumberInput
        aria-label="level"
        value={summoner.level}
        minValue={0}
        onValueChange={() => {}}
        className="max-w-32"
        isWheelDisabled
        startContent={<span>Lv.</span>}
      />
    );
  }

  if (columnKey === "rank") {
    return (
      <Input
        aria-label="rank"
        value={summoner.rank}
        onValueChange={() => {}}
        className="max-w-32"
      />
    );
  }

  if (columnKey === "is-mute") {
    return (
      <Button
        aria-label="is-mute"
        isIconOnly
        size="sm"
        variant={summoner.isMute ? "flat" : "light"}
        className="group"
      >
        <MicIcon
          className={cn("absolute size-4", summoner.isMute && "opacity-0")}
        />
        <MicOffIcon
          className={cn("absolute size-4", !summoner.isMute && "opacity-0")}
        />
      </Button>
    );
  }

  return 0;
};
