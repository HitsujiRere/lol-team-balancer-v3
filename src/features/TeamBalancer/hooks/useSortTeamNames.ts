import { useState } from "react";
import type { Team, TeamNames } from "../types/team";
import { sortedNames } from "../utils/sortedNames";

type Parameter = "level" | "rank";

export const useSortTeamNames = () => {
  const [teamNames, rawSetTeamNames] = useState<TeamNames>({
    Blue: [],
    Red: [],
  });

  const [isSorting, setIsSorting] = useState(true);
  const [sortParameter, rawSetSortParameter] = useState<Parameter>("rank");
  const [isSortAsc, rawSetIsSortAsc] = useState(true);

  const setTeamNames = (
    nextTeamNames: TeamNames | ((current: TeamNames) => TeamNames),
  ) => {
    setIsSorting(true);
    if (typeof nextTeamNames === "object") {
      rawSetTeamNames({
        Blue: sortedNames(nextTeamNames.Blue, sortParameter, isSortAsc),
        Red: sortedNames(nextTeamNames.Red, sortParameter, isSortAsc),
      });
    } else {
      rawSetTeamNames((current) => {
        const next = nextTeamNames(current);
        return {
          Blue: sortedNames(next.Blue, sortParameter, isSortAsc),
          Red: sortedNames(next.Red, sortParameter, isSortAsc),
        };
      });
    }
  };

  const setSortParameter = (nextParameter: Parameter) => {
    rawSetSortParameter(nextParameter);
    setIsSorting(true);
    rawSetTeamNames((teamNames) => ({
      Blue: sortedNames(teamNames.Blue, nextParameter, isSortAsc),
      Red: sortedNames(teamNames.Red, nextParameter, isSortAsc),
    }));
  };

  const setIsSortAsc = (nextIsAsc: boolean) => {
    rawSetIsSortAsc(nextIsAsc);
    setIsSorting(true);
    rawSetTeamNames((teamNames) => ({
      Blue: sortedNames(teamNames.Blue, sortParameter, nextIsAsc),
      Red: sortedNames(teamNames.Red, sortParameter, nextIsAsc),
    }));
  };

  const sortTeamNames = () => {
    setIsSorting(true);
    rawSetTeamNames((teamNames) => ({
      Blue: sortedNames(teamNames.Blue, sortParameter, isSortAsc),
      Red: sortedNames(teamNames.Red, sortParameter, isSortAsc),
    }));
  };

  const swapMember = (
    xTeam: Team,
    xName: string,
    yTeam: Team,
    yName: string,
  ) => {
    setIsSorting(false);
    rawSetTeamNames((teamNames) => {
      const xIndex = teamNames[xTeam].indexOf(xName);
      const yIndex = teamNames[yTeam].indexOf(yName);
      const newed = { Blue: [...teamNames.Blue], Red: [...teamNames.Red] };
      newed[xTeam][xIndex] = yName;
      newed[yTeam][yIndex] = xName;
      return newed;
    });
  };

  return {
    teamNames,
    setTeamNames,
    isSorting,
    sortTeamNames,
    sortParameter,
    setSortParameter,
    isSortAsc,
    setIsSortAsc,
    swapMember,
  };
};
