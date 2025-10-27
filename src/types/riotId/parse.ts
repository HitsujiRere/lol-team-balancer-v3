import type { RiotId } from "./riotId";

export const parseRiotId = (formatted: string): RiotId | undefined => {
  const res = formatted
    .trim()
    .match(/^\u2066*(.+?)[ \u2069]*#\u2066*(.+?)\u2069*$/);
  if (res === null) {
    return undefined;
  }

  const [, gameName, tagLine] = res;
  if (gameName === undefined || tagLine === undefined) {
    return undefined;
  }

  return { gameName, tagLine };
};
