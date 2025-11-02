import type { TeamNames } from "../types/team";
import { sortedNames } from "./sortedNames";

export const balancedMeander = (
  teamNames: TeamNames,
  parameter: "level" | "rank",
): TeamNames => {
  const names = sortedNames(
    [...teamNames.Blue, ...teamNames.Red],
    parameter,
    true,
  );
  const blue: string[] = [];
  const red: string[] = [];
  names.forEach((name, index) => {
    if (index % 4 === 0 || index % 4 === 3) {
      blue.push(name);
    } else {
      red.push(name);
    }
  });
  return { Blue: blue, Red: red };
};
