import { err, ok, type Result } from "neverthrow";
import type { RiotId } from "./riotId";

export const parseRiotId = (formatted: string): Result<RiotId, void> => {
  const res = formatted
    .trim()
    .match(/^\u2066*(?<name>.+?)[ \u2069]*#\u2066*(?<tag>.+?)\u2069*$/);
  if (res === null) {
    return err();
  }

  const { name, tag } = res.groups ?? {};
  if (name === undefined || tag === undefined) {
    return err();
  }

  return ok({ gameName: name, tagLine: tag });
};
