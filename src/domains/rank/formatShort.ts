import type { Rank } from "./rank";

const rankToJp: Record<Rank, string> = {
  UNRANKED: "Un",
  IRON_IV: "I4",
  IRON_III: "I3",
  IRON_II: "I2",
  IRON_I: "I1",
  BRONZE_IV: "B4",
  BRONZE_III: "B3",
  BRONZE_II: "B2",
  BRONZE_I: "B1",
  SILVER_IV: "S4",
  SILVER_III: "S3",
  SILVER_II: "S2",
  SILVER_I: "S1",
  GOLD_IV: "G4",
  GOLD_III: "G3",
  GOLD_II: "G2",
  GOLD_I: "G1",
  PLATINUM_IV: "P4",
  PLATINUM_III: "P3",
  PLATINUM_II: "P2",
  PLATINUM_I: "P1",
  EMERALD_IV: "E4",
  EMERALD_III: "E3",
  EMERALD_II: "E2",
  EMERALD_I: "E1",
  DIAMOND_IV: "D4",
  DIAMOND_III: "D3",
  DIAMOND_II: "D2",
  DIAMOND_I: "D1",
  MASTER: "M",
  GRANDMASTER: "GM",
  CHALLENGER: "C",
} as const;

export const formatShortRank = (rank?: Rank): string => {
  return rankToJp[rank ?? "UNRANKED"];
};
