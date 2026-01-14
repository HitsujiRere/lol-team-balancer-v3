export const isUnranked = (tier: unknown) => {
  return tier === "UNRANKED";
};

export const isIron = (tier: unknown) => {
  return (
    tier === "IRON" ||
    tier === "IRON_I" ||
    tier === "IRON_II" ||
    tier === "IRON_III" ||
    tier === "IRON_IV"
  );
};

export const isBronze = (tier: unknown) => {
  return (
    tier === "BRONZE" ||
    tier === "BRONZE_I" ||
    tier === "BRONZE_II" ||
    tier === "BRONZE_III" ||
    tier === "BRONZE_IV"
  );
};

export const isSilver = (tier: unknown) => {
  return (
    tier === "SILVER" ||
    tier === "SILVER_I" ||
    tier === "SILVER_II" ||
    tier === "SILVER_III" ||
    tier === "SILVER_IV"
  );
};

export const isGold = (tier: unknown) => {
  return (
    tier === "GOLD" ||
    tier === "GOLD_I" ||
    tier === "GOLD_II" ||
    tier === "GOLD_III" ||
    tier === "GOLD_IV"
  );
};

export const isPlatinum = (tier: unknown) => {
  return (
    tier === "PLATINUM" ||
    tier === "PLATINUM_I" ||
    tier === "PLATINUM_II" ||
    tier === "PLATINUM_III" ||
    tier === "PLATINUM_IV"
  );
};

export const isEmerald = (tier: unknown) => {
  return (
    tier === "EMERALD" ||
    tier === "EMERALD_I" ||
    tier === "EMERALD_II" ||
    tier === "EMERALD_III" ||
    tier === "EMERALD_IV"
  );
};

export const isDiamond = (tier: unknown) => {
  return (
    tier === "DIAMOND" ||
    tier === "DIAMOND_I" ||
    tier === "DIAMOND_II" ||
    tier === "DIAMOND_III" ||
    tier === "DIAMOND_IV"
  );
};

export const isMasterPlus = (tier: unknown) => {
  return tier === "MASTER" || tier === "GRANDMASTER" || tier === "CHALLENGER";
};
