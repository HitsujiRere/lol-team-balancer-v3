import type { RiotId } from "./riotId";

export const formatRiotId = (id: RiotId): string => {
  return `${id.gameName} #${id.tagLine}`;
};
