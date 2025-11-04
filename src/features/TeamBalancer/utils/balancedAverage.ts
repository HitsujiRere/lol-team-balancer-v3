import { useSummonersStore } from "@/stores/useSummonersStore";
import { rankToPoint } from "@/types/rank";
import { average } from "@/utils/average";
import { choice } from "@/utils/choice";
import { count } from "@/utils/count";
import { shuffled } from "@/utils/shuffled";
import type { TeamNames } from "../types/team";

export const balancedAverage = (
  teamNames: TeamNames,
  parameter: "level" | "rank",
  choicePercent: number,
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

  const teamNamesList: [number, TeamNames][] = [];
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

    console.log(blue.map((name) => summoners[name]?.lockTeam));

    if (
      blue.some((name) => summoners[name]?.lockTeam === "Red") ||
      red.some((name) => summoners[name]?.lockTeam === "Blue")
    ) {
      continue;
    }

    const blueMutes = count(blue.map((name) => summoners[name]?.isMute));
    const redMutes = count(red.map((name) => summoners[name]?.isMute));
    if (Math.abs(blueMutes - redMutes) > 1) {
      continue;
    }

    const bluePoint = average(blue.map((name) => points[name] ?? 0));
    const redPoint = average(red.map((name) => points[name] ?? 0));
    const pointDiff = Math.abs(bluePoint - redPoint);
    teamNamesList.push([pointDiff, { Blue: blue, Red: red }]);
  }

  teamNamesList.sort((x, y) => x[0] - y[0]);

  return choice(
    teamNamesList.slice(0, Math.ceil(teamNamesList.length * choicePercent)),
  )[1];
};
