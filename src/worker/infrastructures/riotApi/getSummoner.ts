import { okAsync } from "neverthrow";
import { z } from "zod";
import iconList from "../../assets/icon-list.json";
import { dataNotFound, internalServerError } from "../../domain/error";
import { debugPuuId, type Puuid } from "../../domain/puuid";
import type { RiotApi } from "../../domain/riotApi";
import { choice } from "../../utils/choice";
import { randomInt } from "../../utils/random";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

export const fetchSchema = z.object({
  puuid: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number(),
  summonerLevel: z.number(),
});

export const getSummoner = (
  riotApiKey: string,
  puuid: Puuid,
): ReturnType<RiotApi["getSummoner"]> => {
  if (puuid === debugPuuId) {
    return okAsync({
      profileIconId: choice(iconList),
      // 2024/01/01 ~ 2026/01/01 UNIX millisecond time
      revisionDate: randomInt(1704034800000, 1767193200000),
      summonerLevel: randomInt(1, 200),
    });
  }

  return safeFetch(
    `https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(fetchSchema))
    .mapErr((error) => {
      console.error(error);
      if (error.type === "http") {
        if (error.status === 404) {
          return dataNotFound();
        }
      }
      return internalServerError();
    })
    .map((res) => ({
      profileIconId: res.profileIconId,
      revisionDate: res.revisionDate,
      summonerLevel: res.summonerLevel,
    }));
};
