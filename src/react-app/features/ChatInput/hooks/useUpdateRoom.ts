import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { roomAtom } from "../../../stores/roomAtom";
import { formatRiotId, type RiotId } from "../../../types/riotId";

export const useUpdateRoom = () =>
  useAtomCallback(
    useCallback(async (_get, set, riotIds: RiotId[]) => {
      // roomを更新
      set(roomAtom, riotIds.map(formatRiotId));
    }, []),
  );
