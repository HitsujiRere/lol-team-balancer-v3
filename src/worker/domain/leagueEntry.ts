import type { RankNumber, Tier } from "#domain/rank";
import type { Queue } from "./queue";

export type LeagueEntry = {
  leagueId: string;
  queueType: Queue;
  tier: Tier;
  rank: RankNumber;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};
