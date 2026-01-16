import type { ResultAsync } from "neverthrow";
import type { RiotId } from "#domain/riotId";
import type { DataNotFound, InternalServerError } from "./error";
import type { LeagueEntry } from "./leagueEntry";
import type { Puuid } from "./puuid";
import type { Summoner } from "./summoner";

export type RiotApi = {
  getPuuid: (
    riotId: RiotId,
  ) => ResultAsync<Puuid, DataNotFound | InternalServerError>;

  getSummoner: (
    puuid: Puuid,
  ) => ResultAsync<Summoner, DataNotFound | InternalServerError>;

  getLeagueEntries: (
    puuid: Puuid,
  ) => ResultAsync<LeagueEntry[], DataNotFound | InternalServerError>;
};
