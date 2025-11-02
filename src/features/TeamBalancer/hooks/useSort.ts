import { useCallback } from "react";
import { sortedNames as sortedNamesWithParameter } from "../utils/sortedNames";

export const useSort = (parameter: "level" | "rank", isAsc: boolean) => {
  const sortedNames = useCallback(
    (names: readonly string[]) =>
      sortedNamesWithParameter(names, parameter, isAsc),
    [parameter, isAsc],
  );

  return sortedNames;
};
