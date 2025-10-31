import { useSummonersStore } from "@/stores/useSummonersStore";
import { rankToPoint } from "@/types/rank";

export const sortedNames = (
  names: readonly string[],
  parameter: "level" | "rank",
  isAsc: boolean,
): string[] => {
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
  return names.toSorted(
    // biome-ignore lint/style/noNonNullAssertion: pointsはnamesから作られる
    (x, y) => (points[x]! - points[y]!) * (isAsc ? 1 : -1),
  );
};
