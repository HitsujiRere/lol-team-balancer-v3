import { parseRiotId, type RiotId } from "@/types/riotId";
import { uniqued } from "@/utils/uniqued";

export const findRiotIdsAndNames = (text: string): [RiotId[], string[]] => {
  const names = uniqued(text.split(/[,、，]/).map((name) => name.trim()));

  const parseds = names
    .filter((name) => name !== "")
    .map<[string, RiotId | undefined]>((name) => [name, parseRiotId(name)]);

  return [
    parseds
      .filter((parsed): parsed is [string, RiotId] => parsed[1] !== undefined)
      .map(([, id]) => id),
    parseds.filter(([, id]) => id === undefined).map(([name]) => name),
  ];
};
