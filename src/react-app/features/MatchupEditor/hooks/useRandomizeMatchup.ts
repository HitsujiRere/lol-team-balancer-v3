import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { choice } from "../../../utils/choice";
import { currentMatchupAtom } from "../stores/currentMatchupAtom";
import { goodMatchupsAtom } from "../stores/matchupsAtom";

export const useRandomizeMatchup = () =>
  useAtomCallback(
    useCallback((get, set) => {
      const matchups = get(goodMatchupsAtom);

      set(currentMatchupAtom, choice(matchups));
    }, []),
  );
