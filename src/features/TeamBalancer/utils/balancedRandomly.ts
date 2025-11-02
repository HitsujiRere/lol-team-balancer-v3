import { shuffled } from "@/utils/shuffled";
import type { TeamNames } from "../types/team";

export const balancedRandomly = (teamNames: TeamNames): TeamNames => {
  const names = shuffled([...teamNames.Blue, ...teamNames.Red]);
  return { Blue: names.slice(0, 5), Red: names.slice(5, 10) };
};
