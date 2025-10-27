import { parseRiotId, type RiotId } from "@/types/riotId";
import { uniqued } from "@/utils/uniqued";

export const findRiotIds = (message: string): RiotId[] => {
  const names = uniqued(
    message
      .trim()
      .match(/.+ #.+(?=(がロビーに参加しました。| joined the lobby))/gm) ?? [],
  );

  return names
    .map((name) => parseRiotId(name))
    .filter((riotId) => riotId !== undefined);
};
