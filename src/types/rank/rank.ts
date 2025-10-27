export const TIERS = [
  "UNRANKED",
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

export const RANK_NUMBERS = ["I", "II", "III", "IV"] as const;

export const RANKS = [
  "UNRANKED",
  "IRON_IV",
  "IRON_III",
  "IRON_II",
  "IRON_I",
  "BRONZE_IV",
  "BRONZE_III",
  "BRONZE_II",
  "BRONZE_I",
  "SILVER_IV",
  "SILVER_III",
  "SILVER_II",
  "SILVER_I",
  "GOLD_IV",
  "GOLD_III",
  "GOLD_II",
  "GOLD_I",
  "PLATINUM_IV",
  "PLATINUM_III",
  "PLATINUM_II",
  "PLATINUM_I",
  "EMERALD_IV",
  "EMERALD_III",
  "EMERALD_II",
  "EMERALD_I",
  "DIAMOND_IV",
  "DIAMOND_III",
  "DIAMOND_II",
  "DIAMOND_I",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

export type Tier = (typeof TIERS)[number];

export type RankNumber = (typeof RANK_NUMBERS)[number];

export type Rank = (typeof RANKS)[number];
