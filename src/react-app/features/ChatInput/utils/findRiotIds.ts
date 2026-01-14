import { formatRiotId, parseRiotId, type RiotId } from "../../../types/riotId";

export const findRiotIds = (message: string): RiotId[] => {
  const names =
    message
      .trim()
      .match(/.+ #.+(?=(がロビーに参加しました。| joined the lobby))/gm) ?? [];

  const ids = names
    .map(parseRiotId)
    .filter((id) => id.isOk())
    .map((id) => id.value);

  const uniquedIds = [
    ...new Map(ids.map((id) => [formatRiotId(id), id])).values(),
  ];

  return uniquedIds;
};
