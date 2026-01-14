import type { Key } from "react";
import type { Summoner } from "../../../types/summoner";
import { LevelCell } from "./LevelCell";
import { MuteCell } from "./MuteCell";
import { RankCell } from "./RankCell";

export const renderCell = (summoner: Summoner, column: Key) => {
  if (column === "name") {
    return <div>{summoner.name}</div>;
  }

  if (column === "level") {
    return <LevelCell summoner={summoner} />;
  }

  if (column === "rank") {
    return <RankCell summoner={summoner} />;
  }

  if (column === "isMute") {
    return <MuteCell summoner={summoner} />;
  }
};
