import { useSummonersStore } from "@/stores/useSummonersStore";
import { rankToPoint } from "@/types/rank";
import { average } from "@/utils/average";
import { choice } from "@/utils/choice";
import { shuffled } from "@/utils/shuffled";
import type { TeamNames } from "../types/team";

export const balancedAverage = (
  teamNames: TeamNames,
  parameter: "level" | "rank",
): TeamNames => {
  const names = shuffled([...teamNames.Blue, ...teamNames.Red]);
  const summoners = useSummonersStore.getState().summoners;
  const points = Object.fromEntries(
    names.map<[string, number]>((name) => {
      if (parameter === "level") {
        return [name, summoners[name]?.level ?? 0];
      } else {
        return [name, rankToPoint(summoners[name]?.rank ?? "UNRANKED")];
      }
    }),
  );
  const isMutes = Object.fromEntries(
    names.map((name) => [name, summoners[name]?.isMute ?? false]),
  );

  const bestTeamNamesList: TeamNames[] = [];
  for (let i = 0; i < 1 << names.length; i++) {
    const blue: string[] = [];
    const red: string[] = [];
    names.forEach((name, index) => {
      if (i & (1 << index)) {
        blue.push(name);
      } else {
        red.push(name);
      }
    });
    if (blue.length !== red.length) {
      continue;
    }

    const blueMutes = blue.reduce(
      (mutes, name) => (isMutes[name] ? mutes + 1 : mutes),
      0,
    );
    const redMutes = red.reduce(
      (mutes, name) => (isMutes[name] ? mutes + 1 : mutes),
      0,
    );
    if (Math.abs(blueMutes - redMutes) > 1) {
      continue;
    }

    const bluePoint = average(blue.map((name) => points[name] ?? 0));
    const redPoint = average(red.map((name) => points[name] ?? 0));
    const pointDiff = Math.abs(bluePoint - redPoint);
    if (pointDiff < 1) {
      bestTeamNamesList.push({ Blue: blue, Red: red });
    }
  }
  return choice(bestTeamNamesList);
};
