import { okAsync } from "neverthrow";
import iconList from "../../assets/icon-list.json";
import { dataNotFound, internalServerError } from "../../domain/Error";
import type { RiotApi } from "../../domain/RiotApi";
import { summonerSchema } from "../../domain/Summoner";
import { DebugPuuId } from "../../types/puuid";
import { choice } from "../../utils/choice";
import { randomInt } from "../../utils/random";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

export const getSummoner = (
  riotApiKey: string,
  puuid: string,
): ReturnType<RiotApi["getSummoner"]> => {
  if (puuid === DebugPuuId) {
    return okAsync({
      puuid,
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
    .andThen(safeZodParse(summonerSchema))
    .mapErr((error) => {
      console.error(error);
      if (error.type === "http") {
        if (error.status === 404) {
          return dataNotFound();
        }
      }
      return internalServerError();
    })
    .map((res) => res);
};
