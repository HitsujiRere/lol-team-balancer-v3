import type { RiotId } from "./riotId";

const DEBUG_TAG_LINE = "[DEBUG]";

export const createDebugRiotId = (gameName: string): RiotId => ({
  gameName,
  tagLine: DEBUG_TAG_LINE,
});

export const isDebugRiotId = (riotId: RiotId) => {
  return riotId.tagLine === DEBUG_TAG_LINE;
};
